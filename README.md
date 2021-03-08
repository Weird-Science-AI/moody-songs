# moody-songs

301 Final Project 
 
Team Name: Team Water Nation
Chase McFaddin
James Shreckengost
Paulo Martin
Zach Hornung
 
Prep #1
Communication Plan-
Set for 20 minutes at the beginning of our meeting and toward the end of our meeting for important topics .- If anyone has different idea we will be respectfully listen and provide feed back and allow everyone to speak- Keep notifications for Slack ON!
- If not present, present members will carry on daily tasks and will inform the missing member via Text and Slack.
Conflict Plan1. Address Conflicts- Have a possible solution so that we can address the problem in an efficient and timely manner.- Conflicts will be discussed and voted on for further advancement.
 
2. Go around the table for ideas to resolve conflicts. If conflict is beyond our knowledge or voting ends in a stalemate, a TA or Nicholas will be contacted for advice.
 
3. No-shows    
- Absentee must inform other team members on their absence.   
 - If absentee continues to be late/absent without notice, tasks will be divided between remaining members.
4. Group meeting will continue to perform as usual. Missing member will be informed via Text and Slack and will be expected to complete their tasks on time.
Work Plan
1. Split up major tasks evenly   
 - Talk about the current status of our tasks at the beginning and ending of our meeting.
2. When you are finished with your task.   
 - Inform teammates    
- Pick up another task OR help a teammate on their major task
 
Git Process
* One group member will make the master branch repo, then we will make a “dev” branch where each group person branches off that. Everyone handles PRs together. One PR per scheduled work night minimum. Merge Dev to main daily. We then push to the dev branch with 1 pier review required and set a 3 person permission limit to push to main.
 
Selfcare
Any thing else you feel is important: expectations around work times, stand-up times(outside of the ones schedule with the instructional team), taking breaks/seeking help when you’re stuck, etc.


=========================================================


Prep #2

Name of Project: ??? Soundtrack of your day ??? Working Title

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

----------README-----------------

Soundtrack to your Day

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