import {Page,Locator,test,expect} from '@playwright/test'

export class OrderConfirmationPage {
    page:Page
    confirmText:Locator
    orderID:Locator
    constructor(page:Page) {
        this.page = page
        this.confirmText = page.locator("//*[@class='hero-primary']")
        this.orderID = page.locator("//*[@class='em-spacer-1']/label")
    }

    async verifyConfirmMsg(text:string) {
        await expect(this.confirmText).toHaveText(text)
    }

    async getOrderID() {
        const orderID = await this.orderID.last().textContent()
        console.log(orderID)
        return orderID
    }
}
