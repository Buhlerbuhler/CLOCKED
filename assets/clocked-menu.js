(() => {
  const sections = [
    ['Class tools', [['Timer, Names & Groups', '/'], ['Locked', '/locked.html'], ['Bracketed', '/bracketed.html'], ['Voice', '/mixer.html']]],
    ['Math', [['Balanced', '/math.html'], ['Number Line', '/integer.html'], ['Fraction Helper', '/fractions.html']]],
    ['Geography', [['Map Quiz', '/map.html'], ['When / Where', '/eras.html']]],
    ['ELA', [['World Builder', '/worldbuilder.html'], ['Morphemes', '/morph.html']]],
  ];

  class ClockedMenu extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
        <style>
          :host { display: inline-flex; flex: 0 0 44px; color: inherit; }
          :host([hidden]) { display: none; }
          @media print { :host { display: none; } }
          button {
            display: grid; place-content: center; width: 44px; height: 44px;
            padding: 0; background: transparent; color: inherit;
            border: 0; border-radius: 5px; cursor: pointer;
          }
          button span {
            display: block; width: 19px; height: 2px; background: currentColor;
            box-shadow: 0 -6px currentColor, 0 6px currentColor;
          }
          button:focus-visible, a:focus-visible { outline: 2px solid #679fff; outline-offset: 2px; }
          nav {
            box-sizing: border-box; position: fixed; inset: auto; margin: 0;
            width: min(270px, calc(100vw - 16px)); overflow: auto;
            padding: 10px; border: 1px solid #555; border-radius: 6px;
            background: #171717; color: white; box-shadow: 0 10px 28px #0004;
            font: 700 14px/1.25 system-ui, sans-serif;
          }
          ul { list-style: none; padding: 0; margin: 0; }
          ul + p { margin-top: 10px; border-top: 1px solid #555; padding-top: 10px; }
          p {
            margin: 0 0 3px; padding-inline: 8px;
            color: #ccc; font-size: 11px; text-transform: uppercase;
          }
          a {
            display: flex; align-items: center; min-height: 36px;
            padding: 0 8px; color: inherit; border-radius: 4px; text-decoration: none;
          }
          [aria-current="page"], a:hover { background: #fed500; color: #171717; }
        </style>
        <button type="button" aria-label="CLOCKED menu" title="CLOCKED menu"
          aria-expanded="false" aria-controls="clocked-links" popovertarget="clocked-links">
          <span aria-hidden="true"></span>
        </button>
        <nav id="clocked-links" popover aria-label="CLOCKED tools"></nav>
      `;

      const button = root.querySelector('button');
      const menu = root.querySelector('nav');
      const current = location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
      for (const [section, links] of sections) {
        const heading = document.createElement('p');
        heading.textContent = section;
        const list = document.createElement('ul');
        for (const [label, href] of links) {
          const item = document.createElement('li');
          const link = document.createElement('a');
          link.href = href;
          link.textContent = label;
          if (current === href || current + '.html' === href) {
            link.setAttribute('aria-current', 'page');
          }
          item.append(link);
          list.append(item);
        }
        menu.append(heading, list);
      }

      const positionMenu = () => {
        const bounds = button.getBoundingClientRect();
        const top = bounds.bottom + 6;
        menu.style.top = `${top}px`;
        menu.style.right = `${Math.max(8, document.documentElement.clientWidth - bounds.right)}px`;
        menu.style.maxHeight = `${Math.max(0, window.innerHeight - top - 8)}px`;
      };
      menu.addEventListener('beforetoggle', (event) => {
        const isOpen = event.newState === 'open';
        button.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
          positionMenu();
          window.addEventListener('resize', positionMenu);
          window.addEventListener('scroll', positionMenu, { passive: true });
        } else {
          window.removeEventListener('resize', positionMenu);
          window.removeEventListener('scroll', positionMenu);
        }
      });
    }
  }

  customElements.define('clocked-menu', ClockedMenu);
})();
