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
- GOOGLE_CLIENT_ID &mdash; Client ID obtained from the Google API Console (see https://developers.google.com/identity/protocols/oauth2 for instructions)
- GOOGLE_CLIENT_SECRET &mdash; Client secret obtained from the Google API Console

Finally, run

```
npm run dev
```

to start the development server and begin developing!

## Production Setup
Configure the corresponding environment variables in the deployment container:
- MONGODB_URI &mdash; MongoDB URI (the URI obtained from `Connect` → `Connect your application` if using MongoDB Atlas &mdash; if using Atlas, remember to replace the `<password>` portion with the correct Atlas cluster password)
- MONGODB_DB &mdash; Database name for this project
- GOOGLE_CLIENT_ID &mdash; Client ID obtained from the Google API Console (see https://developers.google.com/identity/protocols/oauth2 for instructions)
- GOOGLE_CLIENT_SECRET &mdash; Client secret obtained from the Google API Console
- NEXTAUTH_SECRET &mdash; UUID or similar string that acts as a secret for auth encryption; can be generated using https://generate-secret.vercel.app/32