const {test,expect} = require('@playwright/test')
test("End to End",async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    const emailID='swathi.n2@gmail.com'
    

    //added fix
    const productName = "ZARA COAT 3"
    const products = page.locator("//*[@class='card-body']")
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.getByPlaceholder("email@example.com").fill("swathi.n2@gmail.com")
    await page.getByPlaceholder("enter your passsword").fill("Swathi@123")
    await page.getByRole("button",{name:'Login'}).click()
    
    await page.waitForLoadState('networkidle')
    await page.locator("//*[@class='card-body']//b").first().waitFor()
    await page.locator("//*[contains(@class,'card-body')]").filter({hasText:'+productName+'}).getByRole("button",{name:'Add To Cart'}).click()
   
    await page.getByRole("linkitems",{name:'Cart'}).click()
    
    await page.locator("//li[contains(@class,'items')]").first().waitFor()
    await expect(page.getByText(productName)).toBeVisible()


    await page.getByRole("button",{name:'Checkout'}).click()
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 }) 
    await page.locator("//section[contains(@class,'ta-results')]").waitFor()

    await page.locator("button").filter({hasText:'India'}).nth(1).click()
    
    await expect(page.locator("//*[contains(@class,'user__name')]/label").toHaveText(emailID))
    
    await page.locator("//*[contains(text(),'Name on Card ')]/..//*[@class='input txt']").fill("Swathi N")
    await page.locator("//*[contains(text(),'CVV Code ')]/..//*[@class='input txt']").fill("123")


    await page.getByText("PLACE ORDER").click()

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible()

    const orderID = await page.locator("//*[contains(@class,'em-spacer')]/label").last().textContent()
    console.log(orderID)

    await page.getByRole("button",{name:'ORDERS'}).click()
    await page.locator("//tbody").waitFor()

    await page.locator("//tbody/tr/th").filter({hasText:'"+orderID+"'}).getByRole("button",{name:'View'}).click()
    

    const obtainedOrderId = await page.locator("//*[@class='col-text -main']").textContent()
    expect(orderID.includes(obtainedOrderId)).toBeTruthy()



});
