const {test,expect,request}=require('@playwright/test')
const{APIUtils} = require('../Utils/APIUtils')
const payload = {userEmail:"swathi.n2@gmail.com",userPassword:"Swathi@123"}
const createOrderPayload={orders:[{"country":"Switzerland",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response
test.beforeAll( async()=>{
    const apiContext = await request.newContext()
    const apiUtils = await new APIUtils(apiContext,payload)
    response=await apiUtils.createOrder(createOrderPayload)
    
})



test("End to End",async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)},response.token)
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.locator("//*[contains(@routerlink,'myorders')]").first().click()
    await page.locator("//tbody").waitFor()

    const rows = await page.locator("//tbody/tr")
    const rowCount = await rows.count()

    for(let i=0;i<rowCount;i++)
    {
        if(response.orderID.includes(await rows.nth(i).locator("//th").textContent()))
        {
            await rows.nth(i).locator("//button[text()='View']").click()
            break
        }
    }

    const obtainedOrderId = await page.locator("//*[@class='col-text -main']").textContent()
    expect(response.orderID.includes(obtainedOrderId)).toBeTruthy()



});
