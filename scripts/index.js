// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page

import { navbar } from "../components/navbar.js";

let nav_bar = document.getElementById("navbar")
nav_bar.innerHTML = navbar()

// let api = `https://masai-mock-api.herokuapp.com/news/top-headlines?country={country code}`
let newsDetails = async () =>{

    try{
    let res = await fetch(`https://masai-mock-api.herokuapp.com/news/top-headlines?country=in`)

    let newsdata = await res.json()
    appendata(newsdata)
    }
    catch(err){
        console.log(err)
    }
}
newsDetails()
function appendata(newsdata){
    newsdata.articles.forEach(({title, urlToImage, content, description})=>{
        let results = document.getElementById("results")
        
        let div = document.createElement("div")
        // div.innerHTML=null;
        let Newstitle = document.createElement("p")
        Newstitle.innerText = title;
        let NewsImg = document.createElement("img")
        NewsImg.src = urlToImage;
        div.append(NewsImg, Newstitle, description)
        results.append(div)
    });
}
function cSearch(){
    let data = this.id
    conDetails(data)
}

let conDetails = async(data) =>{
    try{
        let res = await fetch(`https://masai-mock-api.herokuapp.com/news/top-headlines?country=${data}`)
    
        let newsdata = await res.json()
        console.log(newsdata)
        conappendata(newsdata)
        }
        catch(err){
            console.log(err)
        }
}

function conappendata(newsdata){
    let results = document.getElementById("results")
    results.innerHTML=null;
    newsdata.articles.forEach(({title, urlToImage, content, description})=>{
        
        let div = document.createElement("div")
        let Newstitle = document.createElement("p")
        Newstitle.innerText = title;
        let NewsImg = document.createElement("img")
        NewsImg.src = urlToImage;
        div.append(NewsImg, Newstitle, description)
        results.append(div)
    });
}
let conNews = document.getElementById("sidebar").children

for(let el of conNews){
    el.addEventListener("click", cSearch)
}

let searchtag = document.getElementById("search_input");
searchtag.addEventListener("keydown", searchpage)

function searchpage(e){
    if(e.key == 'Enter'){
        let searchtag = document.getElementById("search_input").value;
        localStorage.setItem("searchval",JSON.stringify(searchtag)) || []
        window.location.href = "search.html"
    }
    
}