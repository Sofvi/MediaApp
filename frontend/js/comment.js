'use strict';

const url = "http://localhost:3000"; // change url when uploading to server

const homeBtn = document.querySelector('.fa-solid.fa-house');
const postBtn = document.querySelector('.fa-solid.fa-square-plus');
const profileBtn = document.querySelector('.fa-solid.fa-user');

const profileName = document.querySelector('#profileName');
const img = document.querySelector('#postPic');
const commentUl = document.querySelector('#commentUl');
const addForm = document.querySelector('#addCommentForm');
const sendButton = document.querySelector('.fa-solid.fa-paper-plane');

// Get user data
const user = JSON.parse(sessionStorage.getItem('user'));
const token = sessionStorage.getItem('token');


// Display Profile Name
profileName.innerHTML = "";
profileName.textContent = user.username;

const displayComments = (comments) => {
  commentUl.innerHTML = "";
  comments.forEach((comment) => {
    // create li with DOM methods
      console.log("user id right");
      console.log(comment);
      const li = document.createElement("li");
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      li.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
      console.log(comment.user_id);
      h3.textContent = comment.user_id;
      p.textContent = comment.content;
      commentUl.appendChild(li);
  });
};

const displayPost = (posts) => {
  img.src = "";
  posts.forEach((post) => {
    img.src = url + "/thumbnails/" + post.filename;
  });
};

// AJAX call
const getPost = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/post", fetchOptions);
    const posts = await response.json();
    displayPost(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPost();

// AJAX call
/*const getComment = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/comment", fetchOptions);
    const comments = await response.json();
    displayComments(comments);
  } catch (e) {
    console.log(e.message);
  }
};
getComment();

  // submit comment form
  addForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const data = serializeJson(addForm);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    };
  
    const response = await fetch(url + "/comment", fetchOptions);
    const json = await response.json();
    console.log("comment response", json);
      alert(json.message);
  });

/*sendButton.addEventListener('click', () => {
console.log("button clicked")
});*/

// Move to home
homeBtn.addEventListener('click', () => {
  location.href = 'feed.html';
  console.log('redirect to profile');
});

// Move to post
postBtn.addEventListener('click', () => {
  location.href = 'post.html';
  console.log('redirect to post');
});

// Move to profile
profileBtn.addEventListener('click', () => {
  location.href = 'profile.html';
  console.log('redirect to profile');
});
