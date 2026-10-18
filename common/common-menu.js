(() => {
  const root = new URL('../', document.currentScript.src);
  const host = document.createElement('div');
  const shadow = host.attachShadow({mode: 'open'});
  const pages = [['Home', 'index.html'], ['Games', 'games/games.html'], ['HTML', 'html/index.html'], ['JavaScript', 'js/index.html']];
  const current = location.pathname.replace(/\/$/, '/index.html');
  shadow.innerHTML = `
    <style>
      :host{display:block;background:#fff;color:#123443;font-family:Arial,Helvetica,sans-serif}
      *{box-sizing:border-box}
      header{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:22px 6%;border-bottom:1px solid #e4eaee}
      .brand{display:flex;align-items:center;gap:15px;color:inherit;text-decoration:none}
      .brand img{width:76px;height:76px;object-fit:contain}
      .brand strong{font-size:19px;line-height:1.35}
      .brand small{display:block;margin-top:5px;font-size:14px;color:#617380}
      nav{display:flex;flex-wrap:wrap;gap:27px;align-items:center}
      nav button,nav a{border:0;background:none;font:inherit;font-size:15px;color:#506574;cursor:pointer;padding:12px 0;text-decoration:none}
      nav [aria-current]{color:#087ba7;border-bottom:2px solid #087ba7}
      .menu{display:none;border:1px solid #d5e2e9;background:white;color:#125374;padding:10px 14px;border-radius:5px;font-size:16px;cursor:pointer}
      dialog{color:#123443;border:1px solid #d8e4eb;border-radius:12px;padding:32px;max-width:420px;width:90%;box-shadow:0 20px 90px #12344330}
      dialog::backdrop{background:#12344370}
      dialog h2{font-size:25px;margin-top:0}
      dialog p{font-size:16px;line-height:1.8;color:#627583;margin-bottom:30px}
      dialog button{background:#087ba7;color:white;border:0;border-radius:5px;padding:12px 22px;font-size:16px;cursor:pointer}
      :focus-visible{outline:3px solid #70a446;outline-offset:5px}
      @media(max-width:1000px){nav{gap:20px}.brand strong{font-size:17px}}
      @media(max-width:700px){header{padding:15px 5%}.brand img{width:57px;height:57px}.brand strong{font-size:14px}.brand small{font-size:12px}.menu{display:block}nav{display:none;width:100%;gap:20px}nav.open{display:flex}}
    </style>
    <header>
      <a class="brand" href="${new URL('index.html', root)}"><img src="${new URL('images/cno-logo.png', root)}" alt="CNO school logo"><div><strong>Collège National Orthodoxe</strong><small>St Élie · El Mina</small></div></a>
      <button class="menu" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
      <nav id="nav" aria-label="Main navigation">${pages.map(([label, path]) => path
        ? `<a href="${new URL(path, root)}"${current === new URL(path, root).pathname ? ' aria-current="page"' : ''}>${label}</a>`
        : `<button type="button" data-page="${label}">${label}</button>`).join('')}</nav>
    </header>
    <dialog aria-labelledby="heading"><h2 id="heading"></h2><p>This section will be available when our new website launches. Thank you for your patience.</p><button type="button" id="close">Close</button></dialog>`;
  document.body.prepend(host);
  const menu = shadow.querySelector('.menu');
  menu.addEventListener('click', () => menu.setAttribute('aria-expanded', shadow.querySelector('nav').classList.toggle('open')));
  const modal = shadow.querySelector('dialog');
  shadow.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => {
    shadow.getElementById('heading').textContent = button.dataset.page;
    modal.showModal();
  }));
  shadow.getElementById('close').addEventListener('click', () => modal.close());
})();
