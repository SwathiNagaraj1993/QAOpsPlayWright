const{expect} = require('@playwright/test')
class CheckOutPage{
    constructor(page)
    {
        this.page=page
        this.itemsList=page.locator("//li[contains(@class,'items')]")
        this.chekoutBtn=page.locator("//*[contains(text(),'Checkout')]")
    }

    async validateItemCheckout(productName)
    {
        await this.itemsList.first().waitFor()
            const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible()
            expect(bool).toBeTruthy()
        
            await this.chekoutBtn.click()
    }
}

module.exports={CheckOutPage}