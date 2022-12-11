"use strict";
const url = "http://localhost:3000";
const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user.id);

const getUserInfo = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const response = await fetch(url + "/user/" + user.id, fetchOptions);
    const profile = await response.json();
    console.log(profile);
    createUserInfo(profile);
  } catch (e) {
    console.log(e.message);
  }
};
getUserInfo();

const createUserInfo = (uInfo) => {
  const ul = document.querySelector("#list");
  //const userInfo = document.querySelector(".userInfo");

  ul.innerHTML = "";
  uInfo.forEach((info) => {
    const h3 = document.createElement("h3");
    h3.innerHTML = info.name;
    console.log(info.name);

    //   const p1 = document.createElement('p');
    //   p1.innerHTML = `Birthdate: ${cat.birthdate}`;

    //   const p2 = document.createElement('p');
    //   p2.innerHTML = `Weight: ${cat.weight}kg`;

    //   const p3 = document.createElement('p');
    //   p3.innerHTML = `Owner: ${cat.ownername}`;

    //   const li = document.createElement('li');
    //   li.classList.add('light-border');
    const li = document.createElement("li");
    li.appendChild(h3);
    //   li.appendChild(figure);
    //   li.appendChild(p1);
    //   li.appendChild(p2);
    //   li.appendChild(p3);
    ul.appendChild(li);
  });

  /*  uInfo.forEach((info) => {
    userInfo.innerHTML += `
       <div class="card">
    <div class="cardTopDiv">
      <img
                src="https://place-puppy.com/400x400"
                alt="Dog"
                class="cardProfileImg"
              />
      <h3>${info.username}</h3>
    </div>
  </div>`;
  }); */
};
