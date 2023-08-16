import { localStorage, Configs } from "./storage.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission
    const input = document.getElementById("curr_url").value;

    console.log("input url is : " + input);
    localStorage.get((userData) => {
      let temp = new Configs();
      temp.urls = userData.urls;
      if (input != "") {
        temp.urls.push(input);
        localStorage.set(temp);
      }
      console.log(temp.urls);
    });

    localStorage.get((userData) => {
      console.log(userData.urls);
    });

    await new Promise((r) => setTimeout(r, 2000));
    blockedUrls();

    // const clear = document.getElementById("clear")
    // clear.onC
    // You can perform additional actions here, such as data validation, storage, or API calls.
  });
});

document.getElementById("clear").addEventListener("click", clear);

function clear() {
  chrome.storage.sync.clear();
  blockedUrls();
}

function blockedUrls() {
  let data = [];
  localStorage.get((userData) => {
    console.log(userData.urls);
    let list = document.getElementById("myList");
    list.innerHTML = "";
    for (let i = 0; i < userData.urls.length; ++i) {
      let li = document.createElement("li");
      li.innerText = userData.urls[i];
      list.appendChild(li);
    }
  });
}

blockedUrls();
