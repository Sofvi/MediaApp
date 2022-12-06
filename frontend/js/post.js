'use strict';

<<<<<<< HEAD
const homeBtn = document.querySelector('.fa-solid.fa-house');
const profileBtn = document.querySelector('.fa-solid.fa-user');

=======
>>>>>>> origin/Suvi
const loadFile = function(event) {
  const output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src); // free memory
  };
};
<<<<<<< HEAD

// Move to home
homeBtn.addEventListener('click', () => {
  location.href = 'feed.html';
  console.log('redirect to home');
});

// Move to profile
profileBtn.addEventListener('click', () => {
  location.href = 'profile.html';
  console.log('redirect to feed');
});
=======
>>>>>>> origin/Suvi
