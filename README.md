# WhereCanWeGo

## Development Setup

First, clone this GitHub repository.
<br>
After cloning, run
```
npm install
```
in the root of the cloned directory.

Then, run 
```
node scripts/generateConfigFiles.js
```
to generate the `.env.local` file to set database environment variables.

After `.env.local` is generated, fill the following environment variables in the `.env.local` file according to the schema below:
- MONGODB_URI &mdash; MongoDB URI (probably `mongodb://localhost:27017` if running MongoDB locally, or the URI obtained from `Connect` → `Connect your application` if using MongoDB Atlas &mdash; if using Atlas, remember to replace the `<password>` portion with the correct Atlas cluster password)
- MONGODB_DB &mdash; Database name for this project

Finally, run

```
npm run dev
```

to start the development server and begin developing!

## Production Setup
Configure the corresponding environment variables in the deployment container:
- MONGODB_URI &mdash; MongoDB URI (the URI obtained from `Connect` → `Connect your application` if using MongoDB Atlas &mdash; if using Atlas, remember to replace the `<password>` portion with the correct Atlas cluster password)
- MONGODB_DB &mdash; Database name for this project