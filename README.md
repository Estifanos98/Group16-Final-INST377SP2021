# The Vault
## Description
Those stuck in COVID may be bored of seeing the same old movies and wonder what movies are currently out there. To address this issue of not knowing what movies exist or to see if there are new movies available, we provide a easy to use resource available to everyone. Our information comes from IMDb from among some of the more popular movies from 2018-2020. 

### Link to Website
https://group16-377.herokuapp.com/index.html

### Target Browsers
iPhone 6/7/8 Plus
Macbook Pro 13/15

### Links
[Developer Manual](https://github.com/Estifanos98/Group16-Final-INST377SP2021#developer-manual)

## Developer Manual
### How to install application and all dependencies

1. Clone this repository through Github Desktop or through Terminal.
2. Open repository in VSCode Terminal or Terminal application.
3. type 'npm install' into terminal window and run.
4. The application should now be set to use.

### How to run application on a server
1. Open repository in VSCode terminal or Terminal application.
2. Run 'npm start'. There should be no errors.
3. In a web browser, go to url: http://localhost:3000/.

### To run tests for software
The are no prewritten tests in the source repository, but you can use Cypress to run your own written tests.

1. Open two terminals and make sure you are in the main project directory
2. In the first terminal, run npm start.
3. In the second terminal run npm test.

### Server application APIs
/api/tv_movie - API route for Movie data.

- GET - Logs to console response query from URL. returns response 'Got a GET request from /api/tv_movie'.
- POST - obtains course name from request body to fetch url. fetch data json from the Movie API and returns a JSON response.
- PUT - returns response 'Got a PUT request at /api'.

/api/custom_movies - custom API query route for Movie data.

- GET - Logs to console response query from URL. returns response 'Got a GET request from /api/custom_movies'.

/api/categories - API route for Category and Genre data.

- GET - Logs to console response query from URL. returns response 'Got a GET request from /api/categories'.
- POST - obtains course name from request body to fetch url. fetch data json from the Category API and returns a JSON response.
- PUT - returns response 'Got a PUT request at /api'.

/api/genre - API route for Genre data.

- GET - Logs to console response query from URL. returns response 'Got a GET request from /api/genre'.
- POST - obtains course name from request body to fetch url. fetch data json from the Genre API and returns a JSON response.
- PUT - returns response 'Got a PUT request at /api'.

## Known Bugs and Future Development
### Bugs:
The checkboxes are not connected to anything.
### Future Development:
Connect functionality between the invididual checkboxwes to the back-end API in order to bring up a custom Front-End Result.
Add in TV show information.
Add in Studio information as an additional constraint.
Add in an updated list for shows and movies released in 2021.
Add in images for all the movies and shows for customers to see.
