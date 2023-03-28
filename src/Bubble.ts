import styles from "./Bubble.scss";

export default class Bubble extends HTMLElement {

  private props: {
    delay: number
    avatar: string
  }
  private msgElement: HTMLElement | null
  private bubbleElement: HTMLElement | null
  private _isContinued: boolean
  private _isRight: boolean
  private _isLoading: boolean

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.dispatchMountedEvent = this.dispatchMountedEvent.bind(this)

    this.props = {
      delay: 0,
      avatar: `data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="45" y="55" width="110" height="100" rx="20" fill-opacity="0" stroke="black" stroke-width="15"></rect><circle cx="75" cy="95" r="10" fill="black"></circle><circle cx="125" cy="95" r="10" fill="black"></circle><line x1="75" y1="125" x2="125" y2="125" stroke="black" stroke-width="10"></line><ellipse cx="30" cy="95" rx="10" ry="10" fill="black" stroke="black" stroke-width="10"></ellipse><ellipse cx="170" cy="95" rx="10" ry="10" fill="black" stroke="black" stroke-width="10"></ellipse><circle cx="100" cy="30" r="10" fill="black" stroke="black" stroke-width="10"></circle><line x1="100" y1="35" x2="100" y2="55" stroke="black" stroke-width="10"></line></svg>`
    }
    this.msgElement = null;
    this.bubbleElement = null;
    this._isContinued = false;
    this._isRight = false;
    this._isLoading = false;
  }

  connectedCallback() {

    if (this.hasAttribute("delay")) {
      const delay = this.getAttribute("delay");
      if (delay !== null) {
        const delayInt = parseInt(delay);
        this.props.delay = isNaN(delayInt) ? 0 : delayInt > 0 ? delayInt : 0;
      }
    }

    // DOM
    const wrapper = document.createElement("div");
    wrapper.classList.add("chat-message")
    if (this.hasAttribute("continued")) {
      wrapper.classList.add("continue");
      this._isContinued = true;
    }
    if (this.hasAttribute("right")) {
      wrapper.classList.add("right");
      this._isRight = true;
    }
    if (this.hasAttribute("loading")) {
      this._isLoading = true;
    }
    if (this.hasAttribute("avatar")) {
      this.props.avatar = this.getAttribute("avatar") as string;
    }
    this.bubbleElement = this.genBubbleElement();
    wrapper.append(this.genAvatarElement());
    wrapper.append(this.bubbleElement);
    this.msgElement = wrapper;

    // Styles
    const style = document.createElement("style");
    style.textContent = styles;

    if (this.shadowRoot !== null) {
      this.shadowRoot.append(style);
      this.shadowRoot.append(wrapper);
    }
  }

  removeGracefully() {
    if (this.bubbleElement !== null) {
      this.bubbleElement.addEventListener("animationend", () => {
        const parentElement = this.parentElement;
        if (parentElement !== null) {
          parentElement.removeChild(this);
        } else {
          this.remove();
        }
      });
      this.bubbleElement.classList.add("animation-scale-out")
    }
  }

  dispatchMountedEvent() {
    const customEvent = new CustomEvent('mounted');
    this.dispatchEvent(customEvent);
    if (this.bubbleElement !== null) {
      this.bubbleElement.removeEventListener("animationend", this.dispatchMountedEvent);
    }
  }

  get continued() {
    return this._isContinued;
  }

  set continued(v: boolean) {
    this._isContinued = v;
    if (this.msgElement !== null) {
      if (this._isContinued) {
        this.msgElement.classList.add("continue");
      } else {
        this.msgElement.classList.remove("continue");
      }
    }
  }

  get right() {
    return this._isRight;
  }

  set right(v: boolean) {
    this._isRight = v;
    if (this.msgElement !== null) {
      if (this._isRight) {
        this.msgElement.classList.add("right");
      } else {
        this.msgElement.classList.remove("right");
      }
    }
  }

  get loading() {
    return this._isLoading;
  }

  set loading(v: boolean) {
    this._isLoading = v;
    if (this.bubbleElement !== null) {
      if (this._isLoading) {
        this.bubbleElement.classList.add("typing-indicator");
        this.bubbleElement.innerHTML = `<div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
      } else {
        this.bubbleElement.classList.remove("typing-indicator");
        this.bubbleElement.innerHTML = `<slot></slot>`;
      }
    }
  }

  private genAvatarElement() {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.classList.add("avatar");
    div.style.setProperty('--bubble-index', String(this.props.delay));
    img.src = this.props.avatar;
    div.append(img);
    return div;
  }

  private genBubbleElement() {
    const chatBubble = document.createElement("div");
    chatBubble.classList.add("chat-bubble")
    if (this.hasAttribute("loading")) {
      chatBubble.classList.add("typing-indicator");
      chatBubble.innerHTML = `<div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
    } else {
      chatBubble.appendChild(document.createElement("slot"));
    }
    chatBubble.style.setProperty('--bubble-index', String(this.props.delay));
    chatBubble.addEventListener("animationend", this.dispatchMountedEvent);
    return chatBubble;
  }

}