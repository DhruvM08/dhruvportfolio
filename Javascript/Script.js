// // Loader handling: fade out loader after 2 seconds on window load
// window.addEventListener("load", () => {
//   setTimeout(() => {
//     const loader = document.querySelector(".loader-wrapper");
//     if (loader) {
//       loader.classList.add("fade-out");
//     }
//   }, 2000);
// });

// Hamburger Menu Toggle for Responsive Nav - Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const backdrop = document.getElementById('menu-backdrop');
  const navLinkItems = document.querySelectorAll('.nav-link');
  let menuOpen = false;

  function closeMenu() {
    menuOpen = false;
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    menuOpen = true;
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger && navLinks) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking backdrop
    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeMenu();
      });
    }

    // Close menu when clicking on nav links
    navLinkItems.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 900) {
          closeMenu();
        }
      });
    });

    // Close menu when clicking outside nav on mobile
    document.addEventListener('click', function (e) {
      if (menuOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target) && (!backdrop || !backdrop.contains(e.target))) {
        closeMenu();
      }
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && menuOpen) {
        closeMenu();
      }
    });
  }
});

// Typing Animation using Typed.js
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing");

  if (typingElement) {
    new Typed(".typing", {
      strings: ["Java Backend Developer", "Software Developer", "Tech Enthusiast"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    });
  } else {
    console.warn("'.typing' element not found in DOM.");
  }
});

// Smooth Scroll with URL Fragment Update
document.querySelectorAll('.nav-link, .firstview-button1').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    // Smooth scroll
    const targetPos = targetSection.offsetTop - 70;
    window.scrollTo({
      top: targetPos,
      behavior: 'smooth'
    });
    setTimeout(() => {
      history.pushState(null, '', href); // better than location.hash to avoid jump
    }, 500); // Adjust this timeout to match your scroll speed
  });
});


// Scroll direction tracking
let lastScrollY = window.pageYOffset;
let scrollDirection = 'down';

window.addEventListener('scroll', () => {
  const currentScrollY = window.pageYOffset;
  scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentScrollY;
});

// Intersection Observer for section activation
const firstview = document.querySelector('.firstview');
const sections = document.querySelectorAll('section');
const elementsToObserve = firstview ? [firstview, ...sections] : [...sections];

const observerOptions = {
  root: null,
  threshold: 0.2,
  rootMargin: '0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
    if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
      entry.target.classList.add('above');
    }
  });
}, observerOptions);

// Observe all sections
elementsToObserve.forEach(element => observer.observe(element));

// Handle section activation on page load/refresh (e.g. /#about)
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      // Scroll to section instantly
      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
        target.classList.add('active');
      }, 100);
    }
  }

  // Ensure firstview is active in case it's skipped on scroll
  if (firstview && !firstview.classList.contains('active')) {
    firstview.classList.add('active');
  }

  // Manually trigger scroll to re-activate observers
  window.dispatchEvent(new Event('scroll'));
});
//Form Validation

function validateform() {

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();

  //Adding Validation by JS
  if (fname == "") {
    alert("Please Submit Firstname");
    return false;
  } else if (lname == "") {
    alert("Please Submit Lastname");
    return false;
  } else if (email == "") {
    alert("Please Submit Email");
    return false;
  } else {
    alert("Form Submitted Successfully !!");
    return true;
  }


}

