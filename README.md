# Story Feature

    This project implements a story feature similar to those found in popular social media platforms. It allows users to upload images, view them as stories, and have them expire after 24 hours.

    ## Features

    -   **Add Story:** Users can add a new story by clicking the "+" button. This will open a file dialog to select an image.
    -   **Story Display:** Stories are displayed in a horizontal list at the top of the screen.
    -   **Story Viewer:** Clicking on a story will open a full-screen viewer.
    -   **Progress Bar:** Each story has a progress bar at the top that fills up in 3 seconds.
    -   **Story Navigation:** Users can navigate through stories by clicking on the left or right side of the screen or by swiping.
    -   **Story Expiration:** Stories expire after 24 hours.
    -   **Local Storage:** Stories are stored in local storage.
    -   **Pause on Mouse Down:** Story progress is paused when the mouse is down and resumes when the mouse is up or leaves the story viewer.

    ## Technologies Used

    -   React
    -   Vite
    -   react-swipeable

    ## How to Run

    1.  Clone the repository.
    2.  Run `npm install` to install dependencies.
    3.  Run `npm run dev` to start the development server.
    4.  Open the provided local server URL in your browser.

    ## Notes

    -   The project is client-side only.
    -   Images are converted to base64 and stored in local storage.
    -   The project is responsive.
