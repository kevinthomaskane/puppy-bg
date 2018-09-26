// const button = document.querySelector("button")
// button.onclick = function(){
//     window.location.href = "https://www.google.com"
// }

let query;
const array_of_puppies = [
    "https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", 
    "https://images.pexels.com/photos/460823/pexels-photo-460823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/248307/pexels-photo-248307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
    "https://images.pexels.com/photos/374906/pexels-photo-374906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
    "https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/69372/pexels-photo-69372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
]

const body = document.querySelector("body");
const search_input = document.querySelector(".search-bar");
const search_btn = document.querySelector(".search-btn");

//puppy parts
const eye_lids = document.getElementById("eyelids");
const tail = document.getElementById("tail");
const blink = setInterval(initBlink, 4000);
function initBlink() {
    eye_lids.style.animation = "blink 1s";
    setTimeout(() => {
      eye_lids.style.animation = "";
    }, 1001);
}

function choose_puppy(arr){
    let max_index = arr.length;
    let random_index = Math.floor(Math.random() * max_index);
    body.setAttribute("style", `background-image: url("${arr[random_index]}"); background-size: 100%;`);
}

choose_puppy(array_of_puppies)

//listen for user hitting enter
search_input.onkeydown = function(e){
    if (e.which == 13 || e.keyCode == 13){
        if (query === undefined){
            return
        } else {
            query = this.value.trim().split(" ").join("+")
            window.location.href = `https://www.google.com/search?q=${query}`
        }
    } else {
        query = this.value;
    }
}

//search google button
search_btn.onclick = function(){
    if (query === undefined){
        return
    } else {
        query = search_input.value.trim().split(" ").join("+")
        window.location.href = `https://www.google.com/search?q=${query}`
    }
}

chrome.bookmarks.getTree( function(data){
    console.log(data)
})

