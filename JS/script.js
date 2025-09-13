let upBtn = document.getElementById("up-btn");
let toggleMenu = document.querySelector(".toggle-menu");
let ulLinks = document.querySelector(".ulLinks");
let Links = document.querySelectorAll("header .ulLinks li a");

const images = [
  "./images/landing_1.jpg",
  "./images/landing_2.jpg",
  "./images/design-features.jpg",
];

const shuffleBtns = document.querySelectorAll(".portfolio .shuffle li");
const boxesContainer = document.querySelector(".portfolio .imgs-container");
const moreBtn = document.querySelector(".portfolio .more");

let boxes = [
  { src: "images/shuffle-01.jpg", category: "app", title: "App Image" },
  { src: "images/shuffle-02.jpg", category: "photo", title: "Photo Image" },
  { src: "images/shuffle-03.jpg", category: "web", title: "Web Image" },
  { src: "images/shuffle-04.jpg", category: "print", title: "Print Image" },
  { src: "images/shuffle-05.jpg", category: "app", title: "App Image" },
  { src: "images/shuffle-06.jpg", category: "photo", title: "Photo Image" },
  { src: "images/shuffle-07.jpg", category: "web", title: "Web Image" },
  { src: "images/shuffle-08.jpg", category: "print", title: "Print Image" },
];

const landing = document.querySelector(".landing");
const bullets = document.querySelectorAll(".landing .bullets li");
const leftArrow = document.querySelector(".fa-angle-left");
const rightArrow = document.querySelector(".fa-angle-right");
const form = document.querySelector("header nav .form");
const searchIcon = form.querySelector("i");

const progressSpans = document.querySelectorAll(
  ".our-skills .skills .prog span"
);
const skillsSection = document.querySelector(".our-skills");

const numbers = document.querySelectorAll(".stats .number");
const statsSection = document.querySelector(".stats");

// ===== Active link logic =====
Links.forEach((link) => {
  link.addEventListener("click", () => {
    Links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ===== Toggle menu logic =====
toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  ulLinks.classList.toggle("activeMenu");
  form.classList.remove("active"); // يغلق البحث عند فتح/اغلاق القائمة
});

// ===== Close menu or search on click outside =====
document.addEventListener("click", (e) => {
  if (!form.contains(e.target)) form.classList.remove("active");
  if (!ulLinks.contains(e.target) && !toggleMenu.contains(e.target)) {
    ulLinks.classList.remove("activeMenu");
  }
});

// ===== Scroll to top button =====
window.addEventListener("scroll", () => {
  upBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

upBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  Links.forEach((link) => link.classList.remove("active"));
  Links[0].classList.add("active");
});

// ===== Landing slider =====
let currentIndex = 0;

function changeBackground(index) {
  landing.style.backgroundImage = `url(${images[index]})`;
  bullets.forEach((b, i) => b.classList.toggle("active", i === index));
}

rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  changeBackground(currentIndex);
});

leftArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  changeBackground(currentIndex);
});

bullets.forEach((bullet, i) => {
  bullet.addEventListener("click", () => {
    currentIndex = i;
    changeBackground(currentIndex);
  });
});

changeBackground(currentIndex);

// ===== Search toggle =====
searchIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  form.classList.toggle("active");
  if (ulLinks.classList.contains("activeMenu")) {
    ulLinks.classList.remove("activeMenu");
  }
});

// ===== Portfolio Filter =======

const increment = 4;
let visibleCount = increment;

function renderBoxes() {
  boxesContainer.innerHTML = "";
  boxes.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("box");
    div.dataset.category = item.category;
    div.innerHTML = `
      <img decoding="async" src="${item.src}" alt="" />
      <div class="caption">
        <h4>${item.title}</h4>
        <p>${item.category}</p>
      </div>
    `;
    boxesContainer.appendChild(div);
  });
}

renderBoxes();
const allBoxes = Array.from(boxesContainer.querySelectorAll(".box"));

function showBoxes() {
  allBoxes.forEach((box, index) => {
    box.style.display = index < visibleCount ? "block" : "none";
  });
  moreBtn.style.display = visibleCount >= allBoxes.length ? "none" : "block";
}

showBoxes();

moreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  visibleCount += increment;
  showBoxes();
});

// ===== Filter logic =====
shuffleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    shuffleBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.textContent.toLowerCase();

    allBoxes.forEach((box, index) => {
      const category = box.dataset.category;
      if (filter === "all") {
        box.style.display = index < visibleCount ? "block" : "none";
      } else {
        box.style.display =
          category === filter && index < visibleCount ? "block" : "none";
      }
    });

    const hiddenBoxes = allBoxes.filter(
      (box, index) =>
        (filter === "all" || box.dataset.category === filter) &&
        index >= visibleCount
    );
    moreBtn.style.display = hiddenBoxes.length > 0 ? "block" : "none";
  });
});

// Animated Progress Bars when Skills Section is in view
const skillsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressSpans.forEach((span) => {
          span.style.width = span.getAttribute("data-progress");
        });
        observer.unobserve(skillsSection);
      }
    });
  },
  { threshold: 0.5 }
);

skillsObserver.observe(skillsSection);

// ===== Stats Numbers Animation =====
// ===== Stats Numbers Animation - Smooth =====
function animateNumber(el) {
  const target = parseFloat(el.textContent.replace(/,/g, "")); 
  let current = 0;
  const duration = 1000;
  const stepTime = 20; 
  const steps = duration / stepTime; 
  const increment = target / steps; 

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(counter);
      el.textContent = el.dataset.final;
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
}

numbers.forEach((num) => {
  num.dataset.final = num.textContent;
  num.textContent = "0";
});

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        numbers.forEach(animateNumber);
        observer.unobserve(statsSection);
      }
    });
  },
  { threshold: 0.5 }
);

statsObserver.observe(statsSection);
