const {test,expect} = require('@playwright/test')

test("Get By testing",async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Employed").click()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("abc12@")
    await page.getByRole("button",{name:'Submit'}).click()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()

    await page.getByRole("link",{name:'Shop'}).click()
    //using filter and chaining the methods
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click()
});