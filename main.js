// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!

/* 

!Add the `.hidden` class to the error modal in the HTML so it
  !does not appear when the page first loads
!When a user clicks on an empty heart ("Recognizing events")
  ! Invoke `mimicServerCall` to simulate making a server request
    ! `mimicServerCall` randomly fails to simulate faulty network conditions
    ! When the server returns a failure status
      ! Respond to the error using a `.catch(() => {})` block after your
        !`.then(() => {})` block.
      ! Display the error modal by removing the `.hidden` class
      ! Display the server error message in the modal
      ! Use `setTimeout` to hide the modal after 5 seconds (add the `.hidden` class)
    !When the server returns a success status
      ! Change the heart to a full heart
      ! Add the `.activated-heart` class to make the heart appear red
!When a user clicks on a full heart
  !Change the heart back to an empty heart
  ! Remove the `.activated-heart` class
! Keep all your styling rules entirely in `style.css`. Do not manipulate any `.style` properties.

Only manipulate the DOM once the server requests respond. Do not make the
heart full until you're inside a successful `.then` block.

> Note: The tests will only check for the first part of the specification (adding the `hidden` class). You should verify the rest of the behavior yourself, by checking the page in the browser.
*/

const modal = document.getElementById("modal");
const heartArray = document.querySelectorAll(".like-glyph");
let heartValue = true;
addHiddenClass(modal);
giveAHeartAnEar(heartArray);

function giveAHeartAnEar(htmlCollection) {
  let hearts = Array.from(htmlCollection);
  hearts.forEach((btn) => btn.addEventListener("click", (e) => handleHeart(e)));
}

function handleHeart(e) {
  mimicServerCall()
    .then(() => heartFill(e))
    .catch(() => randomFail(e));
}

function heartFill(e) {
  if (e.target.textContent === EMPTY_HEART) {
    e.target.classList.add("activated-heart");
    e.target.textContent = FULL_HEART;
  } else {
    e.target.textContent = EMPTY_HEART;
    e.target.classList.remove("activated-heart");
  }
}
function addHiddenClass(element) {
  element.classList.add("hidden");
}
function removeHiddenClass(element) {
  element.classList.remove("hidden");
}
function randomFail() {
  removeHiddenClass(modal);
  setInterval(() => addHiddenClass(modal), 1000);
}

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 500);
  });
}
