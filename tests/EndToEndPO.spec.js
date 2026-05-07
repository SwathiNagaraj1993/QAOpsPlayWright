const { test, expect } = require('@playwright/test');
const {POManager} = require('../pages/POManager')
const dataset = JSON.parse(JSON.stringify(require('../Utils/placeholderTestData.json')))
const {customTest} = require('../Utils/test-base');
const { OrdersPage } = require('../pages/OrdersPage');

for(const data of dataset){
test(`Validation for product ${data.productName}`, async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
   

    const poManager = new POManager(page)
    const loginPage = poManager.getLogin()
    const dashboardPage = poManager.getDashboardPage()
    const checkoutPage = poManager.getCheckOutPage()
    const orderPlacePage = poManager.getOrderPlacePage()
    const orderConfirmPage = poManager.getOrderConfirmationPage()
    const ordersPage = poManager.getOrdersPage()

    await loginPage.goto()
    await loginPage.validLogin(data.username,data.password)

    await dashboardPage.searchProductAddCart(data.productName)
    await dashboardPage.clickCart()
    
    await checkoutPage.validateItemCheckout(data.productName)
    
    await orderPlacePage.fillDetails(data.name,data.CVV)
    await orderPlacePage.verifyEmail(data.username)
    await orderPlacePage.selectCountry(data.country)
    await orderPlacePage.clickPlaceOrder()
    
    await orderConfirmPage.confirmText(data.confirmText)
    const orderID = await orderConfirmPage.getOrderID()

    await ordersPage.clickOrdersTab()
    await ordersPage.searchOrderClickView(orderID)
    await ordersPage.verifyOrderID(orderID)

});
}

customTest.only('Validate Login and Checkout',async({page,testDataForOrder})=>
{
    const poManager = new POManager(page)
    const loginPage = poManager.getLogin()
    const dashboardPage = poManager.getDashboardPage()
    const checkoutPage = poManager.getCheckOutPage()
    await loginPage.goto()
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password)

    await dashboardPage.searchProductAddCart(testDataForOrder.productName)
    await dashboardPage.clickCart()
    
    await checkoutPage.validateItemCheckout(testDataForOrder.productName)
    
})