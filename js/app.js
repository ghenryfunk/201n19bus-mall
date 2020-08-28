'use strict';

var productArray = [];
var secondaryArray = [];
// var clickedArray = [];
// var viewedArray = [];

var imgOneEl = document.getElementById('img-one');
var imgTwoEl = document.getElementById('img-two');
var imgThreeEl = document.getElementById('img-three');

var theadEl = document.getElementById('thead');
var tbodyEl = document.getElementById('tbody');

var clicks = 25;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.viewed = 0;
  this.clicked = 0;

  productArray.push(this);
}

new Product('bag', './img/img/bag.jpg');
new Product('banana', './img/img/banana.jpg');
new Product('bathroom', './img/img/bathroom.jpg');
new Product('boots', './img/img/boots.jpg');
new Product('breakfast', './img/img/breakfast.jpg');
new Product('bubblegum', './img/img/bubblegum.jpg');
new Product('chair', './img/img/chair.jpg');
new Product('cthulhu', './img/img/cthulhu.jpg');
new Product('dog-duck', './img/img/dog-duck.jpg');
new Product('dragon', './img/img/dragon.jpg');
new Product('pen', './img/img/pen.jpg');
new Product('pet-sweep', './img/img/pet-sweep.jpg');
new Product('scissors', './img/img/scissors.jpg');
new Product('shark', './img/img/shark.jpg');
new Product('sweep', './img/img/sweep.png');
new Product('tauntaun', './img/img/tauntaun.jpg');
new Product('unicorn', './img/img/unicorn.jpg');
new Product('usb', './img/img/usb.gif');
new Product('water-can', './img/img/water-can.jpg');
new Product('wine-glass', './img/img/wine-glass.jpg');

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function renderProducts() {
  var productOne = productArray[randomNumber(productArray.length)];
  var productTwo = productArray[randomNumber(productArray.length)];
  var productThree = productArray[randomNumber(productArray.length)];

  while (
    productOne === productTwo ||
    productTwo === productThree ||
    productOne === productThree
  ) {
    productOne = productArray[randomNumber(productArray.length)];
    productTwo = productArray[randomNumber(productArray.length)];
    productThree = productArray[randomNumber(productArray.length)];
  }

  imgOneEl.alt = productOne.name;
  imgOneEl.src = productOne.src;
  productOne.viewed++;

  imgTwoEl.alt = productTwo.name;
  imgTwoEl.src = productTwo.src;
  productTwo.viewed++;

  imgThreeEl.alt = productThree.name;
  imgThreeEl.src = productThree.src;
  productThree.viewed++;
}

imgOneEl.addEventListener('click', handleClick);
imgTwoEl.addEventListener('click', handleClick);
imgThreeEl.addEventListener('click', handleClick);

function stopClicks() {
  imgOneEl.removeEventListener('click', handleClick);
  imgTwoEl.removeEventListener('click', handleClick);
  imgThreeEl.removeEventListener('click', handleClick);
  console.log(productArray);
  renderTableResults();
  // for (var i = 0; i < productArray.length; i++) {
  //   var listEl = document.createElement('li');
  //   listEl.textContent = `${productArray[i].name}, clicked ${productArray[i].clicked} times, viewed ${productArray[i].viewed} times.`;
  //   ulEl.appendChild(listEl);
  // }
  // console.log(clickedArray);
}

function handleClick(e) {
  clicks--;
  console.log(e);
  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].name === e.target.alt) {
      productArray[i].clicked++;
      // clickedArray.push(productArray[i].name); // This is pushing way more than the 5 clicks...
      renderProducts();
    }
  }
  if (clicks === 0) {
    stopClicks();
  }
  console.log(productArray);
}

renderProducts();

// Working on rendering a table for results (prior to chartJS)//

function createElement(element, textContent, parent) {
  var newElement = document.createElement(element);
  newElement.textContent = textContent;
  parent.appendChild(newElement);
  return newElement;
}

function renderTableResults(){
  var trHead = createElement('tr', '', theadEl);
  createElement('td', 'Product', trHead);
  createElement('td', '# of views', trHead);
  createElement('td', '# of clicks', trHead);

  for (var i = 0; i < productArray.length; i++) {
    var trBody = createElement('tr', '', tbodyEl);
    createElement('td', productArray[i].name, trBody);
    createElement('td', productArray[i].viewed, trBody);
    createElement('td', productArray[i].clicked, trBody);
  }
}
