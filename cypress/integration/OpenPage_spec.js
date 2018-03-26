describe('Opening pages directly',function(){
	beforeEach(function(){

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

describe('try clicking multiple',function(){
	['00084UAG7','004375DW8'].forEach((event)=>{
		it('clickin twice on '+event,function(){
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
	it('on single attempt',function(){
		cy.request({
			method:'POST',
			url:'https://test.dealvector.com/auth/login',
			form:true,
			body:{
				email_id:'mmanning@smartfunds.com',
				login_password:'aaa.111'
			}
		})
	})
})