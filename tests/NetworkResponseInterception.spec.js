const {test,expect,request}=require('@playwright/test')
const{APIUtils} = require('../Utils/APIUtils')
const payload = {userEmail:"swathi.n2@gmail.com",userPassword:"Swathi@123"}
const createOrderPayload={orders:[{"country":"Switzerland",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
const fakeResponse = {data:[],message:"No Orders"}
let response

test.beforeAll( async()=>{
    const apiContext = await request.newContext()
    const apiUtils = await new APIUtils(apiContext,payload)
    response=await apiUtils.createOrder(createOrderPayload)
    
})



test("End to End",async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    
    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value)},response.token)

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(fakeResponse)
        route.fulfill(
            {
                response,
                body,
            }
        )
    }
   )
    await page.locator("//*[contains(@routerlink,'myorders')]").first().click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
   console.log(await page.locator("//*[contains(@class,'mt-4')]").textContent())

});
