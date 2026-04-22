console.log("Ready to go")
alert("Script is workingg(??).")

const container= document.querySelector(".simulation-container");
const plank= document.getElementById("plank");

let objects = [];

container.addEventListener("click",(e)=> {
    
        const bounds = container.getBoundingClientRect();
        const x = e.clientX- bounds.left;

        if(x >= 0 && x <= 400){
            const distance=x-200;
            const weight = Math.floor(Math.random() * 10) + 1;
            
            newObject = {weight, distance};
            objects.push(newObject);

            const circle = document.createElement("div");
            circle.className = "weight-of-object";

            circle.style.left = `${x}px`;

            circle.innerText = weight;
            plank.appendChild(circle);
            console.log("Daire eklendi: ", {weight, distance});

            calculateTorque();
    }
    });
function calculateTorque() {
    let torqueLeft = 0;
    let torqueRight = 0;

    for(let i = 0; i<objects.length; i++){
        if(objects[i].distance < 0){
            torqueLeft += Math.abs(objects[i].distance) * objects[i].weight;
        } else {
            torqueRight += objects[i].distance * objects[i].weight;
        }
}
    document.getElementById("left-val").innerText = Math.floor(torqueLeft);
    document.getElementById("right-val").innerText = Math.floor(torqueRight);

    let angle= (torqueRight - torqueLeft) / 100;

    if(angle > 30){ angle = 30;} 
    if(angle < -30){ angle = -30;}
    plank.style.transform = `translateX(-50%) rotate(${angle}deg)`;
}
    