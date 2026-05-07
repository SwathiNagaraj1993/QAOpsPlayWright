const {test,expect,request}=require('@playwright/test')
let webContext
test.beforeAll(async({browser})=>{
    
   
    const context = await browser.newContext()
    const page = await context.newPage()

   
    await page.locator("//*[@id='userEmail']").fill("swathi.n2@gmail.com")
    await page.locator("#userPassword").fill("Swathi@123")
    await page.locator("#login").click()
    
    await page.waitForLoadState('networkidle')
    await context.storageState({'path':'state.json'})
    webContext = await browser.newContext({'storageState':'state.json'})


})
test("End to End",async()=>{
    
    const emailID='swathi.n2@gmail.com'
    const productName = "ZARA COAT 3"
    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    const products = await page.locator("//*[@class='card-body']")
    await page.locator("//*[@class='card-body']//b").first().waitFor()

    const count = await products.count()

    for(let i=0;i<count;i++)
    {
        if(await products.nth(i).locator("//b").textContent() === productName)
        {
            await products.nth(i).locator("//*[contains(text(),'Add To Cart')]").click()
            break
        }
    }

    await page.locator("//*[contains(@routerlink,'cart')]").click()
    await page.locator("//li[contains(@class,'items')]").first().waitFor()
    const bool = await page.locator("h3:has-text('"+productName+"')").isVisible()
    expect(bool).toBeTruthy()

    await page.locator("//*[contains(text(),'Checkout')]").click()
    await page.locator("//*[@placeholder='Select Country']").pressSequentially("ind", { delay: 150 }) 
    await page.locator("//section[contains(@class,'ta-results')]").waitFor()

    const options =  await page.locator("//section[contains(@class,'ta-results')]/button")
    const countOfOptions = await options.count()
    console.log("Count of Options: "+countOfOptions)
    
    for(let i=0;i<countOfOptions;i++)
    {
        if(await options.locator("//span").nth(i).textContent() === " India")
        {
            await options.locator("//span").nth(i).click()
            break
        }
    }

    await expect(page.locator("//*[contains(@class,'user__name')]/label").toHaveText(emailID))
    
    await page.locator("//*[contains(text(),'Name on Card ')]/..//*[@class='input txt']").fill("Swathi N")
    await page.locator("//*[contains(text(),'CVV Code ')]/..//*[@class='input txt']").fill("123")


    await page.locator("//*[contains(@class,'action__submit')]").click()

    await expect(page.locator("//*[@class='hero-primary']")).toHaveText(" Thankyou for the order. ")

    const orderID = await page.locator("//*[contains(@class,'em-spacer')]/label").last().textContent()
    console.log(orderID)

    await page.locator("//*[contains(@routerlink,'myorders')]").first().click()
    await page.locator("//tbody").waitFor()

    const rows = await page.locator("//tbody/tr")
    const rowCount = await rows.count()

    for(let i=0;i<rowCount;i++)
    {
        if(orderID.includes(await rows.nth(i).locator("//th").textContent()))
        {
            await rows.nth(i).locator("//button[text()='View']").click()
            break
        }
    }

    const obtainedOrderId = await page.locator("//*[@class='col-text -main']").textContent()
    expect(orderID.includes(obtainedOrderId)).toBeTruthy()



});
