import Store from './services/Store.js'
let currentStore = new Store;

window.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.querySelector(".main-container");
    const bookItems = mainContainer.querySelectorAll(".book-wrapper");
    const bookLinks = document.querySelectorAll(".issue-list a");
    //Mobile script
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bookId = entry.target.getAttribute("id");
                changeBackgroundColor(bookId);
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
    });

    bookItems.forEach(section => {
        observer.observe(section);
    });

    initScroll(mainContainer, bookItems.length);
    initKeyDown(mainContainer, bookItems.length);
    initLinks(bookLinks);
    // }
});

function initScroll(mainContainer, maxLength) {
    let isScrolling = false;

    mainContainer.addEventListener("wheel", function (event) {
        event.preventDefault();
        if (!isScrolling) {
            isScrolling = true;
            const url = window.location.href.split("#");
            let currentId = (url[1].split("-")[1]);
            if (event.deltaY > 0 && parseInt(currentId) > 1) {
                const bookElement = mainContainer.querySelector(`#issue-${parseInt(currentId) - 1}`);
                moveToBook(bookElement);
            } else if (event.deltaY < 0 && parseInt(currentId) < maxLength) {
                const bookElement = mainContainer.querySelector(`#issue-${parseInt(currentId) + 1}`);
                moveToBook(bookElement);
            }

            setTimeout(function () {
                isScrolling = false;
            }, 1200);
        }
    });
}

function initLinks(bookLinks) {
    bookLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const bookId = link.getAttribute("href").substring(1);
            const book = document.getElementById(bookId);
            if (book) {
                moveToBook(book);
            }
        });
    });
}

function initKeyDown(mainContainer, maxLength) {
    window.addEventListener('keydown', function (event) {
        const url = window.location.href.split("#");
        let currentId = (url[1] && url[1].split("-")[1]);

        if (event.key === 'ArrowDown' && parseInt(currentId) > 1) {
            const bookElement = mainContainer.querySelector(`#issue-${parseInt(currentId) - 1}`);
            moveToBook(bookElement);
        } else if (event.key === 'ArrowUp' && parseInt(currentId) < maxLength) {
            const bookElement = mainContainer.querySelector(`#issue-${parseInt(currentId) + 1}`);
            moveToBook(bookElement);
        }
    });
}


function moveToBook(book) {
    book.scrollIntoView({ behavior: "smooth" });
    //setActiveBook();
}

function changeBackgroundColor(bookId) {
    const bookColors = {
        "issue-7": "#FF608C",
        "issue-6": "#fff",
        "issue-5": "#00c1b5",
        "issue-4": "#ff651a",
        "issue-3": "#ffbe00",
        "issue-2": "#1d3fbb",
        "issue-1": "#e30512",
    };

    if (bookColors.hasOwnProperty(bookId)) {
        const backgroundColor = bookColors[bookId];
        document.body.style.backgroundColor = backgroundColor;
    }

    history.pushState(null, null, `#${bookId}`);
}

function setActiveBook() {
    const bookLinks = document.querySelectorAll(".issue-list a");
    bookLinks.forEach(function (link) {
        const bookId = link.getAttribute("href").substring(1);
        const currentId = bookId.slice(bookId.length - 1);
        if (parseInt(currentId) == parseInt(currentStore.counter)) {
            link.classList.add("active");
        }
        else {
            link.classList.remove("active");
        }
    });
}