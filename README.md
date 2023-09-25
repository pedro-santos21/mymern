# MYMERN TEMPLATE
### Author: Pedro Henrique Rincon Santos

This is the best "MERN + vite + typescript" template ever created.

Everything that you need plus a sweet database config file.

#### Setup

1. Install the dependencies (go to /server/ and run "npm install")
2. Setup the .env file (instructions below)
3. Code away

##### .env file setup
1. Create a file named .env inside /server/
2. Paste this and configure it (DETAILED INSTRUCTIONS INSIDE /server/src/config/database.ts)

```
# Database
STAGE='DEV'
MONGODB_KEY_DEV= <your development database string> (example: mongodb://<user>:<password>@localhost:27017/database_name)
MONGODB_KEY_PROD= <your production database string>

# Express
PORT=3000
```

*No need to thank me. Actually, yes, you do need to.*
