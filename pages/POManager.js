const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage');
const {CheckOutPage} = require('./CheckOutPage')
const {OrderPlacePage} = require('./OrderPlacePage')
const {OrderConfirmationPage} = require('./OrderConfirmationPage')
const {OrdersPage} = require('./OrdersPage')

class POManager{
    constructor(page)
    {
        this.page=page
        this.loginPage = new LoginPage(page)
        this.dashboardPage = new DashboardPage(page)
        this.checkOutPage = new CheckOutPage(page)
        this.orderPlacePage = new OrderPlacePage(page)
        this.orderConfirmationPage = new OrderConfirmationPage(page)
        this.ordersPage = new OrdersPage(page)
    }

    getLogin()
    {
        return this.loginPage
    }

    getDashboardPage()
    {
        return this.dashboardPage
    }

    getCheckOutPage()
    {
        return this.checkOutPage
    }

    getOrderPlacePage()
    {
        return this.orderPlacePage
    }

    getOrderConfirmationPage()
    {
        return this.orderConfirmationPage
    }

    getOrdersPage()
    {
        return this.ordersPage
    }
}

module.exports={POManager}