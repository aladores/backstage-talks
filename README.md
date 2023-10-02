![Frontend Practice and BackStage Talks Logo](https://github.com/aladores/backstage-talks/blob/main/readme_assets/readme_banner.png)
# **Frontend Practice - Backstage Talks**
**Live Demo:** [Link](https://aladores.github.io/backstage-talks/)

**Challenge from:** [FrontendPractice.com](https://www.frontendpractice.com/projects/backstage-talks)

**Live Original Site:** [BackstageTalks.com](https://backstagetalks.com/)

![Demo Gif](https://github.com/aladores/backstage-talks/blob/main/readme_assets/demo-gif.gif)

## **Built With**
This website was built with just regular **HTML, CSS, and JavaScript**.

Using a framework/library could have been useful in some cases. For example:
- Creating a component for each book section, so I only have to edit each component once.
- Or dynamic conditional rendering to show if a book is in stock.

However, the website is simple since its primarily a single page and does not seem to get updated very often. Only minimal changes to the source code are needed if a new magazine issue is added or if the stock status changes.

**Size difference:** Each magazine Issue image was converted from png to webp format. This significantly results in a lower file size of **529KB** transferred compared to the original **2.7 MB**.

## **How it works**
<details>
<summary> <h3>Intersection Observer</h3> </summary>
  
```javascript
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
```
- For each magazine issue a section is hardcoded with a unique ID in the HTML. With CSS, each section takes up the full height of the viewport.
- In JavaScript, the **Intersection Observer Web API** is used to determine which section is currently visible, specifically when 50 percent or more is visibile in the viewport.
```javascript
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
```
- When a new section becomes visible, these actions occur:
  - The URL's status is updated with section ID.
  - The status of the current issue in the navigation list is changed to active.
  - The background color of the page body is set to the associated ID and color of the current section.
</details>
<details>
<summary> <h3>Desktop View</h3> </summary>
  
Desktop view if the viewport width is over **990px**.
```javascript
function handleScroll(mainContainer, maxLength) {
    if (!wheelEventHandler) {
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
}
```
- **Scroll hijacking**, arrow keys, and anchor links are only available in desktop view.
  - When the user scrolls up or down or presses the up or down arrow keys, the ID of the current issue is read and parsed from the URL.
  - Using the current ID, the next or previous magazine element can be found and tell the browser which section to move too. Because it is a new section the **Intersection Observer** will detect the change, and updates will occur as described above.
  - Anchor links are also utilized to jump from one section to another.
</details>
<details>
<summary> <h3>Mobile View</h3> </summary>
  
![Demo Gif](https://github.com/aladores/backstage-talks/blob/main/readme_assets/mobile-gif.gif)

Mobile view if the viewport width is under or equal to **990px**.
- In the mobile view. The **scroll hijacking** is removed and scrolling returns to default. The navigations links are hidden but no changes to the **Intersection Observer** is made.
- Both views support navigation directly from the url. For example. If the user enters a url "...backstage-talks/#issue-4". The page will automatically scroll to that issue.
</details>

## **Issues**
- **Scrolling**: My scroll hijacking implementation has issues with '**macOS Inertia Scrolling**' (enabled by default), where the trackpad continues to register input even after the force has been applied. To mitigate this issue, I added a **1200ms** delay after any scroll action is received, leading to a less responsive result.
- **Back Event**: Back browser event does not work as expected. The viewport does not scroll to the top of the previous book issue.
