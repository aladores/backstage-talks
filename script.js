window.addEventListener("DOMContentLoaded", () => {
    init();
    moveIssue();
});

/* Always start at the beginning of the page */
function init() {

}

function moveIssue() {
    // const urlLength = window.location.href.length;
    // let currIndex = window.location.href.slice(urlLength - 1);
    // const mainContainer = document.querySelector(".main-container");

    // const books = document.querySelectorAll(".book-wrapper");

    // const observer = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {

    //         if (entry.isIntersecting) {
    //             console.log(entry);
    //             // const bookId = entry.target.id.slice(entry.target.id.length - 1);
    //             //console.log(entry.target.id);
    //             // console.log(bookId);
    //             // const newHash = `#issue-${bookId}`;
    //             // if (window.location.hash !== newHash) {
    //             //     history.replaceState(null, null, window.location.href.split('#')[0] + newHash);
    //             // }
    //             // console.log(history);
    //         }
    //     })
    // })

    // books.forEach(book => {
    //     observer.observe(book);
    // })
}

function getMiddleElementId() {
    const mainContainer = document.querySelector(".main-container");
    const books = document.querySelectorAll(".book-wrapper");

    let timeoutId;
    const updateMiddleElementId = () => {
        const viewportHeight = window.innerHeight;
        const middleViewportPosition = viewportHeight / 2;

        let middleElementId = null;

        books.forEach(book => {
            const elementTop = book.getBoundingClientRect().top;
            const elementBottom = book.getBoundingClientRect().bottom;

            if (elementTop < middleViewportPosition && elementBottom > middleViewportPosition) {
                middleElementId = book.id.slice(book.id.length - 1);
            }
        });

        if (middleElementId) {
            const newHash = `#issue-${middleElementId}`;
            console.log(middleElementId);
            if (window.location.hash !== newHash) {

                history.replaceState(null, null, newHash);
            }
        }
    };

    // Initial call to set the middle element when the page loads
    updateMiddleElementId();


    // Add a scroll event listener to update the middle element when scrolling
    mainContainer.addEventListener("scroll", () => {
        clearTimeout(timeoutId); // Clear the previous timer
        timeoutId = setTimeout(updateMiddleElementId, 100); // Set a new timer
    });
}

// Call the function to start observing
getMiddleElementId();
