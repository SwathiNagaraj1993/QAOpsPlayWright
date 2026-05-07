import { LoginPage } from "./LoginPage";
import {CheckOutPage} from "./CheckOutPage"
import { DashboardPage } from "./DashboardPage";
import { OrderPlacePage } from "./OrderPlacePage";
import { OrderConfirmationPage } from "./OrderConfirmationPage";
import {OrdersPage} from "./OrdersPage"
import {Page} from "@playwright/test"

export class POManager{
    page:Page
    loginPage:LoginPage
    dashboardPage:DashboardPage
    checkOutPage:CheckOutPage
    orderPlacePage:OrderPlacePage
    orderConfirmationPage:OrderConfirmationPage
    ordersPage:OrdersPage
    
    constructor(page:Page)
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

