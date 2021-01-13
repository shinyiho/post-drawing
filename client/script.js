let canvas = document.getElementById("canvas");
let upload = document.getElementById("upload");
let posts = document.getElementById("posts");
// let endpoint = "http://localhost:3000";
// let endpoint = "https://post-drawing.herokuapp.com";
let endpoint = "";

// fetch posts from server
function getPosts() {
  fetch(`${endpoint}/posts`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((response) => {
      let images_html = response
        .map((file_url) => {
          return `<img src="${endpoint}/uploaded/${file_url}">`;
        })
        .join("\n");
      posts.innerHTML = images_html;
    });
}

getPosts();

//UPLOAD CANVAS TO SERVER
upload.addEventListener("click", (e) => {
  let payload = {
    image: canvas.toDataURL("image/png"),
  };
  fetch(`${endpoint}/upload`, {
    method: "POST",
    body: JSON.stringify(payload), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Success:", JSON.stringify(response));
      getPosts();
    });
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// DRAWING STUFF
var ctx = canvas.getContext("2d");

let mousedown = false;
let last_x = 0;
let last_y = 0;
canvas.addEventListener("mousedown", (e) => {
  mousedown = true;

  let bounds = canvas.getBoundingClientRect();
  last_x = e.clientX - bounds.left;
  last_y = e.clientY - bounds.top;
});

canvas.addEventListener("mouseup", (e) => {
  mousedown = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!mousedown) {
    return;
  }
  let bounds = canvas.getBoundingClientRect();
  // ctx.strokeStyle = "black";
  ctx.fillStyle = `rgba( ${Math.random() * 255}, 0,${Math.random() * 255},0.2)`;
  ctx.strokeStyle = `rgba( ${Math.random() * 255}, 0,${Math.random() * 255},0.1)`;
  ctx.beginPath();
  ctx.moveTo(last_x, last_y);
  ctx.lineTo(e.clientX - bounds.left, e.clientY - bounds.top);
  ctx.moveTo(e.clientX - bounds.left, e.clientY - bounds.top);
  ctx.arc(e.clientX - bounds.left, e.clientY - bounds.top, Math.random() * 20, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  last_x = e.clientX - bounds.left;
  last_y = e.clientY - bounds.top;
});
