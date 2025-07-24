function setupScroll() {
  const reserveBtn = document.getElementById("reserve-btn");
  const reservationScrollPoint = document.getElementById("reservation-scroll-point");

  const viewButton = document.getElementById("view-button");
  const aboutSection = document.getElementById("about-section");

  if (reserveBtn && reservationScrollPoint) {
    reserveBtn.addEventListener("click", () => {
      reservationScrollPoint.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (viewButton && aboutSection) {
    viewButton.addEventListener("click", () => {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if ((!reserveBtn || !reservationScrollPoint) || (!viewButton || !aboutSection)) {
    console.warn("Bazı butonlar veya scroll noktaları bulunamadı");
  }
}

setupScroll();
