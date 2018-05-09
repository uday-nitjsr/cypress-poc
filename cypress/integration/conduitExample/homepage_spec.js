describe("This is to test profile",function(){
	beforeEach(function(){
		cy.loginConduit("jake@jake.jake","jakejake")
	})

	it("verify headers",function(){
		cy.visit("/")

		cy.get("ul.nav-pills a.nav-link")
		.should("be.visible")

		cy.get("ul.navbar-nav a.nav-link")
		.contains("jacob")
		.should("have.attr","href","/@johnjacob")
		.click()
		.then(function(){
			cy.url()
			.should("eq","http://localhost:4100/@johnjacob")
		})

		cy.get("ul.navbar-nav a.nav-link")
		.contains("Home")
		.should("have.attr","href","/")
		.click()
		.then(function(){
			cy.url()
			.should("eq","http://localhost:4100/")
		})

		cy.get("ul.navbar-nav a.nav-link")
		.contains("New Post")
		.should("have.attr","href","/editor")
		.click()
		.then(function(){
			cy.url()
			.should("eq","http://localhost:4100/editor")
		})

		cy.get("ul.navbar-nav a.nav-link")
		.contains("Setting")
		.should("have.attr","href","/settings")
		.click()
		.then(function(){
			cy.url()
			.should("eq","http://localhost:4100/settings")
		})
	})
})