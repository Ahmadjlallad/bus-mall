"use strict";

// ==========================> function sections
// =========> function random

function randomMaker() {
  return Math.floor(Math.random() * BusMall.ArrayOfObject.length);
}

// =========> function to make Object

function objectMaker() {
  for (let i = 0; i < arrayOfItems.length; i++) {
    for (let j = 0; j < 2; j++) {
      new BusMall(arrayOfItems[i][j], arrayOfItems[i][++j]);
    }
  }
}

// =========> function render

function render() {
  _img_one = randomMaker();
  _img_two = randomMaker();
  _img_three = randomMaker();
  while (
    _img_one === _img_three ||
    _img_one === _img_two ||
    _img_two === _img_three
  ) {
    if (_img_one === _img_two || _img_one === _img_three) {
      _img_one = randomMaker();
    } else if (_img_two === _img_three) {
      _img_two = randomMaker();
    }
  }
  let ArrayOfRandomResults = [_img_one, _img_two, _img_three];
  for (let i = 0; i < 3; i++) {
    document.getElementsByClassName("sec-img")[i].src =
      BusMall.ArrayOfObject[ArrayOfRandomResults[i]].Path;
    document.getElementsByClassName("sec-img")[i].alt =
      BusMall.ArrayOfObject[ArrayOfRandomResults[i]].Path;
    BusMall.ArrayOfObject[ArrayOfRandomResults[i]].shown++;
  }
  return _img_one, _img_two, _img_three;
}

// =========> function eventSelectionHandler

function eventSelectionHandler(event) {
  let a = event.target.id;
  //   console.log(a);
  //   console.log(BusMall.ArrayOfObject);
  if (a !== `sec-one`) {
    counter++;
    if (counter <= 25) {
      //   console.log(a, counter);

      if (a === "first") {
        BusMall.ArrayOfObject[_img_one].selected++;
      } else if (a === "second") {
        BusMall.ArrayOfObject[_img_two].selected++;
      } else if (a === "third") {
        BusMall.ArrayOfObject[_img_three].selected++;
      }
      render();
    } else {
      document
        .querySelector("#sec-one")
        .removeEventListener("click", eventSelectionHandler);
    }
  }
}

// =========> function resultHandler

function resultHandler() {
  for (let i = 0; i < BusMall.ArrayOfObject.length; i++) {
    const li = document.createElement("li");
    document.querySelector(".sec2-li").appendChild(li);
    li.textContent = `${BusMall.ArrayOfObject[i].Name} had ${BusMall.ArrayOfObject[i].selected} votes, and was seen ${BusMall.ArrayOfObject[i].shown} times.`;
  }
  document.querySelector(".btn").removeEventListener("click", resultHandler);
}

// =========> important globe var

let _img_one;
let _img_two;
let _img_three;
let counter = 0;
BusMall.ArrayOfObject = [];

// =========> Array for the imgs

let arrayOfItems = [
  ["bag", "img/bag.jpg"],
  ["banana", "img/banana.jpg"],
  ["bathroom", "img/bathroom.jpg"],
  ["boots", "img/boots.jpg"],
  ["breakfast", "img/breakfast.jpg"],
  ["bubblegum", "img/bubblegum.jpg"],
  ["chair", "img/chair.jpg"],
  ["cthulhu", "img/cthulhu.jpg"],
  ["duck", "img/dog-duck.jpg"],
  ["dragon", "img/dragon.jpg"],
  ["pen", "img/pen.jpg"],
  ["pet", "img/pet-sweep.jpg"],
  ["scissors", "img/scissors.jpg"],
  ["shark", "img/shark.jpg"],
  ["sweep", "img/sweep.png"],
  ["tauntaun", "img/tauntaun.jpg"],
  ["unicorn", "img/unicorn.jpg"],
  ["water", "img/water-can.jpg"],
  ["wine", "img/wine-glass.jpg"],
];

// ============================================> Constrictor

function BusMall(Name, Path) {
  this.Name = Name;
  this.Path = Path;
  this.shown = 0;
  this.selected = 0;
  BusMall.ArrayOfObject.push(this);
}

// =========> event listener and objectMaker render call

objectMaker();
render();
document
  .querySelector("#sec-one")
  .addEventListener("click", eventSelectionHandler);
document.querySelector(".btn").addEventListener("click", resultHandler);
