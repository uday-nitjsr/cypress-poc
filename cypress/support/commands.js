// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login",(emailId,password)=>{
  cy.log('using login credentials username:'+emailId+' and password:'+password)
	cy.request({
    		method: 'POST',
    		url: 'https://test.dealvector.com/auth/login', // baseUrl is prepended to url
    		form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    		body: {
      			email_id: emailId,
      			login_password: password
    		}
  		}).then((response)=>{
  			console.log(response)
  			// window.localStorage.setItem("jwt",response.body.)
  		})
})

Cypress.Commands.add("loginConduit",(emailId,password)=>{
  cy.log('using login credentials username:'+emailId+' and password:'+password)
  cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/users/login', // baseUrl is prepended to url
        form: false, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        body: {
            user:{
              email:emailId,
              password:password
            }
        }
      }).then((response)=>{
        console.log(response)
        window.localStorage.setItem("jwt",response.body.user.token)
      })
})