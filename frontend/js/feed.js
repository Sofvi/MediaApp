"use strict";

const url = "http://localhost:3000"; // change url when uploading to server

const token = sessionStorage.getItem("token");
const user = sessionStorage.getItem("user");
let num_likes = 0;

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
};

const feed = document.querySelector(".feed-list");
const addPost = document.querySelector("#addPost");
const userLogin = document.querySelector("#user-login");

const profileBtn = document.querySelector(".fa-solid.fa-user");
//const postBtn = document.querySelector('.fa-solid.fa-square-plus');
const likeBtn = document.querySelector(".fa-regular fa-heart");
const commentBtn = document.querySelector(".fa-regular.fa-comment");
const loginBtn = document.querySelector(".fa-right-to-bracket");

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
}); */

commentBtn.addEventListener("click", () => {
  location.href = "../html/comment.html";
  console.log("redirect to comment");
});

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
    num_likes = post.num_likes;

    feed.innerHTML += `
     <div class="card">
  <div class="cardTopDiv">
    <img
              src="https://place-puppy.com/400x400"
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
      <div class="container">
      <div class="likes-comments">
      <i  class="fa-regular fa-heart"></i>
      <i  class="fa-regular fa-comment"></i>
      </div>
      <p class="likes">23 likes</p>
      <p class="description">${post.description}</p>
      
      </div>
      </div>`;
  });

  const likeButton = document.querySelectorAll(".fa-regular.fa-heart");
  const totalLikes = document.querySelectorAll(".likes");

  likeButton.forEach((like, index) => {
    like.addEventListener("click", async () => {
      console.log("cliked", index, posts[index].id);
      try {
        const fetchOptions = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };
        const response = await fetch(
          url + "/post/like/" + posts[index].id,
          fetchOptions
        );
        //console.log(response);
      } catch (e) {
        console.log(e.message);
      }
    });
  });

  totalLikes.forEach(async (like, index) => {
    try {
      const fetchOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const response = await fetch(
        url + "/post/like/" + posts[index].id,
        fetchOptions
      );
      const json = await response.json();
    } catch (e) {
      console.log(e.message);
    }
  });
};

const getPics = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const response = await fetch(url + "/post", fetchOptions);
    const feedPost = await response.json();
    //console.log(feedPost);
    createFeedPost(feedPost);
    searchOption(feedPost);
  } catch (e) {
    console.log(e.message);
  }
};
getPics();

//TODO* implement the search option
// change url when uploading to server
const searchBtn = document.querySelector("#searchBtn");
const searchItem = document.querySelector("#search-item");
const searchResult = document.querySelector("#search-result");

const createSearchCard = (searchPost) => {
  searchResult.innerHTML += `
     <div class="card">
  <div class="cardTopDiv">
    <img
              src="https://place-puppy.com/400x400"
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
      <i id="comment-btn" class="fa-regular fa-comment"></i>
    </div>
    <p class="likes">23 likes</p>
    <p class="description">${searchPost.description}</p>
    
    </div>
    </div>`;
};
const searchOption = (feedSearch) => {
  searchItem.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchBtn.click();
    }
  });

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
    searchItem.value = "";
  });
};
