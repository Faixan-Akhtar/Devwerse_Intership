const btns = document.querySelectorAll(".greetBtn");

const greetting = (name, role) => {
  return `Hello, my name is ${name} and I am a ${role}!`;
};

btns.forEach((btn) => {
  let count = 0;
  btn.addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    const name = card.querySelector(".name").innerText;
    const role = card.querySelector(".role").innerText;
    const counter = card.querySelector(".count");
    const msg = card.querySelector(".message");

    count++;
    card.count = count;

    msg.innerText = greetting(name, role);
    counter.innerText = `Clicked ${count} times`;
  });
});
