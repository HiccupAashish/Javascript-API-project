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
const like = document.querySelector("#liker")
const wholebody = document.querySelector("#whole-body");
const btnclose = document.querySelector("#close");
const modalheading = document.querySelector("#headingofmodal");
const footer = document.querySelector("#footernav");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const heartbar = document.querySelector("#heart");
const heart = document.querySelector(".fa-solid");
const thankyou = document.querySelector("#thankyou");
// let cat = "india_english_sports";
const API =
    `https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=`;
let page = 1;

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

        fetchNewsDetails(API + "india_english_science")
            // fetchNewsDetails(
            //     // "https://newsapi.in/newsapi/news.php?key=5PqRdw8t9TiQBKfPMpXnFrDAScMF8c&category=india_english_science"
            //     cat="india_english_science";
            // );
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
        console.log(url)
        const response = await fetch(url);
        // console.log(response)
        news = (await response.json()).News;
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
    <div id="liker" >
   <i class="fa-solid fa-heart"></i>
   </div>
   
    </div>
    >`;
    });
    content.innerHTML = d.join("");
    console.log(like)

}

content.addEventListener("click", (event) => {
    const trigger = event.target;

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
        if (page > 0 || page === 0) {
            const as = news.slice(page * 10, prevpage * 10);

            renderdata(as);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            alert("No more previous page to load");
        }
    }
    if (event.target === nextBtn) {
        if (page === 0) { page = page + 1; }
        const as = news.slice(page * 10, nextpage * 10);
        page = nextpage;

        renderdata(as);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return page;
    }
});

// heartbar.addEventListener("click", (event) => {
//     if (event.target === heart) {
//         heart.classList.toggle("color");
//         if (p.innerHTML === "Give us a like !") {
//             p.innerHTML = "Thankyou for your love and support";
//         } else {
//             p.innerHTML = "Give us a like !";
//         }
//     }
// // });
// like.addEventListener('click', () => {
//             // heart.classList.toggle('color');
//             console.log("Aashish")
// })

// console.log(like)
fetchNewsDetails(API + "india_english");