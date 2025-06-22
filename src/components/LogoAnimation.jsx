import { useEffect } from 'react';


const LogoAnimation = ({ onComplete }) => {
  useEffect(() => {
    console.log('LogoAnimation mounted, starting animation');
    if (!window.anime) {
      console.error('Anime.js not loaded, skipping animation');
      setTimeout(onComplete, 1000);
      return;
    }

    const logoAnimationEl = document.querySelector('.logo-animation');
    if (!logoAnimationEl) {
      console.error('No .logo-animation element found, skipping animation');
      setTimeout(onComplete, 1000);
      return;
    }

    const bouncePath = anime.path('.bounce path');

    // Fit element to parent
    const fitElementToParent = (el, padding, exception) => {
      let timeout = null;
      const resize = () => {
        if (timeout) clearTimeout(timeout);
        anime.set(el, { scale: 1 });
        if (exception) anime.set(exception, { scale: 1 });
        const pad = padding || 0;
        const parentEl = el.parentNode;
        const elOffsetWidth = el.offsetWidth - pad;
        const parentOffsetWidth = parentEl.offsetWidth;
        const ratio = parentOffsetWidth / elOffsetWidth;
        const invertedRatio = elOffsetWidth / parentOffsetWidth;
        timeout = setTimeout(() => {
          anime.set(el, { scale: ratio });
          if (exception) anime.set(exception, { scale: invertedRatio });
        }, 10);
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    };

    fitElementToParent(logoAnimationEl, 0, '.bounce svg');

    // Initial positioning
    anime.set(['.letter-n', '.letter-e', '.letter-x'], { translateX: 70 });
    anime.set(['.letter-o', '.letter-r', '.letter-a'], { translateX: -70 });
    anime.set('.dot', { translateX: 630, translateY: -200 });

    const logoAnimationTL = anime.timeline({
      autoplay: true,
      easing: 'easeOutSine',
      complete: () => {
        console.log('LogoAnimation completed, calling onComplete');
        setTimeout(onComplete, 1000);
      },
    })
      .add({
        targets: '.bounced',
        transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
        translateY: [
          { value: [150, -160], duration: 190, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)' },
          { value: 4, duration: 120, easing: 'easeInQuad' },
          { value: 0, duration: 120, easing: 'easeOutQuad' },
        ],
        scaleX: [
          { value: [.25, .85], duration: 190, easing: 'easeOutQuad' },
          { value: 1.08, duration: 120, delay: 85, easing: 'easeInOutSine' },
          { value: 1, duration: 260, delay: 25, easing: 'easeOutQuad' },
        ],
        scaleY: [
          { value: [.3, .8], duration: 120, easing: 'easeOutSine' },
          { value: .35, duration: 120, delay: 180, easing: 'easeInOutSine' },
          { value: .57, duration: 180, delay: 25, easing: 'easeOutQuad' },
          { value: .5, duration: 190, delay: 15, easing: 'easeOutQuad' },
        ],
        delay: anime.stagger(80),
      }, 1000)
      .add({
        targets: '.dot',
        opacity: { value: 1, duration: 100 },
        translateY: 250,
        scaleY: [4, .7],
        scaleX: { value: 1.3, duration: 200, delay: 100 },
        duration: 280,
        easing: 'cubicBezier(0.350, 0.560, 0.305, 1)',
      }, '-=290')
      .add({
        targets: ['.letter-n', '.letter-e', '.letter-x', '.letter-o', '.letter-r', '.letter-a'],
        translateX: 0,
        easing: 'easeOutElastic(1, .6)',
        duration: 800,
        delay: anime.stagger(40, { from: 2.5 }),
      }, '-=600')
      .add({
        targets: '.dot',
        translateX: bouncePath('x'),
        translateY: bouncePath('y'),
        rotate: { value: '1turn', duration: 790 },
        scaleX: { value: 1, duration: 50, easing: 'easeOutSine' },
        scaleY: [
          { value: [1], duration: 50, easing: 'easeInSine' },
          { value: 1, duration: 50, easing: 'easeOutExpo' },
        ],
        easing: 'cubicBezier(0, .74, 1, .255)',
        duration: 800,
      }, '-=800')
      .add({
        targets: '.logo-letter',
        translateY: [
          { value: 40, duration: 150, easing: 'easeOutQuart' },
          { value: 0, duration: 800, easing: 'easeOutElastic(1, .5)' },
        ],
        strokeDashoffset: [anime.setDashoffset, 0],
        delay: anime.stagger(60, { from: 'center' }),
      }, '-=670')
      .add({
        targets: '.bounced',
        scaleY: [
          { value: 0.4, duration: 150, easing: 'easeOutQuart' },
          { value: 0.5, duration: 800, easing: 'easeOutElastic(1, .5)' },
        ],
        delay: anime.stagger(60, { from: 'center' }),
      }, '-=1090')
      .add({
        targets: '.logo-text',
        translateY: [
          { value: 20, easing: 'easeOutQuad', duration: 100 },
          { value: 0, easing: 'easeOutElastic(1, .9)', duration: 450 },
        ],
        opacity: { value: [0.001, 1], duration: 50 },
        duration: 500,
      }, '-=970');

    return () => {
      console.log('LogoAnimation unmounting, cleaning up');
      anime.remove('.logo-letter, .logo-text, .dot, .bounced');
    };
  }, [onComplete]);

  return (
    <div className="logo-container">
      <div className="main-logo">
        <div className="logo-animation-wrapper">
          <div className="logo-animation">
            <div className="anime-logo">
              <div className="anime-logo-signs">
                <div className="logo-letter letter-n">
                  <svg className="bounced" viewBox="0 0 200 240" width="200" height="240">
                    <path className="line" d="M170 220V60c0-31.046-8.656-40-19.333-40H49.333C38.656 20 30 28.954 30 60v160"/>
                  </svg>
                </div>
                <div className="logo-letter letter-e">
                  <svg className="bounced" viewBox="0 0 200 240" width="200" height="240">
                    <path className="line" d="M50 140h110c10 0 10-40 10-60s0-60-10-60H40c-10 0-10 40-10 60v80c0 20 0 60 10 60h130"/>
                  </svg>
                </div>
                <div className="logo-letter letter-x">
                  <svg className="bounced" viewBox="0 0 200 240" width="200" height="240">
                    <path className="line" d="M40 20L160 220M160 20L40 220"/>
                  </svg>
                </div>
                <div className="logo-letter letter-o">
                  <svg className="bounced" viewBox="0 0 200 240" width="200" height="240">
                    <path className="line" d="M100 20c44.183 0 80 35.817 80 80v40c0 44.183-35.817 80-80 80s-80-35.817-80-80v-40c0-44.183 35.817-80 80-80z"/>
                  </svg>
                </div>
                <div className="logo-letter letter-r">
                  <svg className="bounced" viewBox="0 0 200 240" width="200" height="240">
                    <path className="line" d="M30 220V60c0-31.046 8.656-40 19.333-40H130c20 0 40 20 40 40s-20 40-40 40H30l100 120"/>
                  </svg>
                </div>
                <div className="logo-letter letter-a">
                  <svg className="bounced" viewBox="0 0 200 240" width="200" height="240">
                    <path className="line" d="M30 20h130c9.996 0 10 40 10 60v140H41c-11.004 0-11-40-11-60s-.004-60 10-60h110"/>
                  </svg>
                </div>
                <div className="bounce">
                  <svg viewBox="0 0 1000 260" width="1000" height="260" fill="none">
                    <path d="M630,240 C630,111.154418 608.971354,40 530.160048,40 C451.348741,40 430,127.460266 430,210"/>
                  </svg>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-text">CREATIONS</div>
      </div>
    </div>
  );
};

export default LogoAnimation;