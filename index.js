const navdisplay = document.querySelector("#Categories");
const heading = document.querySelector("div#heading");
const navbar = document.querySelector("div#navbar");
const content = document.querySelector("main");
const science = document.querySelector("li#science");
const sports = document.querySelector("li#sports");
const business = document.querySelector("li#business");
const politics = document.querySelector("li#politics");
const modalp = document.querySelector("#modalp");
const modal = document.querySelector("#modal");
const wholebody = document.querySelector("#whole-body");
const btnclose = document.querySelector("#close");
const modalheading = document.querySelector("#headingofmodal");
const footer = document.querySelector("#footernav");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const heartbar = document.querySelector("#heart");
const heart = document.querySelector(".fa-solid");
const thankyou = document.querySelector("#hidethankyou");
const API =
  "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english";
let page = 1;
let state = 1;

navdisplay.addEventListener("click", (event) => {
  const trigger = event.target;
  if (trigger.id === "navdisplay") navbar.classList.toggle("see");
  navbar.classList.toggle("hide");
});

navbar.addEventListener("click", (event) => {
  const tg = event.target;
  if (tg.id === "science") {
    fetchNewsDetails(
      "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_science"
    );
  } else if (tg.id === "sports") {
    fetchNewsDetails(
      "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_sports"
    );
  } else if (tg.id === "business") {
    fetchNewsDetails(
      "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_business"
    );
  } else {
    fetchNewsDetails(
      "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_politics"
    );
  }
});
let news;
async function fetchNewsDetails(url) {
  try {
    const response = await fetch(`${url}`);
    news = (await response.json()).News;
    console.log(news);
    const first = news.slice(0, 10);
    togglenavigation()
    renderdata(first);
    //  getnews(news)
  } catch (error) {
    console.error(error);
  }
}
// function getnews(news){
//   let html="";

// }

function renderdata(data) {
  const d = data.map((char) => {
    return `<div  data-character='${JSON.stringify(char)}' class="card"> 
    <h2 data-character='${JSON.stringify(char)}'>${char.title}</h2>
    <img data-character='${JSON.stringify(char)}' src="${char.image
      }" alt="No picture available"style="float:left; width:120px;height:100px;">
    <p data-character='${JSON.stringify(
        char
      )}' id="newsdescription" style="float:right;">${char.description}</p>
    <p data-character='${JSON.stringify(
        char
      )}' id="newspublished">Date published: ${char.published_date}</p>
    </div>`;
  });
  content.innerHTML = d.join("");
}
content.addEventListener("click", (event) => {
  const trigger = event.target;
  try {
    const char = JSON.parse(trigger.dataset.character);
    modalheading.innerHTML = `${char.title}`;
    modalp.innerHTML = ` ${char.description}`;
  } catch (err) {
    console.log("Error: ", err.message);
  }
  modal.classList.add("active");
  wholebody.classList.add("opac");
});

btnclose.addEventListener("click", () => {
  modal.classList.remove("active");
  wholebody.classList.remove("opac");
});

footer.addEventListener("click", (event) => {
 
  let nextpage = page + 1;

  if (event.target === prevBtn) {
    prevpage = nextpage - 1;
    page = prevpage - 1;
    const as = news.slice(page * 10, prevpage * 10);
    // page = prevpage;
    renderdata(as);

  }
  if (event.target === nextBtn) {
    console.log("nextbtn");
    const as = news.slice(page * 10, nextpage * 10);

    page = nextpage;
    renderdata(as);

  } return state = 2;

});
function togglenavigation() {
  if (state === 1) { prevBtn.disabled = true; }
  else {
    prevBtn.disabled = false;
  }
}
fetchNewsDetails(API);

heartbar.addEventListener("click", (event) => {
  if (event.target === heart) {
    heart.classList.toggle("color");
    thankyou.classList.add("active");
  }
});
