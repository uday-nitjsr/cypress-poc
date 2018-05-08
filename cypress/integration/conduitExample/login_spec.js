describe('This is to test login functionality', function(){
	it("verify all gui element are present", function(){
		cy.visit("/login")

		cy.get("a.navbar-brand")
		.should("have.text","conduit")
		.should("be.visible")
		.should("have.attr","href")

		cy.get("h1.text-xs-center")
		.should("have.text","Sign In")
		.should("be.visible")

		cy.get("p.text-xs-center")
		.should("have.text","Need an account?")

		cy.get("input[type='email']")
		.should("be.visible")

		cy.get("input[type='password']")
		.should("be.visible")

		cy.get("button[type='submit']")
		.should("be.visible")
		.should("have.text","Sign in")
	})

	it("verify error on blank",function(){
		cy.visit("/login")

		cy.get("button[type='submit']")
		.click()

		cy.get("ul.error-messages")
		.should("have.text","email can't be blank")
	})

	it("verify error on incorrect cred",function(){
		cy.visit("/login")

		cy.get("input[type='email']")
		.type("email@email.com")

		cy.get("input[type='password']")
		.type("password")

		cy.get("button[type='submit']")
		.click()

		cy.get("ul.error-messages")
		.should("have.text","email or password is invalid")
	})

	it("verify headers",function(){
		cy.visit("/login")

		cy.get("a.nav-link")
		.contains("Sign up")
		.should("have.attr","href","/register")
		.click()
		.url()
		.should("eq","http://localhost:4100/register")

		cy.get("a.nav-link")
		.contains("Sign in")
		.should("have.attr","href","/login")
		.click()
		.url()
		.should("eq","http://localhost:4100/login")

		cy.get("a.nav-link")
		.contains("Home")
		.should("have.attr","href","/")
		.click()
		.url()
		.should("eq","http://localhost:4100/")
	})

	it("verify text retains in register",function(){
		cy.visit("/login")

		cy.get("input[type='email']")
		.type("email@email.com")

		cy.get("a.nav-link")
		.contains("Sign up")
		.click()

		cy.get("input[type='email']")
		.should("have.attr","value","email@email.com")
	})

	it("verify need account", function(){
		cy.visit("/login")

		cy.get("input[type='email']")
		.type("email@email.com")

		cy.get("p.text-xs-center")
		.click()

		cy.get("input[type='email']")
		.should("have.attr","value","email@email.com")
	})

	it("verify valid login",function(){
		cy.server()
		cy.route("POST","http://localhost:3000/api/users/login",{user:{username:"jacob",email:"jake@jake.jake",token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjAyOGMzMzUwYTJhYTgyMzliNjJhNiIsInVzZXJuYW1lIjoiamFjb2IiLCJleHAiOjE1MzA5Njk4MzEsImlhdCI6MTUyNTc4NTgzMX0.8uo87tY4329DAnr6B41JvszKjtlIlCS9bFtpWVzcxJ8"}})
		.as("loginUser")

		cy.visit("/login")

		cy.get("input[type='email']")
		.type("jake@jake.jake")

		cy.get("input[type='password']")
		.type("jakejake")

		cy.get("button[type='submit']")
		.click()
		.wait("@loginUser")

		// cy.wait(1000)

		cy.get("ul.navbar-nav a.nav-link")
		.contains("jacob")
	})
})