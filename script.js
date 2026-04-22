console.log("Ready to go")
alert("Script is workingg(??).")
const plank= document.getElementById("plank");

let objects = [];

plank.addEventListener("click",(e)=> {

    const bounds = plank.getBoundingClientRect();
    const x = e.clientX- bounds.left;
    const distance = x-200;
    const weight = Math.floor(Math.random() * 10) + 1;

    objects.push({weight,distance});

    const circle = document.createElement("div");
    circle.className = "weight-of-object";

    circle.style.left = `${x}px`;

    circle.innerText = weight;
    plank.appendChild(circle);
    console.log("Daire eklendi: ", {weight, distance});
});