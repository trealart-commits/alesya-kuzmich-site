const diplomaCarousel = document.querySelector("[data-diploma-carousel]");
const diplomaTrack = document.querySelector("[data-diploma-track]");

if (diplomaCarousel && diplomaTrack) {
  const originalItems = Array.from(diplomaTrack.children);
  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.tabIndex = -1;
    diplomaTrack.appendChild(clone);
  });

  let offset = 0;
  let speed = 0.22;
  let targetSpeed = 0.22;
  let halfWidth = 0;

  function measure() {
    halfWidth = diplomaTrack.scrollWidth / 2;
  }

  function setDirectionFromPointer(event) {
    const bounds = diplomaCarousel.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const normalized = (x / bounds.width - 0.5) * 2;
    targetSpeed = normalized * 0.72;
  }

  function animate() {
    if (!halfWidth) {
      measure();
    }

    speed += (targetSpeed - speed) * 0.045;
    offset += speed;

    if (offset > halfWidth) {
      offset -= halfWidth;
    }

    if (offset < 0) {
      offset += halfWidth;
    }

    diplomaTrack.style.transform = `translate3d(${-offset}px, 0, 0)`;
    requestAnimationFrame(animate);
  }

  diplomaCarousel.addEventListener("pointermove", setDirectionFromPointer);
  diplomaCarousel.addEventListener("pointerleave", () => {
    targetSpeed = 0.18;
  });
  window.addEventListener("resize", measure);

  measure();
  animate();
}
