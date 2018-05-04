# cypress-poc
This is POC of Cypress. As of now in this readme file I'll be listing my findings of how cypress solves some of the selenium issues

Command to open cypress

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
