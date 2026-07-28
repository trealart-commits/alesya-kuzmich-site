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
  let speed = 0.32;
  let targetSpeed = 0.32;
  let halfWidth = 0;
  const cards = Array.from(diplomaTrack.children);

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function measure() {
    halfWidth = diplomaTrack.scrollWidth / 2;
  }

  function setDirectionFromPointer(event) {
    const bounds = diplomaCarousel.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const normalized = (x / bounds.width - 0.5) * 2;
    const movementBoost = clamp(event.movementX || 0, -18, 18) * 0.055;
    targetSpeed = clamp(normalized * 1.15 + movementBoost, -1.85, 1.85);
  }

  function shapeCards() {
    const bounds = diplomaCarousel.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;

    cards.forEach((card) => {
      const cardBounds = card.getBoundingClientRect();
      const cardCenter = cardBounds.left + cardBounds.width / 2;
      const distance = clamp((cardCenter - center) / (bounds.width / 2), -1, 1);
      const tilt = distance * -16;
      const drop = Math.abs(distance) * 22;
      const scale = 1 - Math.abs(distance) * 0.08;
      card.style.transform = `rotateY(${tilt}deg) translateY(${drop}px) scale(${scale})`;
    });
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
    shapeCards();
    requestAnimationFrame(animate);
  }

  diplomaCarousel.addEventListener("pointermove", setDirectionFromPointer);
  diplomaCarousel.addEventListener("pointerleave", () => {
    targetSpeed = 0.32;
  });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);

  measure();
  animate();
}
