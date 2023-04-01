import { fireEvent } from '@testing-library/dom';
import { JSDOM } from 'jsdom';

global.window = new JSDOM().window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.customElements = window.customElements;
global.CustomEvent = window.CustomEvent;

const Bubble = require('../../src/index');

describe('Bubble.ts', () => {

  let bubbleElement;

  beforeEach(() => {
    jest.resetAllMocks();
    bubbleElement = document.createElement('chat-bubble');
  });

  afterEach(() => {
    bubbleElement.remove();
  });

  test('renders a chat bubble with text content', () => {
    const testText = 'Hello, world!';
    bubbleElement.innerHTML = testText;
    document.body.appendChild(bubbleElement);

    expect(bubbleElement.bubbleElement.querySelector("slot").assignedNodes()[0].wholeText).toBe(testText);
  });

  test('renders a chat bubble with avatar', () => {
    const testAvatar = 'https://www.example.com/avatar.jpg';
    bubbleElement.setAttribute('avatar', testAvatar);
    document.body.appendChild(bubbleElement);
    expect(bubbleElement.shadowRoot?.querySelector('.avatar img')?.getAttribute('src')).toBe(testAvatar);
  });

  test('sets delay and bubble index styles', () => {
    bubbleElement.setAttribute('delay', '3');
    document.body.appendChild(bubbleElement);
    expect(bubbleElement.shadowRoot?.querySelector('.chat-bubble')?.style.getPropertyValue('--bubble-index')).toBe('3');
  });

  test('sets "continued" class when "continued" attribute is set', () => {
    bubbleElement.setAttribute('continued', '');
    document.body.appendChild(bubbleElement);
    expect(bubbleElement.shadowRoot?.querySelector('.chat-message')?.classList.contains('continue')).toBe(true);
  });

  test('sets "continued" class when "continued" property is set', () => {
    document.body.appendChild(bubbleElement);
    bubbleElement.continued = true;
    expect(bubbleElement.continued).toBe(true);
    expect(bubbleElement.shadowRoot?.querySelector('.chat-message')?.classList.contains('continue')).toBe(true);
  });

  test('sets "continued" class when "continued" property is removed', () => {
    bubbleElement.setAttribute('continued', '');
    document.body.appendChild(bubbleElement);
    bubbleElement.continued = false;
    expect(bubbleElement.shadowRoot?.querySelector('.chat-message')?.classList.contains('continue')).toBe(false);
  });

  test('sets "right" class when "right" attribute is set', () => {
    bubbleElement.setAttribute('right', '');
    document.body.appendChild(bubbleElement);
    expect(bubbleElement.shadowRoot?.querySelector('.chat-message')?.classList.contains('right')).toBe(true);
  });

  test('sets "right" class when "right" property is set', () => {
    document.body.appendChild(bubbleElement);
    bubbleElement.right = true;
    expect(bubbleElement.right).toBe(true);
    expect(bubbleElement.shadowRoot?.querySelector('.chat-message')?.classList.contains('right')).toBe(true);
  });

  test('sets "right" class when "right" property is removed', () => {
    bubbleElement.setAttribute('right', '');
    document.body.appendChild(bubbleElement);
    bubbleElement.right = false;
    expect(bubbleElement.shadowRoot?.querySelector('.chat-message')?.classList.contains('right')).toBe(false);
  });

  test('renders a loading animation when "loading" attribute is set', () => {
    bubbleElement.setAttribute('loading', '');
    document.body.appendChild(bubbleElement);
    const chatBubbleElement = bubbleElement.bubbleElement;
    expect(bubbleElement.loading).toBe(true);
    expect(chatBubbleElement.classList).toContain('typing-indicator');
    expect(chatBubbleElement.innerHTML).toContain('div class="dots"');
  });

  test('renders a loading animation when "loading" property is set', () => {
    document.body.appendChild(bubbleElement);
    bubbleElement.loading = true;
    const chatBubbleElement = bubbleElement.bubbleElement;
    expect(chatBubbleElement.classList).toContain('typing-indicator');
    expect(chatBubbleElement.innerHTML).toContain('div class="dots"');
  });

  test('not to show loading animation when "loading" property is removed', () => {
    bubbleElement.setAttribute('loading', '');
    document.body.appendChild(bubbleElement);
    bubbleElement.loading = false;
    const chatBubbleElement = bubbleElement.bubbleElement;
    expect(chatBubbleElement.classList).not.toContain('typing-indicator');
    expect(chatBubbleElement.innerHTML).not.toContain('div class="dots"');
  });

  test('adds "animation-scale-out" class on removeGracefully()', () => {
    document.body.appendChild(bubbleElement);
    bubbleElement.removeGracefully();
    expect(bubbleElement.shadowRoot?.querySelector('.chat-bubble')?.classList.contains('animation-scale-out')).toBe(true);
  });

  test('removes element from DOM after animation ends', async () => {
    document.body.appendChild(bubbleElement);
    bubbleElement.removeGracefully();
    await fireEvent.animationEnd(bubbleElement.bubbleElement);
    expect(document.body.contains(bubbleElement)).toBe(false);
  });

});