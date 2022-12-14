/* "use strict";

const token = sessionStorage.getItem("token");
const user = sessionStorage.getItem("user");

const userData = user && JSON.parse(user);

const url = "http://localhost:3000"; // change url when uploading to server

// select html element
const ul = document.querySelector("#picList");
const profileBtn = document.getElementById("profile-btn");
const postBtn = document.getElementById("post-btn");
const likeBtn = document.getElementById("like-btn");
const commentBtn = document.getElementById("comment-btn");

console.log(profileBtn);
// create cards
const createFeedCards = (pics) => {
  pics.forEach((pic) => {
    const img = document.createElement("img");
    img.src = url + "/thumbnails/" + pic.filename;
    img.alt = pic.username;
    img.classList.add("card");

    const card = document.createElement("card").appendChild(img);

    // add like button here //

    // add comment button here //

    const h3 = document.createElement("h3");
    h3.innerHTML = pic.username;

    const li = document.createElement("li");

    li.appendChild(card);
    li.appendChild(h3);
    ul.appendChild(li);
  });
};

// Move to profile
profileBtn.addEventListener("click", () => {
  location.href = "profile.html";
  console.log("redirect to feed");
});

// Move to post
postBtn.addEventListener("click", () => {
  location.href = "./post.html";
  console.log("redirect to post");
});

likeBtn.addEventListener("click", () => {
  if ((likeBtn.className = ".fa-regular fa-heart")) {
    likeBtn.className = "fa-solid fa-heart";
  } else {
    likeBtn.className = "fa-regular fa-heart";
    console.log("like clicked");
  }
});

commentBtn.addEventListener("click", () => {
  location.href = "comment.html";
  console.log("redirect to comment");
});

// AJAX

const getPics = async (id) => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url + "/user/" + id + "/post", fetchOptions);
    const pics = await response.json();
    createFeedCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};

getPics(userData.id);

//Creating the postFeed

//Get query params
/*
const getQueryParam = (param) => {
  const qString = window.location.search;
  const urlParam = new URLSearchParams(qString);
  return urlParam.get(param);
};

const post_id = getQueryParam("id");

const createPost = async () => {
  const response = await getPostById(post_id);
  let post;
  if (response && response.ok) post = await response.json();

  if (post) {
    const container = document.querySelector("#content");
    container.innerHTML = "";

    const feedPost = document.createElement("div");
    feedPost.className = "feedPost";

    //Adding Image
    const postImage = document.createElement("div");
    const image = document.createElement("img");
    postImage.className = "image-post";
    img.src = url + "/" + post.filename;

    //Info container

    const postDetails = document.createElement("div");
    postDetails.className = "post-details";
    const infoContent = document.createElement("div");
    infoContent.className("content");

    //Post Description
    const description = document.createElement("p");
    description.className = "description";

    description.innerHTML = `${post.description}`;

    //Location
    const location = document.createElement("p");
    location.className = "location";
    location.innerHTML = `${post.location}`;

    //Posted date
    const postedDate = document.createElement("p");
    postedDate.className = "posted-date";

    postedDate.innerHTML = `${post.posted_date}`;

    //Post creator

    const postCreator = document.createElement("p");
    postCreator.className = "post-creator";
    postCreator.innerHTML = `${post.username}`; //** Need to double check 
  }

  //Likes and Dislikes

  const likeContainer = document.createElement("div");
  const dislikeContainer = document.createElement("div");

  const likeBtn = document.createElement("a");
  const dislikeBtn = document.createElement("a");

  likeBtn.className = "like-btn";
  dislikeBtn.className = "dislike-btn";

  //Click event for like/dislike
  likeBtn.addEventListener("click", async () => {
    await getLikes(post_id);
  });
  //Click event for dislike

  //*TODO: I will implement it later
  dislikeBtn.addEventListener("click", async () => {
    await getLikes(post_id);
  });
};

const getLikes = async (postId, value) => {
  if (!token && !user) {
    alert("Please login to post");
    //redirecting to the login form
  }
  return;
  try {
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url + "/post/" + post_id + "/like/");
  } catch (e) {
    console.log(e.message);
  }

  //comment
  const comments = document.createElement("div");
  comments.id = "comments";

  commentForm = document.createElement("div");
  commentForm.className = "comment-form";

  const form = document.createElement("form");
  form.id = "addCommentForm";
  form.method = "POST";
  form.noValidate;

  const commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.required = true;
  commentInput.name = "content";
  commentInput.placeholder = "Please write a comment";

  const commentBtn = document.createElement("comment-btn");
  commentBtn.id = "addCommentBtn";
  commentBtn.type = "submit";
  commentBtn.innerHTML = "Submit";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!token && !user) {
      alert("You need to log in first");
      //Redirecting to the login form
    }
    return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer" + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      url + "/post/" + post_id + "/comment",
      fetchOptions
    );
    const json = await response.json();
    const user = JSON.parse(sessionStorage.user);
  });
};
  

const ul = document.querySelector("#picList");
const createFeedPost = (posts) => {
  ul.innerHTML = "";
  posts.forEach((post) => {
    post.innerHTML += ` <div class="card">
  <div class="cardTopDiv">
    <img
              src="https://place-puppy.com/400x400"
              alt="Dog"
              class="cardProfileImg"
            />
    <h3>${post.username}</h3>
  </div>
  <img
      src="${url + "/uploads/" + post.filename}"
      alt="${post.username}'s post"
      class="cardProfileImg"
    />
  <div class="container">
    <div class="likes-comments">
      <i id="like-btn" class="fa-regular fa-heart"></i>
      <i id="comment-btn" class="fa-regular fa-comment"></i>
    </div>
    <p class="likes">23 likes</p>
    <p class="comments">5 comments</p>
  </div>
</div>`;
  });
};
//${post.num_comments}
//${post.num_likes}


const getPics = async () => {
  try {
    const response = await fetch(url + "/post");
    const feed = await response.json();
    createFeedPost(feed);
  } catch (e) {
    console.log(e.message);
  }
};

getPics();
*/
