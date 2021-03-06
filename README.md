#### [Milk Drop](https://milkdrop.herokuapp.com/)

Milk Drop brings underproducing parents and overproducing women together to exchange breast milk.

Milk Drop was created by [Brad Butterfield](https://github.com/butters5789), [Cooper Heinrichs](https://github.com/cheinrichs), [Mike Ferger](https://github.com/MFerger), and [Phil Skaggs](https://github.com/artnoisenik).

###### Installing locally:
* Download
* Run 'npm install' in your terminal
* Type 'createdb YOUR_LOCAL_DATABASE' in terminal.
* Run 'knex migrate:latest' to create tables in your database then 'knex seed:run' to seed the tables with example data.
* Create a Facebook App
* Create a .env file
* Fill the .env file with the following code. Placing your information where appropriate.

```
DATABASE_URL=postgresql://localhost/YOUR_LOCAL_DATABASE
SECRET=YOUR_COOKIEPARSER_SECRET
CLIENT_ID=FACEBOOK_CLIENT_ID
CLIENT_SECRET=FACEBOOK_CLIENT_SECRET
```

* In app.js you'll need to replace the callback URL in the Facebook strategy to allow Facebook signup. The local URL should match whatever your local server will run on.
```
callbackURL: 'YOUR_LOCAL_URL(ex:http://localhost:3000/)',
```
* This callback URL will need to be set in you Facebook app as well.

###### Installing remotely:
* Set up a heroku account
* Run through heroku set up [here](https://devcenter.heroku.com/articles/git)
* In the terminal 'heroku run knex migrate:latest' to create tables then 'heroku run knex seed:run' to populate tables with example data.
* Alternatively, if you wish to reproduce your local database exactly, you can use ['heroku pg:push'](https://devcenter.heroku.com/articles/heroku-postgresql#pg-push-and-pg-pull)
* In app.js you'll need to replace the callback URL in the Facebook strategy to allow Facebook signup. The remote URL should match whatever your heroku app URL is.
```
callbackURL: 'YOUR_REMOTE_URL(ex:https://milkdrop.herokuapp.com/)',
```
* This callback URL will need to be set in you Facebook app as well.
