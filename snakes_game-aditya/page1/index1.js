console.log("working");
let instruction_button = document.getElementById("instructions-button");

let instruction_page = document.getElementById("instructions");

let start_button  = document.getElementById("start-button");

instruction_button.addEventListener("click", () => {
    if(instruction_page.style.display == "flex"){
        instruction_page.style.display = "none";
    }else if(instruction_page.style.display = "none"){
        instruction_page.style.display = "flex";
    }
})

start_button.addEventListener("click", toGamePage);
document.addEventListener("keydown", (event) => {
    if(event.keyCode == 13){
        toGamePage();
    }
})

function toGamePage(){
    location.replace("./page2/index.html");
}