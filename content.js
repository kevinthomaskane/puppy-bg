// const button = document.querySelector("button")
// button.onclick = function(){
//     window.location.href = "https://www.google.com"
// }

let query;
const preview_key = "5babefbd8a567164c73d920297d41be28920f036b7156"
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
const bookmarks_container = document.querySelector(".bookmarks-container");

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


// fill bookmarks
function getBookmarks(){
    
}


chrome.bookmarks.getSubTree("0", function(data){
    let bookmarks_array = data[0].children[0].children;
    console.log(bookmarks_array)
    for (let i = 0; i < bookmarks_array.length; i++){
        let card = document.createElement("a");
        card.href = bookmarks_array[i].url;
        card.classname = "bookmark-card";
        let icon = document.createElement("img");
        icon.src = "chrome://favicon/" + bookmarks_array[i].url;
        let title = document.createElement("span");
        title.innerText = bookmarks_array[i].title;
        fetch("https://api.linkpreview.net?key="+ preview_key + "&q=" + bookmarks_array[i].url).then(response => {
            return response.json()
        }).then(image => {
            card.style.backgroundImage = `url(${image.image})`;
            card.appendChild(icon);
            card.appendChild(title);
            bookmarks_container.appendChild(card);
        }) 
    }
})