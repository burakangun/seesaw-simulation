const container= document.querySelector(".simulation-container");
const plank= document.getElementById("plank");
const preview=document.getElementById("preview-of-weight");
const resetButton = document.getElementById("reset-btn");

let objects = JSON.parse(localStorage.getItem("objects")) || [];
let totalWeightLeft= 0;
let totalWeightRight = 0;

window.onload = () => {
    for(let i = 0; i<objects.length; i++) {
        drawCircle(objects[i]);
    }
};

container.addEventListener("click",(e)=> {
    
        const bounds = container.getBoundingClientRect();
        const x = e.clientX- bounds.left;

        if(x >= 0 && x <= 800){
            const distance=x-400;
            const weight = Math.floor(Math.random() * 10) + 1;
            
            if (distance<0){ totalWeightLeft += weight; document.getElementById("left-weight-val").innerText = totalWeightLeft; }
            else if (distance > 0) { totalWeightRight += weight; document.getElementById("right-weight-val").innerText = totalWeightRight; }
            else { console.warn("Lütfen tahtanın üzerine tıklayın!"); return; }
            
            const newObject = {weight, distance, x};
            objects.push(newObject);
            
            localStorage.setItem("objects", JSON.stringify(objects));
            drawCircle(newObject);
    
            calculateTorque();
    }
    });

function drawCircle(object) {
    const circle = document.createElement("div");
    circle.className = "weight-of-object";
    circle.style.left = `${object.x}px`;
    circle.innerText = object.weight;
    plank.appendChild(circle);
    calculateTorque();
}
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


resetButton.addEventListener("click", () => {
    objects=[];
    plank.innerHTML="";
    plank.style.transform= "translateX(-50%) rotate(0deg)";
    document.getElementById("left-val").innerText = "0";
    document.getElementById("right-val").innerText = "0";

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