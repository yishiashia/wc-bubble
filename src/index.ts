import Bubble from "./Bubble";

// Register custom elements
if(customElements.get('chat-bubble') === undefined) {
  window.customElements.define('chat-bubble', Bubble)
}

export default Bubble