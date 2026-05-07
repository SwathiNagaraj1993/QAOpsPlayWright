const playwright = require('@playwright/test')
const {POManager} = require('../../pages/POManager')
const{Before,After,AfterStep,Status} = require('@cucumber/cucumber')

Before(async function()
{
     const browser = await playwright.chromium.launch(
            {
               headless:false
            }
           )
           const context = await browser.newContext()
           this.page = await context.newPage()
           this.poManager = new POManager(this.page)
})

After(function()
{
    console.log("Last to execute")
})

AfterStep(async function({result}) {
    if(result.status===Status.FAILED)
    {
        await this.page.screenshot({path:'screenshot1.png'})
    }
    
})