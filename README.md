# Interactive Epoch

301 Final Project 
 
Team Name: Team Water Nationcd
Chase McFaddin
Paulo Martin
Zach Hornung

Name of Project: Interactive Epoch

1. Summary of idea
We would like to build an app that will allow users to listen to music that reflects their mood of the day. We will have the user input how their day went, then our neural network AI will determine their mood and suggest a Spotify playlist. Then it grab images from google that reflect that mood as well. The CSS will then add mood lighting and background to the app as well.

What problem or pain point does it solve?

Our app allows our users to sync their mood to a playlist (similar to making a soundtrack for your day). This can also help spread mental health awareness if a user chooses sad music too much. It will also give the user some nice visuals to help amplify the current mood.

MVP:
-   We will ask the user how their day is going
- Our AI will use sentient analysis and generate an appropriate mood
- We will then suggest a Spotify (Spotify API) playlist based on their current mood
- We display images to help amplify the current mood via Google Vision API
- We will dynamically change the background and lighting to help reflect the mood
- Users can save, update, and delete their favorite playlists
- (Fallback plan is to use emojis to determine mood)


We will use the Spotify API to generate playlists
We will use the Google Vision Api to generate images
The app will display your moods and saved mood playlists
Deploy on Heroku.
CSS will alter the background and/or lighting to reflect the current mood

Stretch goals  
Incorporating additional neural networks that communicate with each other

========================================================

Software Requirements: Soundtrack of your Day

Vision:
Our vision of this app that allows users to listen to music that reflects their current mood

What We Are Solving:
Finding the right soundtrack can be difficult, especially as everyday is different from the next. Our app will allow you to tell us how your day is going, then our AI will determine the appropriate mood and suggest a reflective playlist

Why You Should Care:
Whether you’ve had a terrible day or one full of glee, our app takes the headache of finding the right music to fit your mood. Simply let us know how your day is going and we will take care of the rest.

Scope IN
* This app will play music and display images based on the neural network’s determination of the clients mood
* This app will favorite the users most liked playlists saving them for future moods
* This app will allow the deletion from the favorites page

Scope OUT
* This app will not allow users to submit their own playlists
* This app will not allow users to submit their own mood configurations
* This app will not allow users to submit their own mood photos

Minimum Viable Product
MVP will incorporate the Spotify and Google Vision APIs while allowing a neural network of some sort learn their mood based on input and make appropriate decisions. Standard CSS flex box/grid, SQL database with CRUD methods, and EJS templating

Stretch Goals
Potential having multiple neural networks or having one learning/talking to 3 different endpoints

Functionality
1. A user can input how their day went
2. A user can store playlists that they enjoyed
3. A user can view, add and deleted their saved searches.

Data Flow
￼
Non-Functional Requirements
* Usability: This app is intended to be very user friendly and keeps in mind the accessibility standards to make this app as inclusive as possible.
* Compatibility: This app is compatible with Windows and Apple OS as well as in any standard browser.

Overview:

We would like to build an app that will allow us to enjoy our date night by going through D8 Night app and selecting the categories that are important to us based on the selection that is given.
An application for users to help them select from various categories in order to plan out the perfect date night. Users may search between categories of recipes, cocktails, movies, tv shows, workout ideas, nearby events, music playlists, and finding a new book to share.

MVP:
* We would like to have a minimum of 3 APIs to set our categories to choose from
* We will use routes to access the APIs and narrow down the selection within each category
* Our app will then display your results from your categories and save your selections into our SQL database.
* Deploy on Heroku.
* This additional Bare minimum CSS will include a flexbox and grid CSS.
* Bare minimum JS will include building our server, using appropriate dependencies, using routes to access APIs, storing favorite events in SQL will display using ejs.

User Stories: 
As a user I want to visit the AI website to tell the robot about my day so they can determine my mood and output a playlist that reflects that mood.

As a user when I am listening to that playlist I would like a gallery of images to display one at a time reflecting an reinforcing the mood

As a user if I am too sad on the scale there will be a warning displayed to seek mental health professional before using our app again

As a user I want to save, update, and delete music that I find into a favorites page/catalog

1. Create the Neural Network/Robot
As a user, I want the robot to use sentient analysis to determine my mood and suggest appropriate music and images

Feature Tasks
* User input their mood
* Robot determines appropriate mood
* Robot makes music selection based on mood
* Robot displays images based on mood

Acceptance Tests
* GIVEN: When user input their mood
* THEN: Robot determines appropriate mood
* WHEN: User clicks submit to how their day went
* Error message provided if something goes wrong when inputting how their day went

2. Import Spotify Playlist
As a user, I want to a playlist to help reflect my current mood

Feature Tasks
* Input mood
* Have system generate a playlist based on mood
* Save Favorites
* Delete Favorites

Acceptance Tests
* GIVEN: When the user inputs mood
* THEN: The robot will determine the appropriate mood
* WHEN: User clicks submit to save to favorites, it is shown in the database
* Error message provided if something goes wrong when searching/saving/deleting

3. Import images from API
As a user, I want to see images that help reflect my mood

Feature Tasks
* Input mood
* Robot retrieves and displays images to help amplify mood

Acceptance Tests
* GIVEN: When the user inputs mood
* THEN: The robot will determine the appropriate mood
* WHEN: After user inputs mood
* Error message provided if something goes wrong when determining appropriate mood

4. Incorporate SQL DB
As a user, I want to save my favorite playlists

Feature Tasks
* Save playlists
* View Favorites
* Delete Favorites

Acceptance Tests
* GIVEN: When user inputs mood
* THEN: The robot will determine the mood
* WHEN: User clicks submit to save to favorites, it is shown in the database
* Error message provided if something goes wrong when searching/saving/deleting

5. About Us
As a user, I want to learn about the awesome individuals who made this mood and music generator

Feature Tasks
* View names and photos of group members
* Display a short bio of team members

Acceptance Tests
* Navigate to the About us page
* Names, photos, and short bios are properly displayed

# credits/resources
* https://jsfiddle.net/8Lvynxz5/38/
* https://github.com/BrainJS/brain.js/issues/188
* https://github.com/JMPerez/spotify-web-api-js
* https://github.com/JMPerez/passport-spotify 
* https://developer.spotify.com/documentation/
* https://expressjs.com/
* https://www.npmjs.com/package/pg-doc
* https://visionmedia.github.io/superagent/
* https://ejs.co/ 
* https://www.npmjs.com/package/dotenv 


