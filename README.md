# realestate-crm
A CRM desktop app for managing customer info

### Development
1. When first clone repository, install all missing packages
> `npm install`
2. Set up the sqlite3 db file
> `npx knex migrate:latest`
3. Run Electron for development
> `npm run electron:serve
4. Run Electron for building deployable file
> `npm run electron:build (--publish)
