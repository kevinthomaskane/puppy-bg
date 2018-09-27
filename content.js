let query;
let bookmarks_selected;
let notes_selected;
let modal_open = false;

let to_do_items_storage = {};

const array_of_puppies = [
  "https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/460823/pexels-photo-460823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/248307/pexels-photo-248307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
  "https://images.pexels.com/photos/374906/pexels-photo-374906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
  "https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/69372/pexels-photo-69372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];

//DOM elements
const body = document.querySelector("body");
const search_input = document.querySelector(".search-bar");
const search_btn = document.querySelector(".search-btn");
const settings_btn = document.querySelector(".settings-btn");
const settings_modal = document.querySelector(".settings-modal");
const close_modal = document.querySelector(".close-modal");

//tabs
const bookmarks_tab = document.querySelector(".bookmarks-tab");
const puppies_tab = document.querySelector(".images-tab");
const to_do_tab = document.querySelector(".to-do-tab");
const tabs_array = [bookmarks_tab, puppies_tab, to_do_tab];

//containers
const bookmarks_container = document.querySelector(".bookmarks-container");
const bookmarks_main_container = document.querySelector(
  ".bookmarks-main-container"
);
const to_do_container = document.querySelector(".to-do-container");
const containers_array = [bookmarks_main_container, to_do_container];

//to-do items
const to_do_input = document.querySelector(".to-do-input");
const to_do_list = document.querySelector(".to-do-append");
const to_do_add = document.querySelector(".to-do-add");

//add listener to close modal
close_modal.onclick = function() {
  settings_modal.style.top = "-300px";
  modal_open = false;
};

//add listener to close other tabs
tabs_array.forEach(el => {
  el.onclick = function() {
    el.classList.add("bold-tab");
    closeOtherTabs(el.getAttribute("data-id"));
    removeActiveLink(el);
    openContainer(el);
  };
});

if (localStorage.getItem("todos")) {
  to_do_items_storage = JSON.parse(localStorage.getItem("todos"));
  console.log(to_do_items_storage);
  listFromStorage(to_do_items_storage);
} else {
  null;
}

//add listener for to do input
to_do_add.onclick = function() {
  let item = to_do_input.value;
  if (item.length > 1) {
    let new_item = document.createElement("li");
    new_item.setAttribute("data-id", Math.random());
    let trash = document.createElement("div");
    trash.setAttribute("data-id", new_item.getAttribute("data-id"));
    trash.innerHTML = "&#128465;";
    trash.className = "to-do-trash";
    new_item.className = "to-do-item";
    new_item.innerText = item;
    new_item.appendChild(trash);
    to_do_items_storage[new_item.getAttribute("data-id")] = item;
    setToDoLocalStorage(to_do_items_storage);
    to_do_list.appendChild(new_item);
    trash.addEventListener("click", function() {
      let id = this.getAttribute("data-id");
      for (let prop in to_do_items_storage) {
        if (id === prop) {
          delete to_do_items_storage[prop];
          setToDoLocalStorage(to_do_items_storage);
          let remove_these = [
            ...document.querySelectorAll(`[data-id='${id}']`)
          ];
          remove_these.forEach(el => el.remove());
        }
      }
    });
  }
};

//append to-do items from storage
function listFromStorage(obj) {
  for (let prop in obj) {
    let new_item = document.createElement("li");
    new_item.setAttribute("data-id", prop);
    let trash = document.createElement("div");
    trash.setAttribute("data-id", prop);
    trash.innerHTML = "&#128465;";
    trash.className = "to-do-trash";
    new_item.className = "to-do-item";
    new_item.innerText = obj[prop];
    new_item.appendChild(trash);
    to_do_list.appendChild(new_item);
    trash.addEventListener("click", function() {
      let id = this.getAttribute("data-id");
      for (let prop in to_do_items_storage) {
        if (id === prop) {
          delete to_do_items_storage[prop];
          setToDoLocalStorage(to_do_items_storage);
          let remove_these = [
            ...document.querySelectorAll(`[data-id='${id}']`)
          ];
          remove_these.forEach(el => el.remove());
        }
      }
    });
  }
}

function setToDoLocalStorage(item) {
  if (Object.keys(item).length !== 0) {
    localStorage.setItem("todos", JSON.stringify(to_do_items_storage));
  } else {
    localStorage.clear();
  }
}

function closeOtherTabs(tab_name) {
  for (let i = 0; i < containers_array.length; i++) {
    if (containers_array[i].getAttribute("data-id") !== tab_name) {
      containers_array[i].style.display = "none";
    }
  }
}

function removeActiveLink(tab_name) {
  for (let i = 0; i < tabs_array.length; i++) {
    if (tabs_array[i] !== tab_name) {
      tabs_array[i].classList.remove("bold-tab");
    }
  }
}

function openContainer(container) {
  for (let i = 0; i < containers_array.length; i++) {
    if (
      containers_array[i].getAttribute("data-id") ===
      container.getAttribute("data-id")
    ) {
      containers_array[i].style.display = "block";
    }
  }
}

function choose_puppy(arr) {
  let max_index = arr.length;
  let random_index = Math.floor(Math.random() * max_index);
  body.setAttribute(
    "style",
    `background-image: url("${arr[random_index]}"); background-size: 100%;`
  );
}

choose_puppy(array_of_puppies);

//listen for user hitting enter
search_input.onkeydown = function(e) {
  if (e.which == 13 || e.keyCode == 13) {
    if (query === undefined) {
      return;
    } else {
      query = this.value
        .trim()
        .split(" ")
        .join("+");
      window.location.href = `https://www.google.com/search?q=${query}`;
    }
  } else {
    query = this.value;
  }
};

//search google button
search_btn.onclick = function() {
  if (query === undefined) {
    return;
  } else {
    query = search_input.value
      .trim()
      .split(" ")
      .join("+");
    window.location.href = `https://www.google.com/search?q=${query}`;
  }
};

//listen for settings button
settings_btn.onclick = function() {
  settings_modal.style.top = "300px";
  modal_open = true;
  if (!modal_open) {
    bookmarks_tab.classList.add("bold-tab");
  }
};

// fill bookmarks
chrome.bookmarks.getSubTree("0", function(data) {
  let bookmarks_array = data[0].children[0].children;
  for (let i = 0; i < bookmarks_array.length; i++) {
    let card = document.createElement("a");
    card.href = bookmarks_array[i].url;
    card.className = "bookmark-card";
    let icon = document.createElement("img");
    icon.src = "chrome://favicon/" + bookmarks_array[i].url;
    let title = document.createElement("span");
    if (bookmarks_array[i].title.length > 35) {
      let truncated = "";
      for (let j = 0; j < 35; j++) {
        truncated += bookmarks_array[i].title[j];
      }
      truncated += "...";
      title.innerText = truncated;
    } else {
      title.innerText = bookmarks_array[i].title;
    }
    card.appendChild(icon);
    card.appendChild(title);
    bookmarks_container.appendChild(card);
  }
});

const hours = document.querySelector(".clock-hours");
const minutes = document.querySelector(".clock-minutes");
const seconds = document.querySelector(".clock-seconds");
const date = new Date();

hours.innerText = getStandardHours(date.getHours());
minutes.innerText = date.getMinutes();
seconds.innerText = date.getSeconds();

function increaseSeconds() {
  let secs = parseInt(seconds.innerText);
  if (secs < 59) {
    if (secs < 9) {
      secs++;
      seconds.innerText = "0" + secs;
      return;
    }
    secs++;
    seconds.innerText = secs;
  } else {
    increaseMinutes();
    secs = "00";
    seconds.innerText = secs;
  }
}

function increaseMinutes() {
  let mins = parseInt(minutes.innerText);
  if (mins < 59) {
    if (mins < 9) {
      mins++;
      minutes.innerText = "0" + mins;
      return;
    }
    mins++;
    minutes.innerText = mins;
  } else {
    increaseHours();
    mins = "00";
    minutes.innerText = mins;
  }
}

function increaseHours() {
  let hrs = parseInt(hours.innerText);
  if (hrs < 12) {
    if (hrs === 0) {
      hours.innerText = "12";
      return;
    }
    hrs++;
    hours.innerText = hrs;
  } else {
    hrs = "1";
    hours.innerText = hrs;
  }
}

function getStandardHours(hrs) {
  if (hrs < 13) {
    return hrs;
  } else {
    return hrs - 12;
  }
}

setInterval(increaseSeconds, 1000);
