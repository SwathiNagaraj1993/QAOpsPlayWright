const{expect} = require('@playwright/test')
class OrderConfirmationPage {
    constructor(page) {
        this.page = page
        this.confirmText = page.locator("//*[@class='hero-primary']")
        this.orderID = page.locator("//*[@class='em-spacer-1']/label")
    }

    async verifyConfirmMsg(text) {
        await expect(this.confirmText).toHaveText(text)
    }

    async getOrderID() {
        const orderID = await this.orderID.last().textContent()
        console.log(orderID)
        return orderID
    }
}

module.exports = { OrderConfirmationPage }