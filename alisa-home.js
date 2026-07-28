const diplomaTrack = document.querySelector("[data-diploma-track]");
const diplomaPrev = document.querySelector("[data-diploma-prev]");
const diplomaNext = document.querySelector("[data-diploma-next]");

function scrollDiplomas(direction) {
  if (!diplomaTrack) {
    return;
  }

  const firstItem = diplomaTrack.querySelector(".diploma-placeholder");
  const itemWidth = firstItem ? firstItem.getBoundingClientRect().width + 12 : 280;
  diplomaTrack.scrollBy({
    left: itemWidth * direction,
    behavior: "smooth",
  });
}

diplomaPrev?.addEventListener("click", () => scrollDiplomas(-1));
diplomaNext?.addEventListener("click", () => scrollDiplomas(1));
