const calculateBtn = document.getElementById("calculate-btn");
const yourNameInput = document.getElementById("your-name");
const partnerNameInput = document.getElementById("partner-name");
const resultContainer = document.getElementById("result");

// Store percentages for specific name pairs
const namePairsPercentages = {
  "jaydatt|rani": 100,
  "rani|jaydatt": 100,
  "jaydatt|sneha": 100,
  "sneha|jaydatt": 100,
  "jaydatt|snehaa": 100,
  "snehaa|jaydatt": 100,
  "raj|lisha": 100,
  "lisha|raj": 100,
  "santhosh|eram": 100,
  "eram|santhosh": 100,
  // Add more name pairs and percentages as needed
};

calculateBtn.addEventListener("click", () => {
  const yourName = yourNameInput.value.trim();
  const partnerName = partnerNameInput.value.trim();

  if (yourName === "" || partnerName === "") {
    displayResult("Please enter both names.", "failure");
    return;
  }

  const lovePercentage = calculateLovePercentage(yourName, partnerName);
  const resultText = `Love Percentage between ${yourName} and ${partnerName}: ${lovePercentage}%`;
  const emoji = getEmoji(lovePercentage);
  displayResult(resultText, emoji);
});

function calculateLovePercentage(name1, name2) {
  // Check if a specific percentage is defined for the name pair
  const key = `${name1.toLowerCase()}|${name2.toLowerCase()}`;
  if (namePairsPercentages.hasOwnProperty(key)) {
    return namePairsPercentages[key];
  } else {
    // Calculate a random love percentage between 50 and 100
    return Math.floor(Math.random() * 51) + 50;
  }
}

function getEmoji(percentage) {
  if (percentage >= 81) {
    return "🥰";
  } else if (percentage >= 61) {
    return "😊";
  } else {
    return "😢";
  }
}

function displayResult(text, emoji) {
  resultContainer.innerHTML = `<p>${text}</p><div class="emoji">${emoji}</div>`;
}
