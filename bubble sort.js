let numbers = [];
let selected = [];
const container = document.getElementById("game-container");
const message = document.getElementById("message");
let currentLevelSize = 6; // default level size

// Generate random unique numbers
function generateNumbers(size = 6) {
  numbers = [];
  while (numbers.length < size) {
    const num = Math.floor(Math.random() * 90) + 10;
    if (!numbers.includes(num)) numbers.push(num);
  }
}

// Render number blocks
function renderBlocks() {
  container.innerHTML = "";
  numbers.forEach((num, i) => {
    const block = document.createElement("div");
    block.className = "block";
    block.innerText = num;
    block.dataset.index = i;
    block.onclick = handleSelect;
    container.appendChild(block);
  });
}

// Handle block selection and swapping
function handleSelect(event) {
  const block = event.target;
  const index = parseInt(block.dataset.index);

  if (selected.length === 0) {
    selected.push(index);
    block.classList.add("selected");
  } else if (selected.length === 1 && selected[0] !== index) {
    selected.push(index);
    const blocks = document.querySelectorAll(".block");
    blocks[selected[1]].classList.add("selected");

    // Adjacent check
    if (Math.abs(selected[0] - selected[1]) !== 1) {
      showMessage("❌ Choose adjacent blocks only.");
      resetSelection();
      return;
    }

    const i = selected[0], j = selected[1];
    if (numbers[i] > numbers[j]) {
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      showMessage("✅ Correct swap!");
      renderBlocks();
      checkSorted();
    } else {
      showMessage("❌ Wrong move. Try again.");
    }
    resetSelection();
  }
}

// Reset selection
function resetSelection() {
  selected = [];
  document.querySelectorAll(".block").forEach(b => b.classList.remove("selected"));
}

// Show message
function showMessage(msg) {
  message.textContent = msg;
}

// Check if array is sorted
function checkSorted() {
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] > numbers[i + 1]) return;
  }
  showMessage("🎉 Congratulations! You sorted the array!");
}

// Restart current level
function restartGame() {
  generateNumbers(currentLevelSize);
  renderBlocks();
  message.textContent = "";
}

// Set level and highlight active circle
function setLevel(size) {
  currentLevelSize = size;
  restartGame();

  // Highlight active level circle
  document.querySelectorAll(".level-circle").forEach(c => c.classList.remove("active"));
  const index = [4, 6, 8, 10].indexOf(size);
  if (index !== -1) {
    document.querySelectorAll(".level-circle")[index].classList.add("active");
  }
}

// Start game at default
restartGame();
