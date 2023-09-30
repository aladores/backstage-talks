let wheelEventHandler;
window.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.querySelector(".main-container");
    const bookItems = mainContainer.querySelectorAll(".book-wrapper");
    const bookLinks = document.querySelectorAll(".issue-list a");

    //Always start at the beginning of the page
    window.scrollTo(0, 0);

    function toggleView() {
        snapToClosestBook(mainContainer, bookItems.length);
        if (window.innerWidth > 990) {

            handleScroll(mainContainer, bookItems.length);
        }
        else {
            //If mobile view disable the scroll hi jacking
            window.removeEventListener("wheel", wheelEventHandler);
        }
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bookId = entry.target.getAttribute("id");
                updateActiveId(bookId, bookLinks);
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

    handleKeydown(mainContainer, bookItems.length);
    handleLinkClick(bookLinks);
    toggleView();
    window.addEventListener("resize", () => {
        toggleView();
    });
});

function handleScroll(mainContainer, maxLength) {
    let isScrolling = false;

    wheelEventHandler = function (event) {
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
    };
    window.addEventListener("wheel", wheelEventHandler);
}

function handleLinkClick(bookLinks) {
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

function handleKeydown(mainContainer, maxLength) {
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

function snapToClosestBook(mainContainer, maxLength) {
    const url = window.location.href.split("#");
    let currentId = (url[1].split("-")[1]) ?? maxLength;
    const bookElement = mainContainer.querySelector(`#issue-${parseInt(currentId)}`);
    moveToBook(bookElement);
}

function moveToBook(book) {
    book.scrollIntoView({ behavior: "smooth" });
}

function updateActiveId(bookId, bookLinks) {
    //Update url
    history.pushState(null, null, `#${bookId}`);

    //Update active links
    bookLinks.forEach(function (link) {
        const bookLinkId = link.getAttribute("href").substring(1);
        if (bookLinkId === bookId) {
            link.classList.add("text-bold");
        }
        else {
            link.classList.remove("text-bold");
        }
    });

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
}