![Frontend Practice and BackStage Talks Logo](https://github.com/aladores/backstage-talks/blob/main/readme_assets/readme_banner.png)
# Backstage Talks - Frontend Pratice 
Live Demo: [Link](https://aladores.github.io/backstage-talks/)

Challenge from: [FrontendPractice.com](https://www.frontendpractice.com/projects/backstage-talks)

Live Original Site: [BackstageTalks.com](https://backstagetalks.com/) 

![Demo Gif](https://github.com/aladores/backstage-talks/blob/main/readme_assets/demo-gif.gif)

## Built With
This website was built with just regular HTML, CSS, and JavaScript. 

Using a framework/library could have been useful in some cases. For example: 
- Creating a component for each book section, so I only have to edit each component once.
- Or dynamic conditional rendering to show if a book is in stock.

However, the website is simple since its primarily a single page and does not seem to get updated very often. Only minimal changes to the source code are needed if a new magazine issue is added or if the stock status changes.

## How it works 
- For each magazine issue a section is hardcoded a unique ID in the HTML. With CSS, each section takes up the full height of the viewport. 
- In JavaScript, the Intersection Observer Web API is used to determine which section is currently visible, specifically when 50 percent or more is visibile in the viewport.
- When a new section becomes visible, these actions occur: 
  - The URL's status is updated with section ID.
  - The status of the current issue in the navigation list is changed to active.
  - The background color of the page body is set to the associated ID and color of the current section.
- There are two available views and use cases: Mobile if the viewport width is under 990px and Desktop if the width is over 990px.
- In the desktop view, the following features are exclusively used for navigating between pages: scroll hijacking, arrow keys, and anchor links.
  - When the user scrolls up or down or presses the up or down arrow keys, the ID of the current issue is read and parsed from the URL.
  - Using the current ID, the next or previous magazine element can be found and tell the browser which section to move too. Because it is a new section the Intersection Observer will detect the change, and updates will occur as described above.
  - Anchor links are also utilized to jump from one section to another.
- In the movile view. The custom scroll hijacking is disabled and scrolling returns to default. The navigations links are hidden but no changes to the Intersection Observer is made.
- Both views support navigation directly from the url. For example. If the user enters "...backstage-talks/#issue-4". The page will automatically scroll to that issue.
