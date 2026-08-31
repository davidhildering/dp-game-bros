// Fullscreen toggle for the game wrapper page.

const btn = document.getElementById("fullscreen-btn");
const frame = document.getElementById("game-iframe");

btn?.addEventListener("click", () => {
  if (!frame) return;
  const target = frame;
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  } else if (typeof target.requestFullscreen === "function") {
    void target.requestFullscreen();
  }
});
