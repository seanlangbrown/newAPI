# newsAPI

##About
API for news headlines

Article headlines and content can be retrieved from a postrgres database

Article data is from Kaggle: https://www.kaggle.com/snapcrack/all-the-news/downloads/articles1.csv/4

##Usage
'/' responds with the 10 most recent headlines in the database:
`{
	id,
	title,
	publication,
	author,
	day,
	month,
	year,
}`


##Installation

Setup:
1) Seed postgres database
  - first save https://www.kaggle.com/snapcrack/all-the-news/downloads/articles1.csv/4
  `psql -d postgres -a -f seedNewsAPI.sql`


2) `npm install`

3) `npm test`

4) `npm start`


##Future Work

- Research open handles at end of jest tests, most likely caused by improper end() of node-postgres connections.  I've done some research, but have not found a solution yet.

- Add a /create path for uploading new articles to the database
	This would used postgres create to add to the articles table

- Add authentication/authorization with https://github.com/microauth/microauth-google.  May require adding a users table to postgres with user preferences

- Add a /search path to filter by search criteria

- Add a /subscribe path to create a custom user feed for search criteria.  Requires adding a feeds table to postgres with criteria