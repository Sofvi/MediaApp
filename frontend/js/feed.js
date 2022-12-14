"use strict";

const url = "http://localhost:3000"; // change url when uploading to server
let likeCounter = 0;
const token = sessionStorage.getItem("token");
const user = sessionStorage.getItem("user");
const parsedUser = JSON.parse(user);
console.log(parsedUser);

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
};

const feed = document.querySelector(".feed-list");
const addPost = document.querySelector("#addPost");
const userLogin = document.querySelector("#user-login");

const profileBtn = document.querySelector(".fa-solid.fa-user");

const likeBtn = document.querySelector(".fa-regular fa-heart");
const commentBtn = document.querySelectorAll("fa-regular fa-comment");
const loginBtn = document.querySelector(".fa-right-to-bracket");
const popup = document.getElementById("myPopup");
const closeBtn = document.getElementsByClassName(".fa-regular.fa-xmark");
const commentUl = document.querySelector('#commentUl');
const commentBoxDiv = document.querySelector('.commentBoxDiv');
const commentInput = document.querySelector("#commentInput");
const sendButton = document.querySelector('.fa-solid.fa-paper-plane');
const dropBtn = document.querySelector('.fa-solid.fa-ellipsis-vertical');
const logout = document.querySelector('#logout');




userLogin.addEventListener("click", () => {
  if (!user && !token) {
    alert("You need to log in to post!!");
    location.href = "../html/login.html";
  } else {
    location.href = "../html/feed.html";
  }
});

loginBtn.addEventListener("click", () => {
  location.href = "../html/login.html";
  console.log("redirect to login");
});
// Move to profile
profileBtn.addEventListener("click", () => {
  location.href = "../html/profile.html";
  console.log("redirect to feed");
});

/* likeBtn.addEventListener("click", () => {
  if (likeBtn.className === ".fa-regular fa-heart") {
    likeBtn.className = "fa-solid fa-heart";
  } else {
    likeBtn.className = "fa-regular fa-heart";
    console.log("like clicked");
  }
}); 
*/

addPost.addEventListener("click", () => {
  if (!user && !token) {
    alert("You need to log in to post!!");
    location.href = "../html/login.html";
  } else {
    location.href = "../html/post.html";
  }
});

const createFeedPost = (posts) => {
  feed.innerHTML = "";
  posts.forEach((post) => {
    console.log(post);
    likeCounter = post.like_num;
    feed.innerHTML += `
     <div class="card"">
  <div class="cardTopDiv">
    <img
              src="${url + "/profilePics/" + parsedUser.profile_pic}"
              alt="Dog"
              class="cardProfileImg"
            />
            <div class="text-container">
            <h3>${post.profilename}</h3>
            <p class="location">${post.location}</p>
            
          </div>
  </div>
  
  
  <img
      src="${url + "/thumbnails/" + post.filename}"
      alt="${post.profilename}'s post"
      style="width: 100%"
      />
      </a>
      <div class="container">
      <div class="likes-comments">
      <i  class="fa-regular fa-heart"></i>
      <i  class="fa-regular fa-comment" id="${post.id}" onclick="goToComments(this.id)""></i>
      </div>

      <p class ="likes">Likes:  ${post.like_num}</>
      <p class="description">${post.description}</p>
      
      </div>
      <div> <a href="../html/edit-post.html?id=${
        post.id
      }"><i class="fa fa-edit" style="color: #aca891"></i> </a></div>
      </div>`;

  });

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

//*AJAX to get the feedpost
const getFeedPost = async () => {
  try {
    const response = await fetch(url + '/feed');
    const pics = await response.json();
    createFeedCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};



// Dropdown menu
dropBtn.addEventListener('click', () => {
  document.getElementById('feedDrop').style.display = 'block';
});

// logout
logout.addEventListener('click', () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  alert("You have logged out");
});

// Hide dropdown
window.onclick = function(event) {
  if (!event.target.matches('.fa-solid.fa-ellipsis-vertical')) {
    document.getElementById('feedDrop').style.display = 'none';
  }
};


const createSearchCard = (searchPost) => {
  searchResult.innerHTML += `
     <div class="card">
  <div class="cardTopDiv">
    <img
              src="${url + "/profilePics/" + parsedUser.profile_pic}"
              alt="Dog"
              class="cardProfileImg"
            />
            <div class="text-container">
            <h3>${searchPost.profilename}</h3>
            <p class="location">${searchPost.location}</p>
          </div>

  </div>
  <img
      src="${url + "/thumbnails/" + searchPost.filename}"
      alt="${searchPost.profilename}'s post"
      style="width: 100%"
    />
  <div class="container">
    <div class="likes-comments">
      <i id="like-btn" class="fa-regular fa-heart"></i>
      <i id="comment-btn" class="fa-regular fa-comment" id="${searchPost.id}" onclick="goToComments(this.id)"></i>
    </div>
    <p class="likes">${searchPost.like_num}</p>
    <p class="description">${searchPost.description}</p>
    
    </div>
    </div>`;
};

  searchBtn.addEventListener("click", () => {
    searchResult.innerHTML = "";
    const userInput = searchItem.value;
    console.log(userInput);
    let array = [];

    for (let i = 0; i < feedSearch.length; i++) {
      const header = feedSearch[i].profilename.toLowerCase();
      console.log(header);

      if (header.includes(userInput)) {
        console.log("Header includes userinput");
        createSearchCard(feedSearch[i]);
        feed.innerHTML = "";
        array.push(feedSearch[i]);
      }
    }
    //Emptying the search field
    searchItem.value = "";
  });
};

