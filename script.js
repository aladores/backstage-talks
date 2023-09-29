window.addEventListener("DOMContentLoaded", () => {
    moveToDefaultPosition();
    moveIssue();
    moveIssueLinks();
});

function moveToDefaultPosition() {
    window.scrollTo(0, 0);
}
// function moveIssue() {
//     const mainContainer = document.querySelector(".main-container");
//     const books = document.querySelectorAll(".book-wrapper");

//     let timeoutId;
//     const updateMiddleElementId = () => {
//         const viewportHeight = window.innerHeight;
//         const middleViewportPosition = viewportHeight / 2;

//         let middleElementId = null;

//         books.forEach(book => {
//             const elementTop = book.getBoundingClientRect().top;
//             const elementBottom = book.getBoundingClientRect().bottom;

//             if (elementTop < middleViewportPosition && elementBottom > middleViewportPosition) {
//                 middleElementId = book.id.slice(book.id.length - 1);
//             }
//         });

//         if (middleElementId) {
//             const newHash = `#issue-${middleElementId}`;
//             if (window.location.hash !== newHash) {
//                 history.replaceState(null, null, newHash);
//                 changeColorBackground(middleElementId);
//             }
//         }
//     };

//     // Initial call to set the middle element when the page loads
//     updateMiddleElementId();

//     // Add a scroll event listener to update the middle element when scrolling
//     mainContainer.addEventListener("scroll", () => {
//         clearTimeout(timeoutId); // Clear the previous timer
//         timeoutId = setTimeout(updateMiddleElementId, 100); // Set a new timer
//     });
// }


function moveIssue() {
    const scrollContainer = document.querySelector(".main-container");
    const scrollItems = document.querySelectorAll(".book-wrapper");
    const scrollItemsReverse = Array.from(scrollItems).reverse();
    let currentIndex = scrollItemsReverse.length;
    console.log(currentIndex);
    let isScrolling = false;

    scrollContainer.addEventListener("wheel", function (event) {
        event.preventDefault(); // Prevent the default scroll behavior

        if (!isScrolling) {
            isScrolling = true;
            if (event.deltaY > 0 && currentIndex > 1) {
                currentIndex--;
            } else if (event.deltaY < 0 && currentIndex < scrollItemsReverse.length) {
                currentIndex++;
            }

            changeColorBackground(currentIndex);
            scrollItemsReverse[currentIndex - 1].scrollIntoView({ behavior: "smooth" });

            setTimeout(function () {
                isScrolling = false;
            }, 300);
        }
    });
};
function moveIssueLinks() {
    const issueLinks = document.querySelectorAll(".issue-list a");
    // Add click event listeners to each link
    issueLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default link behavior

            const targetId = link.getAttribute("href").substring(1); // Get the target section's ID
            const targetSection = document.getElementById(targetId); // Get the target section
            changeColorBackground(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" }); // Scroll to the target section smoothly
            }
        });
    });
}

function changeColorBackground(id) {
    switch (parseInt(id)) {

        case 1:
            document.body.style.backgroundColor = "#e30512";
            break;
        case 2:
            document.body.style.backgroundColor = "#1d3fbb";
            break;
        case 3:
            document.body.style.backgroundColor = "#ffbe00";
            break;
        case 4:
            document.body.style.backgroundColor = "#ff651a";
            break;
        case 5:
            document.body.style.backgroundColor = "#00c1b5";
            break;
        case 6:
            document.body.style.backgroundColor = "#fff";
            break;
        case 7:
            document.body.style.backgroundColor = "#FF608C";
            break;

    }
}

