function one() {
  console.log("Hello from function one!");
  two();
  three();
}

function two() {
  console.log("Hello from function two!");
}

function three() {
  console.log("Hello from function three!");
  four();
}

function four(add) {
  console.log("Hello from function four!");
}

one();

window.setInterval(() => {
  fetch("/api")
    .then(response => response.json())
    .then();
}, 2000);
