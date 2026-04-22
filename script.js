console.log("Ready to go")
alert("Script is workingg(??).")

const container = document.querySelector(".simulation-container");
const plank= document.getElementById("plank");

let objects = [];

container.addEventListener("click",(e)=> {

    const bounds = container.getBoundingClientRect();
    const x = e.clientX- bounds.left;

    const plankStartX = 0;
    const plankEndX = 400;

    if(x >= plankStartX && x <= plankEndX){
        const distance = x-200;
        const weight = Math.floor(Math.random() * 10) + 1;

        objects.push({weight,distance});

        const circle = document.createElement("div");
        circle.className = "weight-of-object";

        circle.style.left = `${x}px`;

        circle.innerText = weight;
        plank.appendChild(circle);
        console.log("Daire eklendi: ", {weight, distance});
    }

   
});