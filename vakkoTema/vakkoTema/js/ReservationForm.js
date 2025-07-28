function handleSubmit(event) {
  event.preventDefault();

  const backButton = document.getElementById("back-to-info");
  const step1 = document.getElementById("reservation-scroll-point");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");
  const step4 = document.getElementById("step-4");

  function isVisible(elem) {
    if (!elem) return false;
    return window.getComputedStyle(elem).display !== "none";
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      step1.style.display = "block";
      step2.style.display = "none";
      step3.style.display = "none";
      step4.style.display = "none";
      step1.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (isVisible(step1)) {
    step1.style.display = "none";
    step2.style.display = "block";
    step3.style.display = "none";
    step4.style.display = "none";
    step2.scrollIntoView({ behavior: "smooth" });
    startCountdown();
  } else if (isVisible(step2)) {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "block";
    step4.style.display = "none";
    step3.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      step3.style.display = "none";
      step4.style.display = "block";
    }, 3000);
  } else {
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
    step4.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.getElementById("back-to-info");
  if (backButton) {
    backButton.addEventListener("click", () => {
      const step1 = document.getElementById("reservation-scroll-point");
      const step2 = document.getElementById("step-2");
      const step3 = document.getElementById("step-3");
      const step4 = document.getElementById("step-4");

      step1.style.display = "block";
      step2.style.display = "none";
      step3.style.display = "none";
      step4.style.display = "none";
      step1.scrollIntoView({ behavior: "smooth" });
    });
  }
});

function startCountdown() {
  const timeText = document.getElementById("time");
  const progressCircle = document.querySelector(".circle-progress");

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = `0`;

  let totalTime = 60;
  let remainingTime = totalTime;

  const interval = setInterval(() => {
    remainingTime--;

    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");
    timeText.textContent = `${minutes}:${seconds}`;

    const offset = circumference * (1 - remainingTime / totalTime);
    progressCircle.style.strokeDashoffset = `${offset}`;

    if (remainingTime <= 0) {
      clearInterval(interval);
      timeText.textContent = "00:00";
    }
  }, 1000);
}
