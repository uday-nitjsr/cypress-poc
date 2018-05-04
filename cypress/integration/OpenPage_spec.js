describe('Opening pages directly',function(){
	beforeEach(function(){
		cy.login("mmanning@smartfunds.com","aaa.111")
	})

	it('Test opening overviewPage', function(){
		cy.visit('https://test.dealvector.com/overview')

		cy.get("#anchorPopUp")
		.should("be.visible")
	})

	it('Test opening dealvector page', function(){
		cy.visit('https://test.dealvector.com/dealcenter')

		cy.get("a.deal_modify_allowed#bulkUploadTrigger")
		.should("have.text","Add Deals")

		cy.get("a.expand_all_series")
		.click({multiple:true})
	})

	it('Test opening messagecenter', function(){
		cy.visit('https://test.dealvector.com/messagecenter')

		cy.get("a[href='/new_query']")
		.should("be.visible")
	})

	it('Open bwic and filter', function(){
		cy.visit('http://test.dealvector.com/bwics#/bwics')

		cy.get('table.bwic_table div.bt-header-col').contains('Numeric Id').parent().parent()
		.click()

		cy.get('div.bwic-filter-drop-down div.filter-values-container span.ng-binding')
		.contains('00084UAG7')
		.parent().parent().children('i')
		.click()
	})
})

describe('try clicking multiple in different tests',function(){
	['00084UAG7','004375DW8'].forEach((event)=>{
		it('clicking on '+event,function(){
			cy.request({
    		method: 'POST',
    		url: 'https://test.dealvector.com/auth/login', // baseUrl is prepended to url
    		form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    		body: {
      			email_id: 'mmanning@smartfunds.com',
      			login_password: 'aaa.111'
    			}
  			}).then((response)=>{
  				expect(response.body).to.have.property('code')
  				})
  			cy.visit('http://test.dealvector.com/bwics#/bwics')
  			cy.get('table.bwic_table div.bt-header-col').contains('Numeric Id').parent().parent()
			.click()

			cy.get('div.bwic-filter-drop-down div.filter-values-container span.ng-binding')
			.contains(event)
			.parent().parent().children('i')
			.click()
  			})
	})
})

describe('clicking on checkbox item', function(){
	beforeEach(function(){

		cy.login("mmanning@smartfunds.com","aaa.111")
	})

	it('on single attempt',function(){
		var ids = ['00084UAG7','004375DW8']
		cy.visit('http://test.dealvector.com/bwics#/bwics')
  			cy.get('table.bwic_table div.bt-header-col').contains('Numeric Id').parent().parent()
			.click()

		ids.forEach(function(event){
			cy.get('div.bwic-filter-drop-down div.filter-values-container span.ng-binding')
			.contains(event)
			.parent().parent().children('i')
			.click()
		})

	})

	it('on single attempt with different logic',function(){
		var ids = [' 00084UAG7',' 004375DW8']
		
		cy.visit('http://test.dealvector.com/bwics#/bwics')
		
		var count=0;
  		cy.get("table.bwic_table div.bt-header-col").each(function($col,index,$list){
  			if($col.text()==="Numeric Id "){
  				cy.wrap($col).click()
  			}	
  		})

  		ids.forEach(function(event){
	  		cy.get('div.bwic-filter-drop-down div.filter-values-container div.ng-scope').each(function($filterVal,index,$list){
  			if($filterVal.text()===event){
  				cy.wrap($filterVal).find("i").click()
  				}
  			})	
  		})
  		
	})
})