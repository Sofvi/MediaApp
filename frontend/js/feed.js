'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select html element
const ul = document.querySelector('#picList');

// create cards
const createFeedCards = (pics) => {
  pics.forEach((pic) => {
    const img = document.createElement('img');
    img.src = url + '/' + pic.filename;
    img.alt = pic.name;
    img.classList.add('resp');

    const figure = document.createElement('figure').appendChild(img);

    // add like button here //

    // add comment button here //

    const  li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(figure);
    ul.appendChild(li);
  });
};

// AJAX
const getPics = async () => {
  try {
    const response = await fetch(url + '/feed');
    const pics = await response.json();
    createFeedCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};

getPics();