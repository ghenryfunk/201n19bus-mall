'use strict';

// I re-wrote all of the below as I followed along w/ ryan's code review. This helped me to better understand what I had already done as well as fix the issues I was having with local storage persisting and avoiding repeats through the render queue//

// global variables
var allImages = [];
var renderQueue = [];
var imgElOne = document.getElementById('img-one');
var imgElTwo = document.getElementById('img-two');
var imgElThree = document.getElementById('img-three');
var myContainer = document.getElementById('image-container');
var myTableHead = document.getElementById('thead');
var myTableBody = document.getElementById('tbody');
// might need another one for 'tbody'
var clicks = 0;
var maxClicksAllowed = 25;

var retreivedImages = localStorage.getItem('busmall-images');
if (retreivedImages) {
  allImages = JSON.parse(retreivedImages);
} else {
  // 1. instantiations of img objects
  new Img('bag', './img/img/bag.jpg');
  new Img('banana', './img/img/banana.jpg');
  new Img('bathroom', './img/img/bathroom.jpg');
  new Img('boots', './img/img/boots.jpg');
  new Img('breakfast', './img/img/breakfast.jpg');
  new Img('bubblegum', './img/img/bubblegum.jpg');
  new Img('chair', './img/img/chair.jpg');
  new Img('cthulhu', './img/img/cthulhu.jpg');
  new Img('dog-duck', './img/img/dog-duck.jpg');
  new Img('dragon', './img/img/dragon.jpg');
  new Img('pen', './img/img/pen.jpg');
  new Img('pet-sweep', './img/img/pet-sweep.jpg');
  new Img('scissors', './img/img/scissors.jpg');
  new Img('shark', './img/img/shark.jpg');
  new Img('sweep', './img/img/sweep.png');
  new Img('tauntaun', './img/img/tauntaun.jpg');
  new Img('unicorn', './img/img/unicorn.jpg');
  new Img('usb', './img/img/usb.gif');
  new Img('water-can', './img/img/water-can.jpg');
  new Img('wine-glass', './img/img/wine-glass.jpg');
}

// constructor

function Img(name, src) {
  this.name = name;
  this.src = src;
  this.viewed = 0;
  this.clicked = 0;
  allImages.push(this);
}

// helper functions
// 1. random index
function getRandomIndex() {
  var num = Math.floor(Math.random() * Math.floor(allImages.length));
  return num;
}

// 1.5 createElement
function createElement(element, textContent, parent) {
  var newElement = document.createElement(element);
  newElement.textContent = textContent;
  parent.appendChild(newElement);
  return newElement;
}

// 2. create render queue
function createRenderQueue() {
  while (renderQueue.length > 3) {
    renderQueue.pop();
  }
  while (renderQueue.length < 6) {
    var i = getRandomIndex();
    while (renderQueue.includes(i)) {
      i = getRandomIndex();
    }
    renderQueue.unshift(i);
  }
  console.log(renderQueue);
}
// 3. renderImages
function renderImages() {
  createRenderQueue();
  imgElOne.src = allImages[renderQueue[0]].src;
  imgElOne.alt = allImages[renderQueue[0]].name;
  allImages[renderQueue[0]].viewed++;

  imgElTwo.src = allImages[renderQueue[1]].src;
  imgElTwo.alt = allImages[renderQueue[1]].name;
  allImages[renderQueue[1]].viewed++;

  imgElThree.src = allImages[renderQueue[2]].src;
  imgElThree.alt = allImages[renderQueue[2]].name;
  allImages[renderQueue[2]].viewed++;
}
// 4. renderList
function renderList() {
  var trHead = createElement('tr', '', myTableHead);
  createElement('td', 'Product', trHead);
  createElement('td', '# of views', trHead);
  createElement('td', '# of clicks', trHead);

  for (var i = 0; i < allImages.length; i++) {
    var trBody = createElement('tr', '', myTableBody);
    createElement('td', allImages[i].name, trBody);
    createElement('td', allImages[i].viewed, trBody);
    createElement('td', allImages[i].clicked, trBody);
  }
}

