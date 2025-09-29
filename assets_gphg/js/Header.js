document.addEventListener("DOMContentLoaded", function () {
    function setupScroll() {
        const reserveBtn = document.getElementById("reserve-button");
        const reservationScrollPoint = document.getElementById("reservation-scroll-point");
        const viewButton = document.getElementById("view-button");
        const aboutSection = document.getElementById("about-section");

        if (reserveBtn && reservationScrollPoint) {
            reserveBtn.addEventListener("click", (event) => { // 'event' parametresini ekle
                event.preventDefault(); // Varsayılan davranışı engelle
                reservationScrollPoint.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }

        if (viewButton && aboutSection) {
            viewButton.addEventListener("click", (event) => { // Buraya da ekleyebilirsin
                event.preventDefault(); // Varsayılan davranışı engelle
                aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }

        if ((!reserveBtn || !reservationScrollPoint) || (!viewButton || !aboutSection)) {
            console.warn("Bazı butonlar veya scroll hedefleri bulunamadı.");
        }
    }

    setupScroll();
});