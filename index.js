const navdisplay = document.querySelector("#Categories");
const heading = document.querySelector("div.heading");
const header = document.querySelector("#headingtext");
const navbar = document.querySelector("div#navbar");
const content = document.querySelector("main");
const science = document.querySelector("li#science");
const float = document.querySelector("#float");
const newsurl = document.querySelector("#newsurl");
const sports = document.querySelector("li#sports");
const business = document.querySelector("li#business");
const politics = document.querySelector("li#politics");
const modalp = document.querySelector("#modalp");
const modal = document.querySelector("#modal");
const p = document.querySelector("#like");
const favourates = document.querySelector("#favourates");
const wholebody = document.querySelector("#whole-body");
const btnclose = document.querySelector("#close");
const modalheading = document.querySelector("#headingofmodal");
const footer = document.querySelector("#footernav");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const heartbar = document.querySelector("#heart");
const head = document.querySelector("#favourates");
const fhead = document.querySelector("#favouratesheading");
const thankyou = document.querySelector("#thankyou");

// let cat = "india_english_sports";
const API = `https://newsapi.in/newsapi/news.php?key=JEmFLvIQgnPTtY4oSx47exUeXwJalI&category=`;

navdisplay.addEventListener("click", (event) => {
  const trigger = event.target;
  if (trigger.id === "navdisplay") navbar.classList.toggle("see");
  navbar.classList.toggle("hide");
  navbar.classList.toggle("active");
});

header.addEventListener("click", () => {
  float.innerHTML = `<marquee scrollamount="12">Top News</marquee> `;
  fetchNewsDetails(API);
});

navbar.addEventListener("click", (event) => {
  const tg = event.target;
  if (tg.id === "science") {
    float.innerHTML = `<marquee scrollamount="12">Science</marquee> `;

    // fetchNewsDetails(API + "india_english_science")
    fetchNewsDetails(
      "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_science"
      // cat="india_english_science";
    );
  } else if (tg.id === "sports") {
    float.innerHTML = `<marquee scrollamount="12">Sports </marquee> `;
    fetchNewsDetails(
      "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_sports"
    );
  } else if (tg.id === "business") {
    float.innerHTML = `<marquee scrollamount="12">Business</marquee> `;
    fetchNewsDetails(
      "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_business"
    );
  } else {
    float.innerHTML = `<marquee scrollamount="12">Politics</marquee> `;
    fetchNewsDetails(
      "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_politics"
    );
  }
});

let news;
async function fetchNewsDetails(url) {
  try {
    
    const response = await fetch(url);
    // console.log(response)
    // console.log( await response.json())
    news = (await response.json()).News;
    // console.log(news);
    const first = news.slice(0, 10);
    renderdata(first);
  } catch (error) {
    console.error(error);
  }
}

function renderdata(data) {
  const d = data.map((article) => {
    return `<div  data-article='${JSON.stringify(article)}' class="card"> 
    <h2 data-article='${JSON.stringify(article)}'>${article.title}</h2>
    <img data-article='${JSON.stringify(article)}' src="${
      article.image
    }" alt="No picture available"style="float:left; width:120px;height:100px;">
    <p data-article='${JSON.stringify(
      article
    )}' id="newsdescription" style="float:right;">${article.description}</p>
    <p data-article='${JSON.stringify(
      article
    )}' id="newsurl"class="hide" class>${article.url}</p>
    <p data-article='${JSON.stringify(
      article
    )}' id="newspublished">Date published: ${article.published_date}</p>
    <div data-article='${JSON.stringify(article)}' id="liker" >
   <i data-article='${JSON.stringify(
     article
   )}' id="Love"onclick="myFunction(event)" class="fa-solid fa-heart"></i>
   </div>
   
    </div>
    
    >`;
  });
  content.innerHTML = d.join("");
}

function myFunction(event) {
  const trigger = event.target;
  const char = JSON.parse(trigger.dataset.article);
//   const nodelink = document.createTextNode(`${char.url}`);
  const node = document.createTextNode(`${char.title}`);
  but = document.createElement("button");
  const array=[]
  const para = document.createElement("p");
  para.id = "listing";
  head.classList.remove("hide");
  
  para.appendChild(node);
  para.appendChild(but);
  
  if (trigger.classList.contains("color")) {
   
  } 
  else
   {
    trigger.classList.add("color");
    head.appendChild(para);
    array.push(para)
    console.log(array)
  }
 

  but.addEventListener("click", (event) => {
    const button = event.target;
    button.parentElement.remove();
    trigger.classList.remove("color");
    const le = document.querySelector("#listing");
    if (le == null) {
      head.classList.add("hide");
    }
  });
}

content.addEventListener("click", (event) => {
  const trigger = event.target;
  if (trigger.id !== "liker" && trigger.id !== "Love") {
    try {
      const char = JSON.parse(trigger.dataset.article);
      modalheading.innerHTML = `${char.title}`;

      modalp.innerHTML = ` ${char.description}`;

      newsurl.href = `${char.url}`;
    } catch (err) {
      console.log("Error: ", err.message);
    }
    modal.classList.add("active");
    wholebody.classList.add("opac");
  }
});

btnclose.addEventListener("click", () => {
  modal.classList.remove("active");
  wholebody.classList.remove("opac");
});
let page;
prevBtn.disabled = true;

footer.addEventListener("click", (event) => {
  let firstindexforw;
  let lastindexforw;
  let firstindexback;
  let lastindexback;

  console.log(page);
  if (page === 1) {
    prevBtn.disabled = true;
  }

  if (event.target === prevBtn) {
    firstindexback = page - 1;
    lastindexback = page;
    const as = news.slice(firstindexback * 10, lastindexback * 10);
    page = page - 1;
    console.log(page);
    renderdata(as);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (event.target === nextBtn) {
    if (page === undefined) {
      page = 0;
    }
    prevBtn.disabled = false;
    firstindexforw = page + 1;
    lastindexforw = firstindexforw + 1;
    const as = news.slice(firstindexforw * 10, lastindexforw * 10);
    page = page + 1;
    console.log(page);
    renderdata(as);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

fetchNewsDetails(API + "india_english");
