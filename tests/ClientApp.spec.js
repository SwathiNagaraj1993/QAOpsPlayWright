const {test,expect}=require('@playwright/test')

test("Assignment playwright test",async({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    const email = page.locator("//*[@id='userEmail']")
    const password = page.locator("#userPassword")
    const login = page.locator("#login")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title())

    await email.fill("swathi.n2@gmail.com")
    await password.fill("Swathi@123")
    await login.click()
    //await page.waitForLoadState()
    await page.locator("//*[contains(@style,'text-transform')]/b").first().waitFor()
    console.log(await page.locator("//*[contains(@style,'text-transform')]/b").allTextContents())
});