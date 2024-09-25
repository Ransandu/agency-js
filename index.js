// ================================== Video ==================================

// Select all videos with data attribute wb-embed="video"
const videos = document.querySelectorAll('[wb-embed="video"]');
console.log("video");

// Loop through all the videos
videos.forEach((video) => {
  // Pause on initial load
  video.pause();

  video.addEventListener("click", (event) => {
    console.log("click");
    if (video.paused) {
      video.muted = false;
      video.play();
    } else {
      video.pause();
      //video.currentTime = 0; // resets video back to start on click
    }
  });
});

// ================================== multi-step form ==================================

const user_name = $("#name_input");
const email = $("#email_input");
const mobile = $("#mobile_input");
const getNameBtn = $("#get_name");
const continueButtons = $(".continue_button_1");
const continueButtons2 = $(".continue_button");
const choice_wrapper = $(".choice_wrapper");
const use_input = $(".user-input");
const firstWrapper = $("#wrapper_mrf_first");
const secondWrapper = $("#wrapper_mrf_second");
const progressBarStatus = $("#progress_bar_status");
let progressBarCount = 0;

const itemHolder = $("#item-holder");
const itemHolder2 = $("#item_hoder_2");
let translateAmount = 0;
let translateAmount2 = 0;
secondWrapper.hide();

//Move progress bar
function moveProgressBar() {
  progressBarCount += 12.75;
  fin = progressBarCount - 102;
  progressBarStatus.css("left", `${fin}%`);
}

// Move initial questionaire left side
function questionaireMove() {
  translateAmount += 100;
  moveProgressBar();
  itemHolder.css("transform", `translateX(-${translateAmount}%)`);
}

// Move questionaire left side
function questionaireMove2() {
  translateAmount2 += 100;
  moveProgressBar();
  itemHolder2.css("transform", `translateX(-${translateAmount2}%)`);
}

// Set the name
function intializeName(name) {
  let names = $(".display_name");
  names.each(function () {
    this.innerHTML = name;
  });
}

//Continue button trigger for the initial form
continueButtons.each(function () {
  $(this).on("click", function (e) {
    // Submit btn check
    if ($(this).attr("id") === "submit_button") {
      if (!email.val() || !user_name.val() || !mobile.val()) {
        return false;
      } else {
        firstWrapper.hide();
        secondWrapper.show();
      }

      // Start button
    } else if (this.id === "start") {
      questionaireMove();

      // email button
    } else if (this.id === "email_btn") {
      const email = $("#email_input").val();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        questionaireMove();
      } else {
        alert("Input a valid email address");
      }
      return true;

      // get name button
    } else if (this.id === "get_name") {
      if (user_name.val().length > 0) {
        intializeName(user_name.val());
        questionaireMove();
      } else {
        alert("Please fill the form");
      }
    }
  });
});

//Continue button trigger for the business data form
continueButtons2.each(function () {
  $(this).on("click", function () {
    const inputField = $(this).closest(".input_wrapper").find(".user_input");

    // Submit button
    if ($(this).attr("id") === "bs_submit_button") {
      if (!inputField.val()) {
        alert("fill the form");
      } else {
        alert("form submission successfulled");
        questionaireMove2();
      }

      // input fileds
    } else if (!$(this).hasClass("radio_type")) {
      if (!inputField.val()) {
        alert("fill the form");
      } else {
        console.log("success");
        questionaireMove2();
      }

      // radio buttons
    } else {
      questionaireMove2();
    }
  });
});
