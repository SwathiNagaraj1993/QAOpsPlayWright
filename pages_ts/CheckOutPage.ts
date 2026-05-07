import { Locator, Page, test,expect } from "@playwright/test"

export class CheckOutPage {
    page: Page
    itemsList: Locator
    chekoutBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.itemsList = page.locator("//li[contains(@class,'items')]")
        this.chekoutBtn = page.locator("//*[contains(text(),'Checkout')]")
    }

    async validateItemCheckout(productName: string) {
        await this.itemsList.first().waitFor()
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible()
        expect(bool).toBeTruthy()

        await this.chekoutBtn.click()
    }
}

