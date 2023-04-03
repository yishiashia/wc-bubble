declare module 'wc-bubble' {
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
    constructor()
    connectedCallback(): void
    removeGracefully(): void
    dispatchMountedEvent(): void
    get continued(): boolean
    set continued(v: boolean)
    get right(): boolean
    set right(v: boolean)
    get loading(): boolean
    set loading(v: boolean)
    private genAvatarElement(): void
    private genBubbleElement(): void
  }
}

