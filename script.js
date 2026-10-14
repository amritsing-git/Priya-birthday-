// @ts-nocheck
"use strict";


/* =========================
   SCENE SYSTEM
========================= */

const scenes =
  document.querySelectorAll(".scene");

const floatLayer =
  document.getElementById("floatLayer");

const sparkLayer =
  document.getElementById("sparkLayer");


function showScene(number){

  scenes.forEach(scene => {

    scene.classList.remove("active");

  });


  const target =
    document.getElementById(
      "scene" + number
    );


  if(!target){
    return;
  }


  target.classList.add("active");


  window.scrollTo({
    top:0,
    behavior:"smooth"
  });


  burst(
    window.innerWidth / 2,
    window.innerHeight / 2,
    10
  );

}



/* =========================
   FLOATING HEARTS
========================= */

function floating(){

  if(!floatLayer){
    return;
  }


  const element =
    document.createElement("span");


  element.className =
    "floating";


  element.textContent =
    [
      "♡",
      "♥",
      "✨",
      "🌸",
      "🎀",
      "✦"
    ][
      Math.floor(
        Math.random() * 6
      )
    ];


  element.style.left =
    Math.random() * 100 + "%";


  element.style.fontSize =
    12 + Math.random() * 16 + "px";


  element.style.color =
    [
      "rgba(214,103,151,.30)",
      "rgba(184,130,221,.25)",
      "rgba(238,126,177,.28)"
    ][
      Math.floor(
        Math.random() * 3
      )
    ];


  element.style.animationDuration =
    7 + Math.random() * 5 + "s";


  floatLayer.appendChild(
    element
  );


  setTimeout(
    () => element.remove(),
    13000
  );

}


setInterval(
  floating,
  750
);



/* =========================
   SPARKLE
========================= */

function spark(x,y){

  if(!sparkLayer){
    return;
  }


  const element =
    document.createElement("span");


  element.className =
    "spark";


  element.textContent =
    [
      "✨",
      "♡",
      "✦",
      "💗",
      "🌸"
    ][
      Math.floor(
        Math.random() * 5
      )
    ];


  element.style.left =
    x + "px";


  element.style.top =
    y + "px";


  sparkLayer.appendChild(
    element
  );


  setTimeout(
    () => element.remove(),
    1000
  );

}



/* =========================
   SPARKLE BURST
========================= */

function burst(
  x,
  y,
  count = 16
){

  for(
    let i = 0;
    i < count;
    i++
  ){

    setTimeout(() => {

      const angle =
        Math.random() *
        Math.PI *
        2;


      const distance =
        45 +
        Math.random() * 190;


      spark(
        x +
        Math.cos(angle) *
        distance,

        y +
        Math.sin(angle) *
        distance
      );

    }, i * 35);

  }

}



/* =========================
   BUTTON EFFECT
========================= */

function buttonBurst(button){

  if(!button){
    return;
  }


  const rect =
    button.getBoundingClientRect();


  burst(
    rect.left +
    rect.width / 2,

    rect.top +
    rect.height / 2,

    16
  );

}



/* =========================
   START BUTTON
========================= */

const start =
  document.getElementById(
    "startBtn"
  );


if(start){

  start.addEventListener(
    "click",
    () => {

      buttonBurst(start);


      setTimeout(
        () => showScene(2),
        450
      );

    }
  );

}



/* =========================
   NEXT BUTTONS
========================= */

document
  .querySelectorAll(".next")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        buttonBurst(button);


        setTimeout(
          () =>
            showScene(
              Number(
                button.dataset.next
              )
            ),

          350
        );

      }
    );

  });



/* =========================
   CLICK SPARKLES
========================= */

document.addEventListener(
  "click",
  event => {

    if(
      !event.target.closest(
        "button"
      )
    ){

      spark(
        event.clientX,
        event.clientY
      );

    }

  }
);



/* =========================
   TOUCH SPARKLES
========================= */

document.addEventListener(
  "touchstart",
  event => {

    const touch =
      event.touches[0];


    if(touch){

      spark(
        touch.clientX,
        touch.clientY
      );

    }

  },
  {
    passive:true
  }
);



/* =========================
   ENTER KEY
========================= */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key === "Enter"
    ){

      const button =
        document.querySelector(
          ".scene.active button"
        );


      if(button){
        button.click();
      }

    }

  }
);



/* =========================
   INITIAL SCENE
========================= */

showScene(1);


console.log(
  "Cutie Birthday Surprise loaded 🎀"
);
