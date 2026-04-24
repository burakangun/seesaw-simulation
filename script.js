const container= document.querySelector(".simulation-container");
const plank= document.getElementById("plank");
const preview=document.getElementById("preview-of-weight");
const resetButton = document.getElementById("reset-btn");
const angleVal = document.getElementById("angle-val");

let objects = JSON.parse(localStorage.getItem("objects")) || [];
let totalWeightLeft= 0;
let totalWeightRight = 0;

const nextWeight = document.getElementById("next-weight");
let nextWeightVal= randomizeWeight();
nextWeight.innerText = nextWeightVal;

window.onload = () => {
    for(let i = 0; i<objects.length; i++) {
        drawCircle(objects[i]);
        calculateWeight(objects[i]);
    }
    
};

plank.addEventListener("click",(e)=> {
    
        const bounds = plank.getBoundingClientRect();
        const x = e.clientX- bounds.left;
        if(x >= 0 && x <= 800 ){
            let distance=x-400;
            
            distance = distance / 10;
            const weight = nextWeightVal;
            const newObject = {weight, distance, x};
            

            calculateWeight(newObject);
            objects.push(newObject);
            
            localStorage.setItem("objects", JSON.stringify(objects));
            drawCircle(newObject);
    
            calculateTorque();
            nextWeightVal = randomizeWeight();
    }
    });

function randomizeWeight() {
    let weight = Math.floor(Math.random() * 10) + 1
    nextWeight.innerText = weight;
    return weight;
}
function calculateWeight(object) {
    if (object.distance<0){ totalWeightLeft += object.weight; document.getElementById("left-weight-val").innerText = totalWeightLeft; }
    else if (object.distance > 0) { totalWeightRight += object.weight; document.getElementById("right-weight-val").innerText = totalWeightRight; }
    else { console.warn("Lütfen tahtanın üzerine tıklayın!"); return; }
}
function drawCircle(object) {
    const circle = document.createElement("div");
    circle.className = "weight-of-object";
    circle.style.left = `${object.x}px`;

    const size = object.weight * 3 + 30;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.innerText = object.weight;
    circle.style.fontSize = `${object.weight * 3 + 20}px`;
    plank.appendChild(circle);
    calculateTorque();}
    

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

    let angle= (torqueRight - torqueLeft) / 10;

    if(angle > 30){ angle = 30;} 
    if(angle < -30){ angle = -30;}
    plank.style.transition = "transform 0.4s ease";
    plank.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    angleVal.innerText = Math.floor(angle);
}


resetButton.addEventListener("click", () => {
    objects=[];
    totalWeightLeft=0;
    totalWeightRight=0;
    plank.innerHTML="";
    plank.style.transform= "translateX(-50%) rotate(0deg)";
    document.getElementById("angle-val").innerText = "0";
    document.getElementById("left-val").innerText = "0";
    document.getElementById("right-val").innerText = "0";
    document.getElementById("left-weight-val").innerText = "0";
    document.getElementById("right-weight-val").innerText = "0";
    nextWeightVal = randomizeWeight();
    document.getElementById("next-weight").innerText = nextWeightVal;
    localStorage.removeItem("objects");
    console.error("Simulation Reset!");
});

container.addEventListener("mousemove", (e) => {
    const bounds=container.getBoundingClientRect();
    const X = e.clientX - bounds.left;
    const Y = e.clientY - bounds.top;

    preview.style.left = X + "px";
    preview.style.top = Y + "px";

    if(X >= -30 && X <= 830){preview.style.backgroundColor = "blue";}   
    else {preview.style.backgroundColor = "red";}
});