// 5. renderChart
function renderChart() {
  var labelArray = [];
  var viewArray = [];
  var clickArray = [];

  for (var i = 0; i < allImages.length; i++) {
    labelArray.push(allImages[i].name);
    viewArray.push(allImages[i].viewed);
    clickArray.push(allImages[i].clicked);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, { //eslint-disable-line
    //eslint-disable-line
    type: 'bar',
    data: {
      labels: labelArray,
      datasets: [
        {
          label: '# of views',
          data: viewArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
          ],
          borderWidth: 1,
        },
        {
          label: '# of clicks',
          data: clickArray,
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

// event handler
function handleClick(e) {
  clicks++;
  var clickedItem = e.target.alt;

  for (var i = 0; i < allImages.length; i++) {
    if (clickedItem === allImages[i].name) {
      allImages[i].clicked++;
    }
  }

  renderImages();

  if (clicks === maxClicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderList();
    renderChart();
    var stringifiedImages = JSON.stringify(allImages);
    localStorage.setItem('busmall-images', stringifiedImages);
  }
}

// document clicks
// rerender images
// render list (lab 11)
// render chart (lab 12)
// set to local storage (lab 13)

// executable

renderImages();
// 2. renderImages function

// event listener

myContainer.addEventListener('click', handleClick);

//ORIGINAL CODE I WAS CREATED BEFORE MY MAJOR CODE-REVIEW FROM RYAN'S CODE-REVIEW//
// var productArray = [];
// var secondaryArray = [];
// // six unique images will go into Secondary Array - this ensures that you never get a duplicate - get a function to always populate this 6 index array
// // var clickedArray = [];
// // var viewedArray = [];

// var imgOneEl = document.getElementById('img-one');
// var imgTwoEl = document.getElementById('img-two');
// var imgThreeEl = document.getElementById('img-three');

// var theadEl = document.getElementById('thead');
// var tbodyEl = document.getElementById('tbody');

// var clicks = 25;

// function Product(name, src, viewed = 0, clicked = 0) {
//   this.name = name;
//   this.src = src;
//   this.viewed = viewed;
//   this.clicked = clicked;

//   productArray.push(this);
// }

// function loadLocalStorage(){
//   if(localStorage.getItem('productArray')){
//     var localStorageProducts = JSON.parse(localStorage.getItem('productArray'));
//     for(var i = 0; i < localStorageProducts.length; i++){
//       new Product(localStorageProducts[i].name, localStorageProducts[i].src, localStorageProducts[i].clicked, localStorageProducts[i].viewed);
//     }
//   }
//   else {
//     new Product('bag', './img/img/bag.jpg');
//     new Product('banana', './img/img/banana.jpg');
//     new Product('bathroom', './img/img/bathroom.jpg');
//     new Product('boots', './img/img/boots.jpg');
//     new Product('breakfast', './img/img/breakfast.jpg');
//     new Product('bubblegum', './img/img/bubblegum.jpg');
//     new Product('chair', './img/img/chair.jpg');
//     new Product('cthulhu', './img/img/cthulhu.jpg');
//     new Product('dog-duck', './img/img/dog-duck.jpg');
//     new Product('dragon', './img/img/dragon.jpg');
//     new Product('pen', './img/img/pen.jpg');
//     new Product('pet-sweep', './img/img/pet-sweep.jpg');
//     new Product('scissors', './img/img/scissors.jpg');
//     new Product('shark', './img/img/shark.jpg');
//     new Product('sweep', './img/img/sweep.png');
//     new Product('tauntaun', './img/img/tauntaun.jpg');
//     new Product('unicorn', './img/img/unicorn.jpg');
//     new Product('usb', './img/img/usb.gif');
//     new Product('water-can', './img/img/water-can.jpg');
//     new Product('wine-glass', './img/img/wine-glass.jpg');
//   }
//   renderProducts();
// }

// function randomNumber(max) {
//   return Math.floor(Math.random() * max);
// }

// // Help From Ron //
// function uniqueArrayGenerator() {
//   //keeps the array filled with 6 unique values
//   while (secondaryArray.length < 6) {
//     var random = randomNumber();
//     while (!secondaryArray.includes(random)) {
//       console.log('building uniqueArray:  ', secondaryArray);
//       secondaryArray.push(random);
//     }
//   }
//   console.log('uniqueArray completed!!: ', secondaryArray);
// }

// function renderProducts() {
//   var productOne = productArray[randomNumber(productArray.length)];
//   var productTwo = productArray[randomNumber(productArray.length)];
//   var productThree = productArray[randomNumber(productArray.length)];

//   while (
//     productOne === productTwo ||
//     productTwo === productThree ||
//     productOne === productThree
//   ) {
//     productOne = productArray[randomNumber(productArray.length)];
//     productTwo = productArray[randomNumber(productArray.length)];
//     productThree = productArray[randomNumber(productArray.length)];
//   }

//   imgOneEl.alt = productOne.name;
//   imgOneEl.src = productOne.src;
//   productOne.viewed++;

//   imgTwoEl.alt = productTwo.name;
//   imgTwoEl.src = productTwo.src;
//   productTwo.viewed++;

//   imgThreeEl.alt = productThree.name;
//   imgThreeEl.src = productThree.src;
//   productThree.viewed++;
// }

// imgOneEl.addEventListener('click', handleClick);
// imgTwoEl.addEventListener('click', handleClick);
// imgThreeEl.addEventListener('click', handleClick);

// function stopClicks() {
//   imgOneEl.removeEventListener('click', handleClick);
//   imgTwoEl.removeEventListener('click', handleClick);
//   imgThreeEl.removeEventListener('click', handleClick);
//   console.log(productArray);
//   renderTableResults();
//   renderChart();
//   saveLocalStorage();
//   // for (var i = 0; i < productArray.length; i++) {
//   //   var listEl = document.createElement('li');
//   //   listEl.textContent = `${productArray[i].name}, clicked ${productArray[i].clicked} times, viewed ${productArray[i].viewed} times.`;
//   //   ulEl.appendChild(listEl);
//   // }
//   // console.log(clickedArray);
// }

// function handleClick(e) {
//   clicks--;
//   console.log(e);
//   for (var i = 0; i < productArray.length; i++) {
//     if (productArray[i].name === e.target.alt) {
//       productArray[i].clicked++;
//       // clickedArray.push(productArray[i].name); // This is pushing way more than the 5 clicks...
//       renderProducts();
//     }
//   }
//   if (clicks === 0) {
//     stopClicks();
//   }
//   console.log(productArray);
// }



// // Working on rendering a table for results (prior to chartJS)//

// function createElement(element, textContent, parent) {
//   var newElement = document.createElement(element);
//   newElement.textContent = textContent;
//   parent.appendChild(newElement);
//   return newElement;
// }

// function renderTableResults() {
//   var trHead = createElement('tr', '', theadEl);
//   createElement('td', 'Product', trHead);
//   createElement('td', '# of views', trHead);
//   createElement('td', '# of clicks', trHead);

//   for (var i = 0; i < productArray.length; i++) {
//     var trBody = createElement('tr', '', tbodyEl);
//     createElement('td', productArray[i].name, trBody);
//     createElement('td', productArray[i].viewed, trBody);
//     createElement('td', productArray[i].clicked, trBody);
//   }
// }

// function populateChartData() {
//   var labelArray = [];
//   var viewArray = [];
//   var clickArray = [];

//   for (var i = 0; i < productArray.length; i++) {
//     labelArray.push(productArray[i].name);
//     viewArray.push(productArray[i].viewed);
//     clickArray.push(productArray[i].clicked);
//   }
//   return [labelArray, viewArray, clickArray];
// }

// function renderChart(){
//   var ctx = document.getElementById('myChart').getContext('2d');
//   var myChart = new Chart(ctx, { //eslint-disable-line
//     type: 'bar',
//     data: {
//       labels: populateChartData()[0],
//       datasets: [
//         {
//           label: '# of views',
//           data: populateChartData()[1],
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.7)',
//             'rgba(54, 162, 235, 0.7)',
//             'rgba(255, 206, 86, 0.7)',
//             'rgba(75, 192, 192, 0.7)',
//             'rgba(153, 102, 255, 0.7)',
//             'rgba(255, 159, 64, 0.7)',
//             'rgba(255, 99, 132, 0.7)',
//             'rgba(54, 162, 235, 0.7)',
//             'rgba(255, 206, 86, 0.7)',
//             'rgba(75, 192, 192, 0.7)',
//             'rgba(153, 102, 255, 0.7)',
//             'rgba(255, 159, 64, 0.7)',
//             'rgba(255, 99, 132, 0.7)',
//             'rgba(54, 162, 235, 0.7)',
//             'rgba(255, 206, 86, 0.7)',
//             'rgba(75, 192, 192, 0.7)',
//             'rgba(153, 102, 255, 0.7)',
//             'rgba(255, 159, 64, 0.7)',
//             'rgba(255, 99, 132, 0.7)',
//             'rgba(54, 162, 235, 0.7)',
//           ],
//           borderWidth: 1,
//         },
//         {
//           label: '# of clicks',
//           data: populateChartData()[2],
//           backgroundColor: [
//             'rgba(255, 99, 132)',
//             'rgba(54, 162, 235)',
//             'rgba(255, 206, 86)',
//             'rgba(75, 192, 192)',
//             'rgba(153, 102, 255)',
//             'rgba(255, 159, 64)',
//             'rgba(255, 99, 132)',
//             'rgba(54, 162, 235)',
//             'rgba(255, 206, 86)',
//             'rgba(75, 192, 192)',
//             'rgba(153, 102, 255)',
//             'rgba(255, 159, 64)',
//             'rgba(255, 99, 132)',
//             'rgba(54, 162, 235)',
//             'rgba(255, 206, 86)',
//             'rgba(75, 192, 192)',
//             'rgba(153, 102, 255)',
//             'rgba(255, 159, 64)',
//             'rgba(255, 99, 132)',
//             'rgba(54, 162, 235)',
//           ],
//           borderWidth: 1,
//         }
//       ],
//     },
//     options: {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//     },
//   });
// }

// function saveLocalStorage(){
//   var savedProducts = JSON.stringify(productArray);
//   localStorage.setItem('productArray', savedProducts);
// }

// loadLocalStorage();

