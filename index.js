const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Select DOM elements
const stateInput = document.getElementById("state-input");
const fetchBtn = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Function to display alerts on the DOM
function displayAlerts(data) {
  // Clear previous alerts
  alertsDisplay.innerHTML = "";

  const features = data.features || [];
  const alertCount = features.length;

  // Header showing exact count expected by test suite: "Weather Alerts: <count>"
  const countHeader = document.createElement("h2");
  countHeader.textContent = `Weather Alerts: ${alertCount}`;
  alertsDisplay.appendChild(countHeader);

  // List of headlines
  const ul = document.createElement("ul");
  features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature.properties.headline;
    ul.appendChild(li);
  });

  alertsDisplay.appendChild(ul);
}

// Function to fetch weather alerts from API
function fetchWeatherAlerts(state) {
  // Reset error message on new request attempt
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  // Check for empty input
  if (!state || state.trim() === "") {
    showError("Please enter a valid state abbreviation.");
    return;
  }

  const url = `${weatherApi}${state.trim().toUpperCase()}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayAlerts(data);
    })
    .catch((error) => {
      console.log(error.message);
      showError(error.message);
    });
}

// Helper to display error messages
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

// Event listener for button click
fetchBtn.addEventListener("click", () => {
  const state = stateInput.value;
  stateInput.value = ""; // Clear input immediately upon click as required by Task 3
  fetchWeatherAlerts(state);
});