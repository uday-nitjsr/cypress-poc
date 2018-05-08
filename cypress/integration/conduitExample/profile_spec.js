describe("This is to test profile",function(){
	beforeEach(function(){
		cy.loginConduit("jake@jake.jake","jakejake")
	})
	it("check profile page",function(){
		cy.visit("/")

		cy.get("ul.nav-pills a.nav-link")
		.should("be.visible")

		cy.get("ul.navbar-nav a.nav-link")
		.contains("jacob")
	})

	// it("check ")
})