const{When,Then,Given} = require('@cucumber/cucumber')
const{expect} = require('@playwright/test')


        
        Given('A login to ECommerce application with {string} and {string}', {timeout:100*1000},async function(username,password)  {
           const loginPage = this.poManager.getLogin()
           await loginPage.goto()
           await loginPage.validLogin(username,password)
        });

        When('Add {string} to Cart', async function (productName) {
            const dashboardPage = this.poManager.getDashboardPage()
            await dashboardPage.searchProductAddCart(productName)
            await dashboardPage.clickCart()
         });

         Then('Verify {string} is displayed in the Cart',async function (productName) {
            const checkoutPage = this.poManager.getCheckOutPage()
            await checkoutPage.validateItemCheckout(productName)
         });

        
         Then('Verify order is present in the OrderHistory', async function () {
           const ordersPage = this.poManager.getOrdersPage()
           await ordersPage.clickOrdersTab()
           await ordersPage.searchOrderClickView(this.orderID)
           await ordersPage.verifyOrderID(this.orderID)
          });

         When('Enter the details {string},{string},{string},{string} and {string} and Place the Order',{timeout:50000},async function(name, cvv, username, country,confirmText){
          const orderPlacePage = this.poManager.getOrderPlacePage()
          const orderConfirmPage = this.poManager.getOrderConfirmationPage()

          await orderPlacePage.fillDetails(name,cvv)
          await orderPlacePage.verifyEmail(username)
          await orderPlacePage.selectCountry(country)
          await orderPlacePage.clickPlaceOrder()

          await orderConfirmPage.verifyConfirmMsg(confirmText)
          this.orderID = await orderConfirmPage.getOrderID()
});

 Given('A login to ECommerce2 application with {string} and {string}', async function (username, password) {
           await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
           console.log(await this.page.title())
           await this.page.locator("[id='username']").fill(username)
           await this.page.locator("[id='password']").fill(password)
           await this.page.locator("input#signInBtn").click()
         });

          Then('Verify Error Message', async function () {
           await this.page.locator("[style*='display: block']").textContent()
           await expect(this.page.locator("[style*='display: none']")).toContainText("Incorrect")
         });


