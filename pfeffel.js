"use strict";

const pfeffel = function pfeffel() {

  const word_length = 5;
  let max_guesses = 6;
  const tries = [];
  const words = [
    "AWFUL", "BULLY", "CHEAT", "DRONE", "ERROR", "FRAUD", "GHOST", "HAVOC",
    "IRATE", "JOKER", "KNAVE", "LYING", "MOOCH", "NASTY", "OPTIC", "POWER",
    "QUACK", "ROGUE", "STEAL", "TRICK", "UNFIT", "VENAL", "WRONG"
  ];
  let guess;
  let letter;
  let word;

  function init() {
    for(let i = 0; i < max_guesses; i++) {
      tries.push(Array(word_length).fill(" "));
    }
    guess = 1;
    letter = 1;
    word = words[Math.floor(Math.random() * words.length)];
    console.log(`The word is ${word}`);
    draw_gameboard();
    draw_keyboard();
  }

  function draw_gameboard() {
    const container = document.getElementById("gameboard");
    for (const guess of tries) {
      const guess_div = document.createElement("div");
      for (const letter of guess) {
        const letter_span = document.createElement("span");
        letter_span.appendChild(document.createTextNode("\xa0\xa0\xa0\xa0\xa0"));
        letter_span.classList.add("letter");
        guess_div.appendChild(letter_span);
      }
      guess_div.classList.add("guess");
      container.appendChild(guess_div);
    }
  }

  function draw_keyboard() {
    const keys = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"]
    ];
    const container = document.getElementById("keyboard");
    for (const row of keys) {
      const row_div = document.createElement("div");
      for (const key of row) {
        const key_span = document.createElement("span");
        key_span.appendChild(document.createTextNode(key));
        key_span.id = `key-${key}`;
        key_span.classList.add("key");
        row_div.appendChild(key_span);
      }
      row_div.classList.add("keyrow");
      container.appendChild(row_div);
    }
  }

  return {
    init: init,
  };
}();

pfeffel.init();
