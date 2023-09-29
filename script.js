import Store from './services/Store.js'
let currentStore = new Store;

window.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.querySelector(".main-container");
    const bookItems = mainContainer.querySelectorAll(".book-wrapper");
    const bookItemsReverse = Array.from(bookItems).reverse();
    const bookLinks = document.querySelectorAll(".issue-list a");

    currentStore.setCounter(bookItems.length);
    initScroll(mainContainer, bookItemsReverse);
    initKeyDown(bookItemsReverse);
    initLinks(bookLinks);
    setActiveBook();
});

function initScroll(mainContainer, bookItems) {
    let isScrolling = false;
    mainContainer.addEventListener("wheel", function (event) {
        event.preventDefault();
        if (!isScrolling) {
            isScrolling = true;
            if (event.deltaY > 0 && currentStore.counter > 1) {
                currentStore.decrement();
                moveToBook(bookItems[currentStore.counter - 1]);
            } else if (event.deltaY < 0 && currentStore.counter < bookItems.length) {
                currentStore.increment();
                moveToBook(bookItems[currentStore.counter - 1]);
            }
            setTimeout(function () {
                isScrolling = false;
            }, 1200);
        }
    });
};

function initLinks(bookLinks) {
    bookLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const bookId = link.getAttribute("href").substring(1);
            const book = document.getElementById(bookId);
            const currentId = bookId.slice(bookId.length - 1);
            if (book) {
                currentStore.setCounter(currentId);
                moveToBook(book);
            }
        });
    });
}

function initKeyDown(books) {
    window.addEventListener('keydown', function (event) {
        if (event.key == 'ArrowUp' && currentStore.counter < books.length) {
            currentStore.increment();
            moveToBook(books[currentStore.counter - 1]);
        }
        else if (event.key == 'ArrowDown' && currentStore.counter > 1) {
            currentStore.decrement();
            moveToBook(books[currentStore.counter - 1]);
        }
    });
}

function setActiveBook() {
    const bookLinks = document.querySelectorAll(".issue-list a");
    bookLinks.forEach(function (link) {
        const bookId = link.getAttribute("href").substring(1);
        const currentId = bookId.slice(bookId.length - 1);
        if (parseInt(currentId) === currentStore.counter) {
            link.classList.add("text-bold");
        }
        else {
            link.classList.remove("text-bold");
        }
    });
}

function moveToBook(book) {
    changeColorBackground(currentStore.counter);
    book.scrollIntoView({ behavior: "smooth" });
    setActiveBook();
    console.log(currentStore.counter);
}

function changeColorBackground(id) {
    switch (parseInt(id)) {
        case 7:
            document.body.style.backgroundColor = "#FF608C";
            break;
        case 6:
            document.body.style.backgroundColor = "#fff";
            break;
        case 5:
            document.body.style.backgroundColor = "#00c1b5";
            break;
        case 4:
            document.body.style.backgroundColor = "#ff651a";
            break;
        case 3:
            document.body.style.backgroundColor = "#ffbe00";
            break;
        case 2:
            document.body.style.backgroundColor = "#1d3fbb";
            break;
        case 1:
            document.body.style.backgroundColor = "#e30512";
            break;
    }
}
