const calculateBtn = document.getElementById("calculate-btn");
const clearBtn = document.getElementById("clear-btn");
const yourNameInput = document.getElementById("your-name");
const partnerNameInput = document.getElementById("partner-name");
const resultContainer = document.getElementById("result");
const loadingSpinner = document.getElementById("loading-spinner");
const progressBar = document.getElementById("progress-bar");

const predefinedLovePercentages = {
  "jaydatt|rani": 100,
  "jaydatt|sneha": 100,
  "raj|lisha": 100,
  "santhosh|eram": 100,
  // Add more pairs as needed
};

const zodiacCompatibility = {
  "aries|leo": 90,
  "taurus|virgo": 85,
  "gemini|sagittarius": 80,
  // Add more zodiac pairings
};

calculateBtn.addEventListener("click", () => {
  clearResult();

  const yourName = yourNameInput.value.trim();
  const partnerName = partnerNameInput.value.trim();

  if (!validateInputs(yourName, partnerName)) {
    return;
  }

  startProgressBar();
  showLoading(true);

  setTimeout(() => {
    const lovePercentage = calculateAdvancedLovePercentage(yourName, partnerName);
    const resultText = `Love Percentage between ${yourName} and ${partnerName}: ${lovePercentage}%`;
    const emoji = getEmoji(lovePercentage);
    displayResult(resultText, emoji);
    showLoading(false);
    completeProgressBar();
  }, 2000); // Simulate a delay
});

clearBtn.addEventListener("click", () => {
  resetForm();
  clearResult();
  resetProgressBar();
});

function calculateAdvancedLovePercentage(name1, name2) {
  const nameKey = createNameKey(name1, name2);

  let percentage = 50; // Base percentage

  // Predefined percentages
  if (predefinedLovePercentages.hasOwnProperty(nameKey)) {
    percentage = predefinedLovePercentages[nameKey];
  }

  // Add logic for character matching
  percentage += calculateCharacterMatchScore(name1, name2);

  // Adjust for name length difference
  percentage -= Math.abs(name1.length - name2.length);

  // Adjust based on vowel count matching
  percentage += calculateVowelMatchScore(name1, name2);

  // Add zodiac compatibility score
  percentage += calculateZodiacCompatibility(name1, name2);

  // Cap the result between 50 and 100
  return Math.min(Math.max(percentage, 50), 100);
}

function calculateCharacterMatchScore(name1, name2) {
  const name1Chars = new Set(name1.toLowerCase());
  const name2Chars = new Set(name2.toLowerCase());
  let matchCount = 0;

  name1Chars.forEach(char => {
    if (name2Chars.has(char)) {
      matchCount++;
    }
  });

  return matchCount * 2; // Each match adds 2% to the score
}

function calculateVowelMatchScore(name1, name2) {
  const vowels = "aeiou";
  const name1Vowels = name1.toLowerCase().split("").filter(char => vowels.includes(char));
  const name2Vowels = name2.toLowerCase().split("").filter(char => vowels.includes(char));
  let matchCount = 0;

  name1Vowels.forEach(vowel => {
    if (name2Vowels.includes(vowel)) {
      matchCount++;
    }
  });

  return matchCount * 3; // Each matching vowel adds 3% to the score
}

function calculateZodiacCompatibility(name1, name2) {
  // Simple zodiac sign compatibility (assume names map to zodiac signs)
  const zodiacSigns = {
    "aries": "aries",
    "leo": "leo",
    "taurus": "taurus",
    "virgo": "virgo",
    "gemini": "gemini",
    "sagittarius": "sagittarius",
    // Add more zodiac signs
  };

  const name1Sign = mapNameToZodiac(name1.toLowerCase());
  const name2Sign = mapNameToZodiac(name2.toLowerCase());

  const compatibilityKey = `${name1Sign}|${name2Sign}`;
  return zodiacCompatibility[compatibilityKey] || 0;
}

function mapNameToZodiac(name) {
  // Basic mapping from names to zodiac signs (customize as needed)
  if (name.includes("aries") || name.includes("leo")) return "aries";
  if (name.includes("taurus") || name.includes("virgo")) return "taurus";
  if (name.includes("gemini") || name.includes("sagittarius")) return "gemini";
  return "aries"; // Default sign
}

function createNameKey(name1, name2) {
  const lowerName1 = name1.toLowerCase();
  const lowerName2 = name2.toLowerCase();
  return [lowerName1, lowerName2].sort().join("|");
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
  resultContainer.style.color = getResultColor(text);
}

function getResultColor(text) {
  if (text.includes("100%")) {
    return "green";
  } else if (text.includes("50%")) {
    return "red";
  } else {
    return "blue";
  }
}

function validateInputs(name1, name2) {
  const nameRegex = /^[a-zA-Z]+$/;

  if (!name1 || !name2) {
    displayResult("Please enter both names.", "😢");
    return false;
  }

  if (!nameRegex.test(name1) || !nameRegex.test(name2)) {
    displayResult("Please enter valid alphabetic names only.", "😢");
    return false;
  }

  return true;
}

function showLoading(show) {
  loadingSpinner.style.display = show ? "block" : "none";
}

function startProgressBar() {
  progressBar.style.width = "0";
  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 100);
}

function completeProgressBar() {
  progressBar.style.width = "100%";
}

function resetProgressBar() {
  progressBar.style.width = "0";
}

function resetForm() {
  yourNameInput.value = "";
  partnerNameInput.value = "";
  yourNameInput.focus();
}

function clearResult() {
  resultContainer.innerHTML = "";
  resultContainer.style.color = "inherit";
}
