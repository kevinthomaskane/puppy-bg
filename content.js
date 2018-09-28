let query;
let bookmarks_selected;
let notes_selected;
let modal_open = false;
let show_searchbar = true;
let chosen_puppy;
let number_of_notes;

let to_do_items_storage = {};
let notes_storage = {};

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
const search_container = document.querySelector(".search__container");

//notes container
const notes_container = document.querySelector(".notes-container");
const add_note = document.querySelector(".add-note");

//tabs
const bookmarks_tab = document.querySelector(".bookmarks-tab");
const puppies_tab = document.querySelector(".images-tab");
const to_do_tab = document.querySelector(".to-do-tab");
const settings_tab = document.querySelector(".settings-tab");
const tabs_array = [bookmarks_tab, puppies_tab, to_do_tab, settings_tab];

//containers
const bookmarks_container = document.querySelector(".bookmarks-container");
const bookmarks_main_container = document.querySelector(
  ".bookmarks-main-container"
);
const to_do_container = document.querySelector(".to-do-container");
const settings_container = document.querySelector(".settings-container");
const puppies_container = document.querySelector(".puppies-container");
const puppies_row = document.querySelector(".puppies-row");
const containers_array = [
  bookmarks_main_container,
  to_do_container,
  settings_container,
  puppies_container
];

//to-do items
const to_do_input = document.querySelector(".to-do-input");
const to_do_list = document.querySelector(".to-do-append");
const to_do_add = document.querySelector(".to-do-add");

//slider pieces
const yes_arr = [...document.querySelectorAll(".yes")];
const no_arr = [...document.querySelectorAll(".no")];
const slide_arr = [...document.querySelectorAll(".slide")];

//puppy parts
const eye_lids = document.getElementById("eyelids");
const default_mouth = document.getElementById("default-mouth");
const speech_bubble = document.getElementById("speech-bubble");
const tail = document.getElementById("tail");
const puppy_container = document.querySelector(".puppy-container");

const H = document.getElementById("H");
const i1 = document.getElementById("i");
const t = document.getElementById("t");
const h = document.getElementById("h");
const e1 = document.getElementById("e-1");
const r = document.getElementById("r");
const e2 = document.getElementById("e-2");
const ex = document.getElementById("ex");
const letters_array = [H, i1, t, h, e1, r, e2, ex];

//show search bar
if (!localStorage.getItem("search-setting")) {
  localStorage.setItem("search-setting", "true");
} else {
  if (localStorage.getItem("search-setting") === "true") {
    search_container.style.display = "block";
  } else {
    search_container.style.display = "none";
    for (let i = 0; i < slide_arr.length; i++) {
      if (slide_arr[i].getAttribute("data-id") === "search-setting") {
        slide_arr[i].style.right = "26px";
        slide_arr[i].style.background = "gray";
        slide_arr[i].style.boxShadow = "2px 0px 8px 2px #dbdbdb";
      }
    }
  }
}

if (!localStorage.getItem("puppy-setting")) {
  localStorage.setItem("puppy-setting", "true");
  choose_puppy(array_of_puppies);
  localStorage.setItem("image", chosen_puppy);
} else {
  if (localStorage.getItem("puppy-setting") === "true") {
    choose_puppy(array_of_puppies);
  } else {
    for (let i = 0; i < slide_arr.length; i++) {
      if (slide_arr[i].getAttribute("data-id") === "puppy-setting") {
        slide_arr[i].style.right = "26px";
        slide_arr[i].style.background = "gray";
        slide_arr[i].style.boxShadow = "2px 0px 8px 2px #dbdbdb";
      }
    }
    body.setAttribute(
      "style",
      `background-image: url("${localStorage.getItem(
        "image"
      )}"); background-size: 100%;`
    );
  }
}

//listener for notes
add_note.onclick = function() {
  if (number_of_notes < 3) {
    let note = document.createElement("div");
    let delete_btn = document.createElement("span");
    let text_area = document.createElement("textarea");
    delete_btn.innerHTML = "&times;";
    delete_btn.className = "note-delete";
    note.className = "note-div";
    text_area.className = "note-textarea";
    note.setAttribute("data-id", Math.random());
    delete_btn.setAttribute("data-id", note.getAttribute("data-id"));
    text_area.setAttribute("data-id", note.getAttribute("data-id"));
    text_area.addEventListener("keyup", function(e) {
      notes_storage[text_area.getAttribute("data-id")] = this.value;
      notesToStorage(notes_storage);
    });
    delete_btn.addEventListener("click", function() {
      delete notes_storage[this.getAttribute("data-id")];
      localStorage.setItem("notes", JSON.stringify(notes_storage));
      this.parentElement.remove();
    });
    note.appendChild(delete_btn);
    note.appendChild(text_area);
    notes_container.appendChild(note);
    number_of_notes++;
  }
};

//set notes to local storage
function notesToStorage(obj) {
  localStorage.setItem("notes", JSON.stringify(obj));
}

