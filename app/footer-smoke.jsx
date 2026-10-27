'use client';

import { useEffect, useRef } from 'react';

// Locations are registered to the original 1983 × 793 industrial panorama.
const emitters = [
  { x: 595, y: 382, drift: 190, rise: 142, start: 66, end: 190, life: 14, count: 30, alpha: .46 },
  { x: 510, y: 427, drift: 150, rise: 124, start: 38, end: 140, life: 13, count: 24, alpha: .32 },
  { x: 709, y: 312, drift: 205, rise: 100, start: 20, end: 165, life: 12, count: 30, alpha: .52 },
];

export default function FooterSmoke() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = canvas.closest('footer');
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const texture = new Image();
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 256;
    let frame = 0, width = 0, height = 0, visible = false, ready = false;
    let elapsed = 4, previous = 0, lastPaint = 0, disposed = false;

    function paint(time) {
      const artHeight = parseFloat(getComputedStyle(footer).getPropertyValue('--footer-art-height')) || 300;
      const scale = Math.max(width / 1983, artHeight / 793);
      const offsetX = (width - 1983 * scale) / 2;
      const offsetY = height - artHeight + (artHeight - 793 * scale) / 2;
      context.clearRect(0, 0, width, height);
      const particles = [];
      for (let e = 0; e < emitters.length; e++) {
        const emitter = emitters[e];
        for (let i = 0; i < emitter.count; i++) {
          const seed = Math.sin((i + 1) * 91.37 + e * 53.2) * .5 + .5;
          const age = (time / emitter.life + i / emitter.count) % 1;
          const lift = Math.pow(age, .62);
          const x = emitter.x + emitter.drift * Math.pow(age, 1.15)
            + Math.sin(age * 8 + seed * 6.28) * (3 + age * 10);
          const y = emitter.y - emitter.rise * lift
            + Math.sin(seed * 11.1) * (8 + age * 18) * Math.sin(Math.PI * age);
          const size = emitter.start + (emitter.end - emitter.start) * (1 - Math.exp(-age * 2.4));
          const fadeIn = Math.min(1, age / .07);
          const fadeOut = Math.pow(Math.max(0, 1 - age), .9);
          particles.push({
            x: offsetX + x * scale, y: offsetY + y * scale,
            w: size * scale * (1 + age * .2), h: size * scale * (.82 + seed * .15),
            alpha: emitter.alpha * fadeIn * fadeOut,
            rotation: Math.sin(age * 3 + seed * 6) * .12,
            sourceY: y,
          });
        }
      }
      // Mature, dispersed clouds sit behind the fresher, denser emissions.
      particles.sort((a, b) => a.alpha - b.alpha);
      for (const particle of particles) {
        context.save();
        context.globalAlpha = particle.alpha;
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.drawImage(sprite, -particle.w / 2, -particle.h / 2, particle.w, particle.h);
        context.restore();
      }
      // The shallow water compresses and softens the reflected plume; small
      // lateral offsets keep it moving like the rest of the waterline.
      context.save();
      context.filter = 'blur(1.2px)';
      for (const particle of particles) {
        const reflectionY = 607 + (607 - particle.sourceY) * .25;
        context.globalAlpha = particle.alpha * .14;
        context.translate(particle.x + Math.sin(time * 1.1 + particle.x * .03) * 2,
          offsetY + reflectionY * scale);
        context.scale(1, -.24);
        context.drawImage(sprite, -particle.w / 2, -particle.h / 2, particle.w, particle.h);
        context.setTransform(Math.min(devicePixelRatio || 1, 1.5), 0, 0, Math.min(devicePixelRatio || 1, 1.5), 0, 0);
      }
      context.restore();
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (ready) paint(elapsed);
    }

    function tick(now) {
      frame = 0;
      if (disposed || !ready || !visible || document.hidden || reduced.matches) return;
      if (previous) elapsed += Math.min(.08, (now - previous) / 1000);
      previous = now;
      if (now - lastPaint >= 1000 / 30) { paint(elapsed); lastPaint = now; }
      frame = requestAnimationFrame(tick);
    }

    function resume() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!ready) return;
      if (reduced.matches) paint(4);
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      resume();
    }, { rootMargin: '100px' });
    observer.observe(footer);
    const sizes = new ResizeObserver(resize);
    sizes.observe(canvas);
    reduced.addEventListener('change', resume);
    document.addEventListener('visibilitychange', resume);
    texture.onload = () => {
      if (disposed) return;
      const spriteContext = sprite.getContext('2d');
      spriteContext.drawImage(texture, 0, 0, 256, 256);
      spriteContext.globalCompositeOperation = 'source-atop';
      spriteContext.fillStyle = 'rgba(255,252,245,.18)';
      spriteContext.fillRect(0, 0, 256, 256);
      ready = true;
      resize();
      resume();
    };
    texture.src = '/assets/hmt/footer-smoke-billow.webp';
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizes.disconnect();
      reduced.removeEventListener('change', resume);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

  return <canvas ref={canvasRef} className="footer-smoke-canvas" aria-hidden="true" />;
}
