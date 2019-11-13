/* Pushes the key id's into the notes array, making all piano key divs available to notes array */
const keys = [
  "c-key",
  "csharp-key",
  "d-key",
  "dsharp-key",
  "e-key",
  "f-key",
  "fsharp-key",
  "g-key",
  "gsharp-key",
  "a-key",
  "asharp-key",
  "b-key",
  "chigh-key"
];

const notes = [];

keys.forEach(key => {
  notes.push(document.getElementById(key));
});

/* Sets a delay before the pressed note disapears from the display in #notebox */
let timerNote;
const timerNoteDelay = () => {
  clearTimeout(timerNote);
  timerNote = setTimeout(() => {
    $("#notebox").html(" ");
  }, 1500);
};

/* Stops note audio playing on repeated key presses of the same key */
const stopAudio = audio => {
  audio.pause();
  audio.currentTime = 0;
};

/* Events triggered on a key being pressed */
const keyDown = key => {
  let playAudio = key.target.getAttribute("data-sound"); // assigns the data-sound attribute of the pressed key to playAudio
  let targetPlayAudio = document.getElementById(playAudio); // matches the data-sound info the ID of the audio track
  stopAudio(targetPlayAudio); // resets audio track if pressed before audio finished
  targetPlayAudio.play(); // plays audio on keypress
  key.target.setAttribute("style", "background-color: orange; border: orange"); // indicates key has been pressed visually
  $("#notebox").html(key.target.getAttribute("data-note")); // fetch and pass note displayed in notebox above piano
};

/* Events trigged on a key being released */
const keyUp = key => {
  key.target.setAttribute("style", "background-color: ; border: ");
  timerNoteDelay();
};

/* Assigns the keyDown and keyUp variables to pointer events and makes them available to all piano keys. keyPress uses pointer instead of mouse to allow finger input on touchscreen laptops */
const keyPress = note => {
  note.onpointerdown = () => {
    keyDown(event);
  };
  note.onpointerup = () => {
    keyUp(event);
  };
  note.onpointerleave = () => {
    keyUp(event);
  };
};

/* Makes the keyPress variable available to all the key divs that were pushed to the notes array */
notes.forEach(keyPress);

/* Game */

const testSong = ["c-key", "f-key", "d-key", "chigh-key"];

$("#startTutor").click(startTutorDemo);

function startTutorDemo() {
  let order = testSong;
  let keyObject = {};
  let keyObjPrev = {};
  for (let i = 0; i < testSong.length; i++) {
    //https://stackoverflow.com/questions/11764714/applying-delay-between-iterations-of-javascript-for-loop
    (function(i) {
      setTimeout(function() {
        keyId = document.getElementById(order[i]);
        keyIdPrev = document.getElementById(order[i - 1]);
        keyObject.target = keyId;
        keyObjPrev.target = keyIdPrev;

        keyDown(keyObject);

        keyUp(keyObjPrev);
      }, 750 * i);
      console.log("hello");
    })(i);
  }
}
