const iconBox = document.querySelector(".icon-box");
const settingIcon = document.querySelector(".setting-icon");
const menuIcon = document.querySelector(".menu-icon");
const levelContainer = document.querySelector(".level-container");
const settingContainer = document.querySelector(".setting-container");
const board = document.querySelector(".board");

menuIcon.addEventListener("click", () => {
  levelContainer.classList.add("show-level-container");
  iconBox.classList.add("hidden-icon");
  board.classList.add("block");
  levelContainer.addEventListener("click", () => {
    levelContainer.classList.remove("show-level-container");
    iconBox.classList.remove("hidden-icon");
    board.classList.remove("block");
  });
});

settingIcon.addEventListener("click", () => {
  settingContainer.classList.add("show-setting-container");
  iconBox.classList.add("hidden-icon");
  board.classList.add("block");
  settingContainer.addEventListener("click", () => {
    settingContainer.classList.remove("show-setting-container");
    iconBox.classList.remove("hidden-icon");
    board.classList.remove("block");
  });
});
