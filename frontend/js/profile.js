const url = "http://localhost:3000";

const token = sessionStorage.getItem("token");
const user = sessionStorage.getItem("user");
const userData = user && JSON.parse(user);

const notLoggedIn = (token, user) => {
  if (!token && !user) {
    location.href = "../html/login.html";
  }
};
notLoggedIn(token, user);

//getting post By userId

const getPost = async () => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer" + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/post", fetchOptions);
    const posts = await response.json();
    createPostCard(posts);
  } catch (error) {
    console.log(error.message);
  }
};
getPost();

//display
