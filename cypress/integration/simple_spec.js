describe('My First Test', function() {

	beforeEach(function(){
		cy.visit('https://test.dealvector.com')
	})

  it('Enter details', function() {


    cy.get("#login_password")
    .type("aaa.111")

    cy.get("#login_email_id")
    .type("mmanning@smartfunds.com")
    .should("have.value","mmanning@smartfunds.com")
  })

  it('Login with mmannning', function() {
  	cy.get("#login_password")
    .type("aaa.111")

    cy.get("#login_email_id")
    .type("mmanning@smartfunds.com")

    cy.get("#login_submit")
    .click()

    cy.get("#anchorPopUp")
    .should("be.visible")
  })

  it('DealCenter is opened', function() {
  	cy.get("#login_password")
    .type("aaa.111")

    cy.get("#login_email_id")
    .type("mmanning@smartfunds.com")

    cy.get("#login_submit")
    .click()

  	cy.get("a[href='/dealcenter']")
  	.click()

  	cy.get("a.deal_modify_allowed#bulkUploadTrigger")
  	.should("have.text","Add Deals")
  })

})

// describe('Second Test', function(){
// 	it('assert true', function(){
// 		cy.get("#anchorPopUp")
//     .should("be.visible")
//     .click()

//     cy.get("a[href='/account']")
//     .click()

//     cy.get("li.active-account-tab")
//     .should("have.text","BASIC")
// 	})
// })