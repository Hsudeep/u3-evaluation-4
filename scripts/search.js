// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
import { navbar } from "../components/navbar.js";

let nav_bar = document.getElementById("navbar");
nav_bar.innerHTML = navbar();

//JSON.parse(localStorage.getItem("searchval"))
let data = document.getElementById("search_input");
//JSON.parse(localStorage.getItem("searchval"));
data.addEventListener("keydown", jaadu);

function jaadu(e) {
  if (e.key == "Enter") {
    let data =
      document.getElementById("search_input").value ||
      JSON.parse(localStorage.getItem("searchval"));
    // console.log(data)
    conDetails(data);
  }
}
//   console.log(data)

let conDetails = async (data) => {
  // data = localStorage.getItem("searchval")
  try {
    let res = await fetch(
      `https://masai-mock-api.herokuapp.com/news?q=${data}`
    );

    let newsdata = await res.json();
    console.log(newsdata);
    conappendata(newsdata);
  } catch (err) {
    console.log(err);
  }
};

function conappendata(newsdata) {
  newsdata.articles.forEach(({ title, urlToImage, content, description }) => {
    let results = document.getElementById("results");
    results.innerHTML = null;
    let div = document.createElement("div");
    div.setAttribute("class", "news");
    let Newstitle = document.createElement("p");
    Newstitle.innerText = title;
    let NewsImg = document.createElement("img");
    NewsImg.src = urlToImage;
    div.append(NewsImg, Newstitle, description);
    results.append(div);
  });
}
