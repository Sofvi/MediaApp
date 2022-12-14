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
const commentBtn = document.querySelector(".fa-regular.fa-comment");

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

// Move to profile
profileBtn.addEventListener("click", () => {
  if (!sessionStorage.getItem("token") && !sessionStorage.getItem("user")) {
    alert("Please login to post");
    location.href = "../html/login.html";
  }
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
      </a>
      <div class="container">
      <div class="likes-comments">
      <i  class="fa-regular fa-heart"></i>
      <i  class="fa-regular fa-comment"></i>
      </div>

      <p class ="likes">Likes:  ${post.like_num}</>
      <p class="description">${post.description}</p>
      
      </div>
      <div> <a href="../html/edit-post.html?id=${
        post.id
      }"><i class="fa fa-edit" style="color: #aca891"></i> </a></div>
      </div>`;
  });

  // if (likeBtn.className === ".fa-regular fa-heart") {
  //   likeBtn.className = "fa-solid fa-heart";
  // } else {
  //   likeBtn.className = "fa-regular fa-heart";
  // }
  // const editPost = document.querySelector(".fa.fa-edit");
  // //console.log(editPost);
  // editPost.addEventListener("click", () => {
  //   alert("Redirecting to edit post");
  //   location.href = "../html/edit-post.html?id=${post.id}";
  // });

  // editPost.addEventListener("click", () => {
  //   alert("You are redirected to edit the post");
  //   location.href = "../edit-post.html";
  // });

  const likeButton = document.querySelectorAll(".fa-regular.fa-heart");
  const totalLikes = document.querySelectorAll(".likes");

  likeButton.forEach((like, index) => {
    like.addEventListener("click", async () => {
      console.log("clicked", index, posts[index].id);
      likeButton.className = "fa-solid.fa-heart";

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

  //*Gets the total number of likes and render*/

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
      likeCounter++;
      //console.log("Likecounter: ", likeCounter);

      totalLikes.innerHTML = "${likeCounter}";
    } catch (e) {
      console.log(e.message);
    }
  });
};

//*AJAX to get the feedpost
const getFeedPost = async () => {
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
getFeedPost();

//* SEARCH Functionality

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
    <p class="likes">Likes: ${searchPost.like_num}</p>
    <p class="description">${searchPost.description}</p>
    
    </div>
    </div>`;
};
const searchOption = (feedSearch) => {
  //*Function to handle the keyboard press

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
    //Emptying the search field
    searchItem.value = "";
  });
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