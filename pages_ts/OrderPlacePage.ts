import {Page,Locator,test,expect} from '@playwright/test'

export class OrderPlacePage {
    page:Page
    nameOnCard:Locator
    CVVNumber:Locator
    shippingEmail:Locator
    selectCountryDropdown:Locator
    dropdownResults:Locator
    optionsText:Locator
    placeOrderBtn:Locator

    constructor(page:Page) {
        this.page = page
        this.nameOnCard = page.locator("//*[contains(text(),'Name on Card')]/..//input")
        this.CVVNumber = page.locator("//*[contains(text(),'CVV')]/..//input")
        this.shippingEmail = page.locator("//*[contains(@class,'user__name')]/label")
        this.selectCountryDropdown = page.locator("//*[@placeholder='Select Country']")
        this.dropdownResults = page.locator("//section[contains(@class,'ta-results')]")
        this.optionsText = page.locator("//section[contains(@class,'ta-results')]/button")
        this.placeOrderBtn = page.locator("//*[contains(@class,'action__submit')]")
    }

    async fillDetails(name:string,cvv:string) {
        await this.nameOnCard.fill("Swathi N")
        await this.CVVNumber.fill("123")
    }

    async verifyEmail(emailID:string)
    {
        await expect(this.shippingEmail).toHaveText(emailID)
    }

    async selectCountry(country:string)
    {
        await this.selectCountryDropdown.pressSequentially("ind", { delay: 150 })
        
            await this.dropdownResults.waitFor()
        
            const options = await this.optionsText
            const optionsCount = await options.count()
        
            for (let i = 0; i < optionsCount; i++) {
                if (await options.locator("//span").nth(i).textContent() === country) {
                    await options.locator("//span").nth(i).click()
                    break
                }
            }
        
    }

    async clickPlaceOrder()
    {
        await this.placeOrderBtn.click()
    }
}

