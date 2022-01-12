"use strict";

const pfeffel = function pfeffel() {

  /* Initialisation */

  const word_length = 5;
  let max_guesses = 6;
  const tries = [];
  const words = [
    "AWFUL", "BULLY", "CHEAT", "DRONE", "ERROR", "FRAUD", "GHOST", "HAVOC",
    "IRATE", "JOKER", "KNAVE", "LYING", "MOOCH", "NASTY", "OPTIC", "POWER",
    "QUACK", "ROGUE", "STEAL", "TRICK", "UNFIT", "VENAL", "WRONG"
  ];
  let cur_guess;
  let cur_letter;
  let word;

  function init() {
    for(let i = 0; i < max_guesses; i++) {
      tries.push(Array(word_length).fill(" "));
    }
    cur_guess = 1;
    cur_letter = 1;
    word = words[Math.floor(Math.random() * words.length)];
    draw_gameboard();
    draw_keyboard();
  }

  /* Game */

  function restart() {
    window.location.reload();
  }

  function win_game() {
    alert(`Well done. You guessed the word in ${cur_guess}/6 tries.\nNo share button though. Tories don't share.`);
    restart();
  }

  function lose_game() {
    alert(`Sorry. You did not guess the word. It was ${word}.`);
    restart();
  }

  function pfeffel(mark) {
    const options = ["guess-right", "guess-present", "guess-wrong"];
    const pfeffeled = options.filter(function(item) { return item !== mark });
    return pfeffeled[Math.floor(Math.random() * 2)];
  }

  function mark_guess(candidate) {
    const cletters = candidate.split("");
    const wletters = word.split("");
    let mark;
    let correct = 0;
    for (let i = 0; i < word_length; i++) {
      if (wletters.includes(cletters[i])) {
        if (cletters[i] == wletters[i]) {
          // correct
          mark = pfeffel("guess-right");
          correct++;
        } else {
          // present but wrong place
          mark = pfeffel("guess-present");
        }
      } else {
          // wrong
          mark = pfeffel("guess-wrong");
      }
      const letterbox = document.getElementById(`guess-${cur_guess}-${i + 1}`);
      letterbox.classList.add(mark);
      if (mark == "guess-wrong") {
        const key = document.getElementById(`key-${cletters[i]}`);
        key.classList.add("key-wrong");
      }
    }
    if (correct == 5) {
      win_game();
    }
    if (cur_guess == max_guesses) {
      lose_game();
    }
  }

  /* Input handlers */

  function add_letter(letter) {
    if (cur_letter == 6) {
      return;
    }
    const id = `guess-${cur_guess}-${cur_letter}`;
    const letterbox = document.getElementById(id);
    letterbox.innerHTML = `${letter}`;
    cur_letter++;
  }

  function delete_letter() {
    if (cur_letter == 1) {
      return;
    }
    const id = `guess-${cur_guess}-${cur_letter - 1}`;
    const letterbox = document.getElementById(id);
    letterbox.innerHTML = `\xa0\xa0\xa0\xa0\xa0`;
    cur_letter--;
  }

  function submit_guess() {
    if (cur_letter != 6) {
      return;
    }
    let candidate = "";
    for (let i = 0; i < word_length; i++) {
      const id = `guess-${cur_guess}-${i + 1}`;
      candidate += document.getElementById(id).innerHTML;
    }
    mark_guess(candidate);
    cur_guess++;
    cur_letter = 1;
  }

  // key_handler
  // Event handler bound to onscreen keyboard
  // FIXME: later we should add real keyboard handling too
  function key_handler(e) {
    const key = e.target.id.split("-", 2)[1];
    switch (key) {
      case 'Enter':
        submit_guess();
        break;
      case 'Del':
        delete_letter();
        break;
      default:
        add_letter(key);
    }
  }

  /* Drawing functions */

  function draw_gameboard() {
    const container = document.getElementById("gameboard");
    let guess = 1;
    let letter = 1;
    for (const row of tries) {
      const guess_div = document.createElement("div");
      for (const col of row) {
        const letter_span = document.createElement("span");
        letter_span.appendChild(document.createTextNode("\xa0\xa0\xa0\xa0\xa0"));
        letter_span.classList.add("letter");
        letter_span.id = `guess-${guess}-${letter}`;
        guess_div.appendChild(letter_span);
        letter += 1;
      }
      guess_div.classList.add("guess");
      container.appendChild(guess_div);
      guess += 1;
      letter = 1;
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
        key_span.addEventListener("click", key_handler, false);
        row_div.appendChild(key_span);
      }
      row_div.classList.add("keyrow");
      container.appendChild(row_div);
    }
  }

  /* Exported functions */
  return {
    init: init,
  };
}();

pfeffel.init();
