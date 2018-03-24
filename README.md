#### The below project has 2 apps

----app1 (mobile)
----app2 (web)
----(redux) which is shared for both of both & web 

Both web and mobile share the redux store 

### Since we are sharing redux store between mobile and web we have created redux-store as node_modules
------------------------------------------------------------------------------------------------------

For running web & mobile use `sh start.sh` & then install the dependencies in the respective folder

### The start.sh file links the redux-store and is used as node_modules in web & mobile

### Features:

- Used create react app for web
- Link to common store
- Call github Api
- Search github information repo for input github username
- Have a table generated view
- Pagination


### Used create react native app for mobile 
- Link to common store
- Call github Api
- Search github information repo for input github username
- Have a date generated in frontend using `<FlatList/>` View (without design)

### Bonus:
- Used eslint 

To start the web & mobile server use `npm start`