//get notes from localstorage
if (localStorage.getItem("notes")) {
  let notes = JSON.parse(localStorage.getItem("notes"));
  notes_storage = notes;
  number_of_notes = Object.keys(notes).length;
  for (let prop in notes) {
    let note = document.createElement("div");
    let delete_btn = document.createElement("span");
    let text_area = document.createElement("textarea");
    delete_btn.innerHTML = "&times;";
    delete_btn.className = "note-delete";
    note.className = "note-div";
    text_area.className = "note-textarea";
    note.setAttribute("data-id", prop);
    delete_btn.setAttribute("data-id", prop);
    text_area.setAttribute("data-id", prop);
    text_area.value = notes[prop];
    text_area.addEventListener("keyup", function(e) {
      notes_storage[text_area.getAttribute("data-id")] = this.value;
      notesToStorage(notes_storage);
    });
    delete_btn.addEventListener("click", function() {
      delete notes[prop];
      localStorage.setItem("notes", JSON.stringify(notes));
      this.parentElement.remove();
    });
    note.appendChild(delete_btn);
    note.appendChild(text_area);
    notes_container.appendChild(note);
  }
}

//display puppy images
function printPuppyImages(arr) {
  for (let i = 0; i < arr.length; i++) {
    let puppy_image = document.createElement("div");
    puppy_image.className = "puppy-image";
    puppy_image.setAttribute("data-id", arr[i]);
    puppy_image.style.backgroundImage = `url('${arr[i]}')`;
    puppy_image.onclick = function() {
      setStorageOptions("image", arr[i]);
      setStorageOptions("puppy-setting", "false");
      for (let i = 0; i < slide_arr.length; i++) {
        if (slide_arr[i].getAttribute("data-id") === "puppy-setting") {
          slide_arr[i].style.right = "26px";
          slide_arr[i].style.background = "gray";
          slide_arr[i].style.boxShadow = "2px 0px 8px 2px #dbdbdb";
        }
      }
      body.setAttribute(
        "style",
        `background-image: url("${localStorage.getItem(
          "image"
        )}"); background-size: 100%;`
      );
    };
    puppies_row.appendChild(puppy_image);
  }
}

printPuppyImages(array_of_puppies);

//set storage
function setStorageOptions(key, value) {
  localStorage.setItem(key, value);
}

//init blink
const blink = setInterval(initBlink, 4000);

function initBlink() {
  eye_lids.style.animation = "blink 1s";
  setTimeout(() => {
    eye_lids.style.animation = "";
  }, 1001);
}

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

yes_arr.forEach(el => {
  el.addEventListener("click", function() {
    let id = el.getAttribute("data-id");
    let slider = getSlide(id);
    slider.style.right = "-1px";
    slider.style.background = "rgb(142, 102, 252)";
    slider.style.boxShadow = "-2px 0px 8px 2px #dbdbdb";
    setStorageOptions(id, "true");
    if (id === "search-setting") {
      search_container.style.display = "block";
    }
    if (id === "puppy-setting") {
      localStorage.removeItem("image");
    }
  });
});
no_arr.forEach(el => {
  el.addEventListener("click", function() {
    let id = el.getAttribute("data-id");
    let slider = getSlide(id);
    slider.style.right = "26px";
    slider.style.background = "gray";
    slider.style.boxShadow = "2px 0px 8px 2px #dbdbdb";
    setStorageOptions(id, "false");
    if (id === "search-setting") {
      search_container.style.display = "none";
    }
    if (id === "puppy-setting") {
      setStorageOptions("image", chosen_puppy);
    }
  });
});

function getSlide(id) {
  for (let i = 0; i < slide_arr.length; i++) {
    if (slide_arr[i].getAttribute("data-id") === id) {
      return slide_arr[i];
    }
  }
}

if (localStorage.getItem("todos")) {
  puppy_container.style.display = "none";
  to_do_items_storage = JSON.parse(localStorage.getItem("todos"));
  listFromStorage(to_do_items_storage);
} else {
  puppy_container.style.display = "block";
}

to_do_input.addEventListener("keypress", function(e){
  if (e.which == 13 || e.code == 13){
    let item = to_do_input.value;
  puppy_container.style.display = "none";
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
  }
})

//add listener for to do input
to_do_add.onclick = function() {
  let item = to_do_input.value;
  puppy_container.style.display = "none";
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
    localStorage.removeItem("todos");
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
  chosen_puppy = arr[random_index];
}

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
  let found = false;
  for (let i = 0; i < tabs_array.length; i++) {
    if (tabs_array[i].className.includes("bold-tab")) {
      found = true;
    }
  }
  if (!found && !modal_open) {
    puppies_tab.classList.add("bold-tab");
    modal_open = true;
  } else {
    modal_open = true;
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
minutes.innerText = addZero(date.getMinutes());
seconds.innerText = addZero(date.getSeconds());

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

function addZero(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

setInterval(increaseSeconds, 1000);
