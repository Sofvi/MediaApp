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

//const userData = user && JSON.parse(user);
//const userData = JSON.parse(user);

//console.log(userData.id);

const addPost = document.querySelector("#addPost");
addPost.addEventListener("click", () => {
  if (!user && !token) {
    alert("You need to log in to post!!");
    location.href = "../html/login.html";
  } else {
    location.href = "../html/post.html";
  }
});

const createFeedPost = (posts) => {
  const feed = document.querySelector(".feed-list");
  //console.log(posts);
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
      <i id="like-btn" class="fa-regular fa-heart"></i>
      <i id="comment-btn" class="fa-regular fa-comment"></i>
    </div>
    <p class="likes">23 likes</p>
    <p class="description">${post.description}</p>
    
  </div>
</div>`;
  });
};

const getPics = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    /*  const response = await fetch(
      url + "/user/" + user.id + "/post",
      fetchOptions
    ); */
    const response = await fetch(url + "/post", fetchOptions);
    const feedPost = await response.json();
    console.log(feedPost);
    createFeedPost(feedPost);
  } catch (e) {
    console.log(e.message);
  }
};
getPics();

//Implementing like/unlike
const likeUnlike = () => {
  const likeBtn = document.querySelector("#like-btn");

  likeBtn.addEventListener("click", async () => {
    const likeCounter = document.querySelector(".likes");
    console.log("like icon clicked");

    if (likeBtn.className === "unliked") {
      likeBtn.setAttribute("class", "liked");
      try {
        const fetchOptions = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };
        const response = await fetch(
          url + "/post/" + post.id + "/like",
          fetchOptions
        );
        console.log(response);
        const like = await response.json();
        num_likes++;
        likeCounter.innerHTML = `${num_likes}`;
      } catch (e) {
        console.log(e.message);
      }
    } else {
      likeBtn.setAttribute("class", "unliked");

      try {
        const fetchOptions = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };
        const response = await fetch(
          url + "/post/" + post.id + "/likes",
          fetchOptions
        );
        const unLike = await response.json();

        num_likes--;
        likeCounter.innerHTML = `${num_likes}`;
      } catch (e) {
        console.log(e.message);
      }
    }
  });
};
likeUnlike();
