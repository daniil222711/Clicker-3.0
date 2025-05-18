let count = 0;
let clickValue = 1;
let clickRate = 0;
let lastClickTime = Date.now();
let upgradesVisible = false;
let upgrades = [
  { name: "Запуск темки", cost: 100, bonus: 1 },
  { name: "Буст рекламы", cost: 500, bonus: 2 },
  { name: "Сайт-визитка", cost: 1200, bonus: 3 },
  { name: "Промо с лидом", cost: 2500, bonus: 5 },
  { name: "SMM разгон", cost: 5000, bonus: 10 }
];

let backgroundLevels = [
  { threshold: 0, image: "bg1.jpg" },
  { threshold: 100, image: "bg2.jpg" },
  { threshold: 500, image: "bg3.jpg" },
  { threshold: 1000, image: "bg4.jpg" },
  { threshold: 5000, image: "bg5.jpg" }
];

let upgradeMultipliers = Array(upgrades.length).fill(1);

// DOM элементы
const clickCount = document.getElementById("click-count");
const clickButton = document.getElementById("click-button");
const clickRateElem = document.getElementById("click-rate");
const toggleBtn = document.getElementById("toggle-upgrades");
const upgradeList = document.getElementById("upgrade-list");
const background = document.getElementById("background");

// Обработка клика
clickButton.addEventListener("click", (e) => {
  count += clickValue;
  updateCount();
  showFloatingText(e.clientX, e.clientY, "+" + clickValue);
  updateBackground();
});

// Кнопка меню улучшений
toggleBtn.addEventListener("click", () => {
  upgradesVisible = !upgradesVisible;
  upgradeList.classList.toggle("hidden", !upgradesVisible);
});

// Покупка улучшений
function buyUpgrade(index) {
  const cost = Math.floor(upgrades[index].cost * upgradeMultipliers[index]);
  if (count >= cost) {
    count -= cost;
    clickValue += upgrades[index].bonus;
    upgradeMultipliers[index] *= 1.2;
    updateCount();
    renderUpgrades();
  }
}

function renderUpgrades() {
  upgradeList.innerHTML = "";
  upgrades.forEach((upg, index) => {
    const cost = Math.floor(upg.cost * upgradeMultipliers[index]);
    const item = document.createElement("div");
    item.className = "upgrade";
    item.textContent = `${upg.name} (+${upg.bonus}) — ${cost}₽`;
    item.onclick = () => buyUpgrade(index);
    upgradeList.appendChild(item);
  });
}

function updateCount() {
  clickCount.textContent = count + " рублей";
}

function updateBackground() {
  for (let i = backgroundLevels.length - 1; i >= 0; i--) {
    if (count >= backgroundLevels[i].threshold) {
      background.style.backgroundImage = `url('${backgroundLevels[i].image}')`;
      break;
    }
  }
}

// Плавающий текст
function showFloatingText(x, y, text) {
  const floatText = document.createElement("div");
  floatText.className = "floating-text";
  floatText.style.left = x + "px";
  floatText.style.top = y + "px";
  floatText.textContent = text;
  document.body.appendChild(floatText);
  setTimeout(() => document.body.removeChild(floatText), 1000);
}

// Скорость клика
setInterval(() => {
  const now = Date.now();
  const seconds = (now - lastClickTime) / 1000;
  clickRate = (count / seconds).toFixed(2);
  clickRateElem.textContent = "Скорость: " + clickRate + "₽/сек";
}, 1000);

renderUpgrades();
updateCount();
updateBackground();
