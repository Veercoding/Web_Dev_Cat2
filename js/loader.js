/* ============================================================
   NexaWeb Agency — loader.js
   Page loader animation — runs on every page
   ============================================================ */

'use strict';

(function () {
  // Create loader HTML
  const loader = document.createElement('div');
  loader.id = 'nexaLoader';
  loader.innerHTML = `
    <div class="loader-inner">
      <div class="loader-logo">
        <span class="loader-logo-text">Nexa<span>Web</span></span>
        <div class="loader-tagline">Digital Growth Studio</div>
      </div>
      <div class="loader-bar-wrap">
        <div class="loader-bar" id="loaderBar"></div>
      </div>
      <div class="loader-percent" id="loaderPercent">0%</div>
    </div>
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #nexaLoader {
      position: fixed;
      inset: 0;
      background: #0a0a0f;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    #nexaLoader.hide {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .loader-inner {
      text-align: center;
    }
    .loader-logo {
      margin-bottom: 2.5rem;
      animation: loaderFadeIn 0.5s ease forwards;
    }
    .loader-logo-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 6vw, 3.5rem);
      font-weight: 700;
      color: #e8e8f0;
      letter-spacing: -0.02em;
    }
    .loader-logo-text span {
      color: #4f7cff;
    }
    .loader-tagline {
      font-family: 'Space Mono', monospace;
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #8888aa;
      margin-top: 0.5rem;
      animation: loaderFadeIn 0.5s ease 0.2s both;
    }
    .loader-bar-wrap {
      width: 220px;
      height: 2px;
      background: #1a1a24;
      border-radius: 100px;
      margin: 0 auto 1rem;
      overflow: hidden;
    }
    .loader-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #4f7cff, #7c5cff);
      border-radius: 100px;
      transition: width 0.05s linear;
    }
    .loader-percent {
      font-family: 'Space Mono', monospace;
      font-size: 0.75rem;
      color: #4f7cff;
      letter-spacing: 0.1em;
    }
    .loader-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4f7cff;
      margin: 0 3px;
      animation: loaderDot 1.2s ease-in-out infinite;
    }
    .loader-dot:nth-child(2) { animation-delay: 0.2s; }
    .loader-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes loaderFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes loaderDot {
      0%, 100% { transform: translateY(0); opacity: 0.4; }
      50%       { transform: translateY(-6px); opacity: 1; }
    }
    body.loading { overflow: hidden; }
  `;

  document.head.appendChild(style);
  document.body.classList.add('loading');
  document.body.insertBefore(loader, document.body.firstChild);

  // Animate progress bar
  const bar     = document.getElementById('loaderBar');
  const percent = document.getElementById('loaderPercent');
  let progress  = 0;

  const interval = setInterval(() => {
    // Ease: fast at first, slow near end
    const step = progress < 70 ? Math.random() * 8 + 4
               : progress < 90 ? Math.random() * 3 + 1
               : 0.5;
    progress = Math.min(progress + step, 99);

    if (bar)     bar.style.width   = progress + '%';
    if (percent) percent.textContent = Math.floor(progress) + '%';
  }, 80);

  // On page load — finish and hide
  const finish = () => {
    clearInterval(interval);
    if (bar)     bar.style.width   = '100%';
    if (percent) percent.textContent = '100%';

    setTimeout(() => {
      loader.classList.add('hide');
      document.body.classList.remove('loading');
      // Remove from DOM after animation
      setTimeout(() => loader.remove(), 700);
    }, 400);
  };

  if (document.readyState === 'complete') {
    finish();
  } else {
    window.addEventListener('load', finish);
    // Fallback — max 4 seconds
    setTimeout(finish, 4000);
  }
})();
