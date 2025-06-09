// filters.js

const wrappers = document.querySelectorAll(".wrapper");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let start = 0;
let end = 10;

const hideAllWrappers = () => {
  wrappers.forEach(el => {
    el.classList.add("hide");
    el.style.display = "none";
  });
};

const showInitialPage = () => {
  hideAllWrappers();
  wrappers.forEach((el, i) => {
    if (i < end) {
      el.classList.remove("hide");
      el.style.display = "block";
    };
  });
};

const setupPagination = () => {
  next?.addEventListener("click", () => {
    if (end >= wrappers.length) return;
    hideAllWrappers();
    start = end;
    end += 10;
    wrappers.forEach((el, i) => {
      if (i >= start && i < end) {
        el.classList.remove("hide");
        el.style.display = "block";
      };
    });
  });

  prev?.addEventListener("click", () => {
    if (start <= 0) return;
    hideAllWrappers();
    end = start;
    start -= 10;
    wrappers.forEach((el, i) => {
      if (i >= Math.max(start, 0) && i < end) {
        el.classList.remove("hide");
        el.style.display = "block";
      };
    });
  });
};

const typewriter = () => {
  // const aText = [
  //   "This is Facts - Website, You can Read New and Unique Fact. This Website Provides you a Inspiring, Fun, Motivational, New, and many more types of Facts.",
  //   "If You are Developer or You Want Contribute then click on Contribute button and solve issues or add Unique Facts.",
  //   "If you are Normal User then do not Click on Contribute Button you can only Read Facts."
  // ];
  const speed = 100;
  let index = 0;
  let arrLength = aText[0].length;
  const scrollAt = 20;
  let textPos = 0;
  let contents = "";
  let row;
  const destination = document.getElementById("typedtext");
  if (!destination) return;

  const typeWriter = () => {
    contents = " ";
    row = Math.max(0, index - scrollAt);
    while (row < index) contents += `${aText[row++]}<br />`;

    destination.innerHTML = `${contents}${aText[index].substring(0, textPos)}_`;

    if (textPos++ === arrLength) {
      textPos = 0;
      index++;
      if (index !== aText.length) {
        arrLength = aText[index].length;
        setTimeout(typeWriter, 500);
      }
    } else {
      setTimeout(typeWriter, speed);
    }
  };

  typeWriter();
};

const setupFiltering = () => {
  const topicButtons = document.querySelectorAll(".genre-card");
  const factCards = document.querySelectorAll(".wrapper");

  topicButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      const selectedTopic = button.getAttribute("data-topic");

      topicButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // show filtered cards only, remove hide class
      factCards.forEach(card => {
        const cardTopic = card.getAttribute("data-topic");
        if (selectedTopic === "all" || selectedTopic === cardTopic) {
          card.style.display = "block";
          card.classList.remove("hide");
        } else {
          card.style.display = "none";
        }
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  typewriter();
  showInitialPage();
  setupPagination();
  setupFiltering();
});