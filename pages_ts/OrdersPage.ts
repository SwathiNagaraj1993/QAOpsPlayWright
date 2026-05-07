import{Page,Locator,test,expect} from '@playwright/test'

export class OrdersPage {
    page:Page
    ordersButton:Locator
    orderRows:Locator
    obtdOrderID:Locator

    constructor(page:Page) {
        this.page = page
        this.ordersButton = page.locator("//button[contains(@routerlink,'myorders')]")
        this.orderRows = page.locator("//tbody/tr")
        this.obtdOrderID = page.locator("//*[@class='col-text -main']")
    }

    async clickOrdersTab() {
        await this.ordersButton.click()
    }

    async searchOrderClickView(orderID:any) {
        await this.page.locator("//tbody").waitFor()

        const rows = await this.orderRows
        const rowcount = await rows.count()

        for (let i = 0; i < rowcount; i++) {
            if (orderID.includes(await rows.nth(i).locator("//th").textContent())) {
                await rows.nth(i).locator("//button").first().click()
                break
            }
        }
    }

    async verifyOrderID(orderID:any) {
        const orderIDObtd= await this.obtdOrderID.textContent()
        await expect(orderID.includes(orderIDObtd)).toBeTruthy()
    }
}

module.exports = { OrdersPage }