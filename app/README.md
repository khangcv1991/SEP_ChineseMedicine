# This is a ReadMe file

## How to start the app with environment variables from Terminal

<pre>$ MY_MONGOLAB_URI='mongodb://localhost:27017/timeclock' node app.js

## Deploy app to Heroku

`$ git push heroku master`

Test using this Url
https://quiet-castle-93279.herokuapp.com

Ensure that at least one instance of the app is running
`heroku ps:scale web=1`
