# cypress-poc
This is POC of Cypress. As of now in this readme file I'll be listing my findings of how cypress solves some of the selenium issues

Command to open cypress in GUI mode

`./node_modules/.bin/cypress open`

## Cons of using selenium handled by cypress

* Has very simple installation
* Only used for stateless and can not be for async application and for full page refresh
* Can stub data
* Selenium cannot use dev tool when browser are invoked as chromedriver is based on debugger protocol
* Going through stacktrace provided by selenium is not very helpful. To ensure that test failure is genuine you have to manually test the set of step over and over again. Cannot trace step result unless added in reporter log
* Selenium Cannot differentiate with Async call, which is everywhere
* Selenium is stateless http api which means it does not keep a client state on the server hence it cannot predict nor respond changes to your application. It can only verify what is your state looks like in this moment of time

In selenium cross browser automation is a myth. The same set of command may work in one browser but may give illegitimate failure in other browser. That is because different browser are automated differently using their own driver. User has no power over it.

## Cons of Cypress

* Does not support multi browser - Will be releasing Firefox support
* Does not support parallel browser - In their roadmap
* Cannot test scenario which involves new tab


## Command to run cypress
running single spec

`./node_modules/.bin/cypress run --spec ./cypress/integration/conduitExample/login_spec.js --reporter mochawesome`

running headed

`./node_modules/.bin/cypress run --spec ./cypress/integration/conduitExample/login_spec.js --reporter mochawesome --headed`

running on chrome

`./node_modules/.bin/cypress run --spec ./cypress/integration/conduitExample/login_spec.js --reporter mochawesome --browser chrome`


## Demo application details

backend : Node and express
follow the steps for back end setup

`git clone https://github.com/gothinkster/react-redux-realworld-example-app.git`

`npm install`

`npm run dev`

make sure you have your mongodb running on port 27017

frontend : React redux

`https://github.com/gothinkster/react-redux-realworld-example-app.git`

`npm install`

`npm start`

make sure application is using your localbackend therefore go to `/src/agent.js` and change `API_ROOT` to `http:\\localhost:3000`

data is present in Conduit-Data.postman_collection.json import this file to postman and create a global or local variable named apiUrl and save its value as `http://localhost:3000/api`