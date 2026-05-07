class DashboardPage{
    constructor(page)
    {
        this.page=page
        this.products = page.locator("//*[@class='card-body']")
        this.cart=page.locator("//*[contains(@routerlink,'cart')]")
        this.productText=page.locator("//*[@class='card-body']//b")
    }

    async searchProductAddCart(productName)
    {
        await this.productText.first().waitFor()
         
            const count = await this.products.count()
        
            for (let i = 0; i < count; i++) {
                if (await this.products.nth(i).locator("//b").textContent() === productName) {
                    await this.products.nth(i).locator("//button[contains(text(),'Add To Cart')]").click()
                    break
                }
            }
        
    }

    async clickCart(){
         await this.cart.click()
    }
}

module.exports={DashboardPage}