const parseUserId = {};

// Display comments
const displayComments = (comments) => {
  commentUl.innerHTML = "";
  console.log("Comments: ", comments);
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
    if (parsedUser.id == comment.user_id) {
        parseUserId[parsedUser.id] = parsedUser.username;
        console.log(parseUserId);
        h3.textContent = parsedUser.username + ":";
        console.log("Commentor", parseUserId[comment.user_id]);
      }
      if (Object.values(parseUserId).includes(comment.user_id)) {
        h3.textContent = parseUserId[comment.user_id] + ":";
        console.log("Commentor", parseUserId[comment.user_id]);
      }
      p.textContent = comment.content;
      commentUl.appendChild(li);
  });
};

// Open comments and get postId
const goToComments = async (postId) => {
  popup.style.display = "block";
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(
      url + "/comment/" + postId ,
      fetchOptions
    );
    const comments = await response.json();
    displayComments(comments);
    console.log("response: ", comments);
  } catch (e) {
    console.log(e.message);
  }
  console.log("Clicked post with id: ", postId);
  givePostId(postId);
  // Automatically scroll to bottom of comments and set input value empty
  commentBoxDiv.scrollTop = commentBoxDiv.scrollHeight;
  commentInput.value = "";
};

// Update comments
const updateComments = async (postId) => {
  popup.style.display = "block";
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(
      url + "/comment/" + postId ,
      fetchOptions
    );
    const comments = await response.json();
    displayComments(comments);
    console.log("response: ", comments);
  } catch (e) {
    console.log(e.message);
  }
  console.log("Clicked post with id: ", postId);
  // Automatically scroll to bottom of comments and set input value empty
  commentBoxDiv.scrollTop = commentBoxDiv.scrollHeight;
  commentInput.value = "";
};

  //  Give postId to submit comment form and submit
  const givePostId = async (postId) => {

  const addForm = document.querySelector('#addCommentForm');
  addForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const data = serializeJson(addForm);
    data["post_id"] = postId;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };
  
    const response = await fetch(url + "/comment", fetchOptions);
    const json = await response.json();
    console.log("comment response", json);
    updateComments(postId);
  });
};

// Popup window
commentBtn.onclick = function () {
  popup.style.display = "block";
};
