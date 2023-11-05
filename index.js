const form = document.querySelector("form");
form.addEventListener("click", (event) => {
  console.log(event.eventPhase); 
//   event.stopPropagation()
});
