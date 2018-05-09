describe("This is to home page when logged in",function(){
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

	it("verify feeds header",function(){
		cy.visit("/")

		cy.get("ul.nav-pills a.nav-link")
		.contains("Your Feed")
		.should("be.visible")
		.should("have.class","active")

		cy.get("ul.nav-pills a.nav-link")
		.contains("Global Feed")
		.should("be.visible")
	})

	it("verify sidebar labels",function(){
		cy.visit("/")

		cy.get("div.sidebar>p")
		.should("have.text","Popular Tags")
		.should("be.visible")
	})

	it("verify all tags are present",function(){
		var allTags
		cy.request("http://localhost:3000/api/tags")
		.then((response)=>{
			allTags = response.body.tags
		})
		cy.visit("/")

		cy.get("div.tag-list>a")
		.each(function($ele,index){
			cy.wrap($ele)
			.should("have.text",allTags[index])
		})
	})

	it("verify articles on Global feeds",function(){
		var allArticles
		cy.request("http://localhost:3000/api/articles?limit=10&offset=0")
		.then((response)=>{
			allArticles = response.body.articles		
		})

		cy.visit("/")

		cy.get("ul.nav-pills a.nav-link")
		.contains("Global Feed")
		.click()
		.should("have.class","active")

		cy.get("div.article-preview")
		.should("be.visible")
		.each(function($ele,index){
			cy.wrap($ele)
			.find("a.preview-link>h1")
			.should("be.visible")
			.should("have.text",allArticles[index].title)
			
			cy.wrap($ele)
			.find("a.preview-link")
			.should("have.attr","href","/article/"+allArticles[index].slug)

			cy.wrap($ele)
			.find("a")
		})
	})
})