// Initialize the date variables
let targetDate = new Date();

// Set the targetDate to 10 days in the future
targetDate.setDate(targetDate.getDate() + 10);

// Factory function to parse and return the time remaining
function getTimeRemaining(endtime) {
  // Date.parse returns the timestamp of the date difference
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

// Get all of the cards and the time to pass to the flip function
function flipAllCards() {
  // Convert the date to a format that can be parsed by Date.parse
  let localTime = targetDate.toLocaleDateString();
  const { days, hours, minutes, seconds } = getTimeRemaining(localTime);

  flip(document.getElementById("days"), days);
  flip(document.getElementById("hours"), hours);
  flip(document.getElementById("minutes"), minutes);
  flip(document.getElementById("seconds"), seconds);
}

// Get each card and flip it
function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);

  // if the time value doesn't change do nothing
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".bottom");
  const flipTop = document.createElement("div");
  flipTop.classList.add("flip-top", "card-face");
  const flipBottom = document.createElement("div");
  flipBottom.classList.add("flip-bottom", "card-face");

  topHalf.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  flipTop.textContent = startNumber;
  flipBottom.textContent = newNumber;

  flipTop.addEventListener("animationstart", () => {
    topHalf.textContent = newNumber;
  });
  flipTop.addEventListener("animationend", () => {
    flipTop.remove();
  });
  flipBottom.addEventListener("animationend", () => {
    bottomHalf.textContent = newNumber;
    flipBottom.remove();
  });
  flipCard.append(flipTop, flipBottom);
}

setInterval(flipAllCards, 1000);
