const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;

  const startVideo = () => {
    const playback = heroVideo.play();
    if (playback) playback.catch(() => {});
  };

  if (heroVideo.readyState >= 2) startVideo();
  else heroVideo.addEventListener('loadeddata', startVideo, { once: true });

  window.addEventListener('pageshow', startVideo);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) startVideo();
  });
  document.addEventListener('pointerdown', startVideo, { once: true });
}
