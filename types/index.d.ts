declare module 'wc-qrcode' {
  export default class QRCode extends HTMLElement {
    private props: {
      alt: string
      text: string
      size: number
    }
    private qrimg: string | null
    static get observedAttributes(): string[]
    constructor()
    connectedCallback(): Promise<void>
    attributeChangedCallback(): void
    disconnectedCallback(): void
    setupProps(): void
    setupDom(): void
    setupStyle(): void
    setupListenEvents(): void
    refreshQRImage(): void
    get text(): string
    set text(txt: string)
    get size(): number
    set size(sz: number | string)
    get alt(): string
    set alt(at: string)
    template(data: {
      alt: string
      text: string
      size: number
    }): string
  }
}

