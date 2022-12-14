'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server

// select html element
const ul = document.querySelector('#picList');
const profileBtn = document.querySelector('.fa-solid.fa-user');
const postBtn = document.querySelector('.fa-solid.fa-square-plus');
const likeBtn = document.querySelector('.fa-regular.fa-heart');
const commentBtn = document.querySelector('.fa-regular.fa-comment');
const loginBtn = document.querySelector('.fa-right-to-bracket');


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
// Move to login if not logged in
loginBtn.addEventListener('click', () => {
  if (!user && !token) {
    location.href = '../html/login.html';
  } else {
    loginBtn.style.display = 'none';
  }
});

// Move to profile
profileBtn.addEventListener('click', () => {
  location.href = '../html/profile.html';
  console.log('redirect to feed');
});

// Move to post
postBtn.addEventListener('click', () => {
  location.href = '../html/post.html';
  console.log('redirect to post');
});

likeBtn.addEventListener('click', () => {
  if (likeBtn.className === '.fa-regular fa-heart') {
    likeBtn.className = 'fa-solid fa-heart';
  } else {
    likeBtn.className = 'fa-regular fa-heart';
    console.log('like clicked');
  }
});

commentBtn.addEventListener('click', () => {
  location.href = '../html/comment.html';
  console.log('redirect to comment');
});

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