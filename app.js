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
let ArrayOfRandomResults = [];
function render() {
  _img_one = randomMaker();
  _img_two = randomMaker();
  _img_three = randomMaker();

  let resultOfInclude =
    ArrayOfRandomResults.includes(_img_one) ||
    ArrayOfRandomResults.includes(_img_two) ||
    ArrayOfRandomResults.includes(_img_three);
  // console.log(
  //   `\u001b[32m new one ${_img_one} Tow ${_img_two} Three ${_img_three} \u001b[0m `
  // );
  // console.log(`\u001b[33m old Array Of Random Results ${ArrayOfRandomResults}`);
  // console.log(`\u001b[36m result Of Include ${resultOfInclude}`);
  while (
    _img_one === _img_three ||
    _img_one === _img_two ||
    _img_two === _img_three ||
    resultOfInclude
  ) {
    if (_img_one === _img_two || _img_one === _img_three) {
      _img_one = randomMaker();
    } else if (_img_two === _img_three) {
      _img_two = randomMaker();
    } else if (ArrayOfRandomResults.includes(_img_one)) {
      _img_one = randomMaker();
    } else if (ArrayOfRandomResults.includes(_img_two)) {
      _img_two = randomMaker();
    } else if (ArrayOfRandomResults.includes(_img_three)) {
      _img_three = randomMaker();
    }
    resultOfInclude =
      ArrayOfRandomResults.includes(_img_one) ||
      ArrayOfRandomResults.includes(_img_two) ||
      ArrayOfRandomResults.includes(_img_three);
    // console.log(`\u001b[35m after result Of Include ${resultOfInclude}`);
  }
  ArrayOfRandomResults = [_img_one, _img_two, _img_three];
  // console.log(`\u001b[33m after result Of Include ${ArrayOfRandomResults}`);
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

// =========> function chart

function chart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: arrayOfNames,
      datasets: [
        {
          label: "Selected photo",
          data: arrayOfSelected,
          backgroundColor: ["#2a9d8f"],

          borderWidth: 1,
          borderRadius: 3,
        },
        {
          label: "Shown photo",
          data: arrayOfShown,
          backgroundColor: ["#e63946"],

          borderWidth: 1,
          borderRadius: 3,
        },
      ],
    },
  });
}

// =========> function resultHandler

function resultHandler() {
  // using the function to get state of the Ls if there are No kye Value in the ls do if statement save the shown and selected numbers to arrays and than set the LS this is for the first time

  if (!getLs()) {
    for (let i = 0; i < BusMall.ArrayOfObject.length; i++) {
      arrayOfSelected.push(BusMall.ArrayOfObject[i].selected);
      arrayOfShown.push(BusMall.ArrayOfObject[i].shown);
      arrayOfNames.push(BusMall.ArrayOfObject[i].Name);
      // const li = document.createElement("li");
      // document.querySelector(".sec2-li").appendChild(li);
      // li.textContent = `${BusMall.ArrayOfObject[i].Name} had ${BusMall.ArrayOfObject[i].selected} votes, and was seen ${BusMall.ArrayOfObject[i].shown} times.`;
    }
    setLs(BusMall.ArrayOfObject);

    //if there are value Do else add the value of local storage that stored in varStoreDataLs to ArrayOfObjects to The arrays that responsive to make the chart than stored values of the show and selected arrays in ArrayOfObjects
  } else {
    get = localStorage.getItem("BusMall");
    for (let i = 0; i < BusMall.ArrayOfObject.length; i++) {
      arrayOfNames.push(BusMall.ArrayOfObject[i].Name);
      arrayOfSelected.push(
        BusMall.ArrayOfObject[i].selected + varStoreDataLs[i].selected
      );
      arrayOfShown.push(
        BusMall.ArrayOfObject[i].shown + varStoreDataLs[i].shown
      );
      varStoreDataLs[i].selected = arrayOfSelected[i];
      varStoreDataLs[i].shown = arrayOfShown[i];
    }

    console.table("shown & selected", arrayOfSelected, arrayOfShown);
    console.log(BusMall.ArrayOfObject);
    console.table("get", varStoreDataLs);
    setLs(varStoreDataLs);
  }

  // console.log(arrayOfSelected);
  // console.log(arrayOfShown);
  // console.log(BusMall.ArrayOfObject);
  chart();
  document.querySelector(".btn").removeEventListener("click", resultHandler);
}

// =========> important globe var
let arrayOfSelected = [];
let arrayOfShown = [];
let arrayOfNames = [];
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

// set local storage kye value

function setLs(DataSet) {
  let setConverted = JSON.stringify(DataSet);
  let set = localStorage.setItem("BusMall", setConverted);
}
let get = localStorage.getItem("BusMall");
let getConverted = JSON.parse(get);

// var for save and modified the local storage

let varStoreDataLs = getConverted;

// get the state of local storage

function getLs() {
  let getConvert = JSON.parse(get);
  return getConvert;
}

console.log(varStoreDataLs);
