# CS61 Final Project: California Housing Prices Database
## Sofia Jayaswal and Paige Harris

For Milestone 4 to enhance our database, we both did a client interface ([link here](https://cs61-final-frontend.onrender.com/)) and data visualizations—look at our [wiki](https://github.com/sofiapjayaswal/cs61_final/wiki).
The client interface has both a frontend and backend. The frontend is built using create-react-app (see readme under frontend folder for further information). The backend is built using 
an Express.js, babel, eslint package which I took from COSC052, a course I took in the Spring. The frontend has three pages: home, visualizations, and explore/query. Visualizations features graphs 
made using our database and explanation of findings (which are also on our wiki). Explore/query allows users to query the database based on two filters — location and data attributes — and visualize
results on an interactive Google Map where they can press on markers to see data on the specific latitude and longitude. This map is built using the package [@react-google-maps/api](https://www.google.com/search?q=%40react-google-maps%2Fapi&rlz=1C5CHFA_enUS988US988&oq=%40react-google-maps%2Fapi&aqs=chrome.0.69i59l3j69i60l2j69i58j69i65l2.221j0j7&sourceid=chrome&ie=UTF-8) and 
a Google Maps API key. The way the frontend and backend interact with each other is that when a user submits a query, the frontend makes a call to the backend API using axios and passing parameters
for what location and data the user wants to view. Then the backend creates an SSH tunnel in order to then create a connection to the mySQL database instance we are hosting on AWS. Then the query results get sent back
to the frontend and displayed to the user. Below is a demonstration of using the query page. 
