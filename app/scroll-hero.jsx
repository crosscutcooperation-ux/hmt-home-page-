'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollHero() {
  const [division, setDivision] = useState('Greenfield');
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let target = 0;
    let completed = false;
    let disposed = false;

    // Only one decode is in flight. A fast scroll replaces the pending target
    // rather than queueing obsolete frames behind the user's current position.
    const seek = () => {
      if (disposed || reduced.matches || video.readyState < 2 || video.seeking) return;
      if (Math.abs(video.currentTime - target) > 1 / 60) video.currentTime = target;
    };
    const update = () => {
      frame = 0;
      if (reduced.matches) return;
      const distance = section.offsetHeight - section.querySelector('.scroll-hero-sticky').offsetHeight;
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / Math.max(1, distance)));
      section.style.setProperty('--hero-copy-opacity', String(Math.max(0, 1 - progress * 8)));
      section.style.setProperty('--hero-copy-shift', `${-Math.min(1, progress * 8) * 35}px`);
      section.classList.toggle('hero-copy-hidden', progress > .125);
      progressRef.current.value = progress;
      if (Number.isFinite(video.duration)) target = progress * Math.max(0, video.duration - 1 / 30);
      seek();
      if (progress >= .999 && !completed) {
        completed = true;
        window.dispatchEvent(new Event('hmt:hero-complete'));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const ready = () => { section.classList.add('hero-video-ready'); schedule(); };
    const fallback = () => { section.classList.add('hero-video-failed'); window.dispatchEvent(new Event('hmt:hero-complete')); };
    const preference = () => {
      video.controls = reduced.matches;
      video.pause();
      if (reduced.matches) window.dispatchEvent(new Event('hmt:hero-complete'));
      else schedule();
    };
    video.addEventListener('loadeddata', ready);
    video.addEventListener('loadedmetadata', schedule);
    video.addEventListener('seeked', seek);
    video.addEventListener('error', fallback);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', preference);
    preference();
    if (video.readyState >= 2) ready();
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      video.removeEventListener('loadeddata', ready);
      video.removeEventListener('loadedmetadata', schedule);
      video.removeEventListener('seeked', seek);
      video.removeEventListener('error', fallback);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', preference);
    };
  }, []);

  return (
    <section id="hero" className="scroll-video-hero" ref={sectionRef} aria-label="HMT industrial film — scroll to explore">
      <div className="scroll-hero-sticky saree-hero">
        <video ref={videoRef} className="scroll-hero-video" muted playsInline preload="auto" poster="/assets/hmt/hero-scroll-poster.jpg" aria-label="A tour of an industrial manufacturing facility">
          <source src="/assets/hmt/hero-scroll.mp4" type="video/mp4" />
        </video>
        <div className="scroll-hero-shade" aria-hidden="true" />
        <div className="scroll-hero-copy">
          <div className="hero-division-copy">
            <p className="hero-brand">Hindustan Machine Tools</p>
            <div key={division} className="hero-division-writing" aria-live="polite">
              <h1 id="hero-division-title">{division}</h1>
              <p className="hero-division-tagline">{division === 'Greenfield'
                ? 'From bare land to full production, supporting every milestone.'
                : 'Single machine or full production line — we support with the same care and precision.'}</p>
            </div>
            <div className="hero-division-options" role="group" aria-label="Explore our divisions">
              {['Greenfield', 'Brownfield'].map(name => <button type="button" key={name} aria-pressed={division === name} aria-controls="hero-division-title" onClick={() => setDivision(name)}>{name}<span aria-hidden="true">→</span></button>)}
            </div>
          </div>
        </div>
        <div className="scroll-hero-guide">
          <span>Scroll to explore</span>
          <progress ref={progressRef} max="1" value="0" aria-label="Industrial film progress" />
          <a href="#divisions">Skip intro <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
