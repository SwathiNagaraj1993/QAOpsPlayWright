
const {test,expect}=require('@playwright/test')
test("Browser context playwright test",async({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    const username = page.locator("[id='username']")
    const password = page.locator("[id='password']")
    const signOn = page.locator("input#signInBtn")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    await username.fill("rahulshetty")
    await password.fill("abc")
    await signOn.click()
    await page.locator("[style*='display: block']").textContent()
    await expect(page.locator("[style*='display: none']")).toContainText("Incorrect")

    //login and fetch the text of the product
    await username.fill("")
    await username.fill("rahulshettyacademy")
    await password.fill("Learning@830$3mK2")
    await signOn.click()
    console.log(await page.locator("//*[@class='card-title']/a").first().textContent())
    console.log(await page.locator("//*[@class='card-title']/a").nth(1).textContent())
});

test('Without browser context',async({page})=>
{
    await page.goto("https://google.com");
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")
});

test("Assignment playwright test",async({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    const email = page.locator("//*[@id='userEmail']")
    const password = page.locator("#userPassword")
    const login = page.locator("#login")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title())
    await page.locator("//*[@class='text-reset']").click()
    await page.locator("#firstName").fill("Swathi")
    await page.locator("#lastName").fill("Nagaraj")
    await email.fill("swathi.n2@gmail.com")
    await page.locator("#userMobile").fill("1234567890")
    await page.locator("//*[@value='Female']").click()
    await password.fill("Swathi@123")
    await page.locator("#confirmPassword").fill("Swathi@123")
    await page.locator("//*[@formcontrolname='required']").click()
    await login.click()
    await expect(page.locator("//h1[@class='headcolor']")).toContainText("Account Created Successfully")
    await page.locator("//*[@class='btn btn-primary']").click()

    await email.fill("swathi.n2@gmail.com")
    await password.fill("Swathi@123")
    await login.click()

    console.log(await page.locator("//*[contains(@style,'text-transform')]/b").first().textContent())
    console.log(await page.locator("//*[contains(@style,'text-transform')]/b").allTextContents())
});

test("UI controls test",async({browser})=>{
        const context = await browser.newContext()
        const page = await context.newPage()
        const username = page.locator("[id='username']")
        const password = page.locator("[id='password']")
        const signOn = page.locator("input#signInBtn")
        const documentLink = page.locator("//*[contains(@href,'documents-request')]")
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
        await username.fill("rahulshettyacademy")
        await password.fill("Learning@830$3mK2")
        //to select from Select dropdown
        const dropdown = page.locator("//select[@class='form-control']")
        await dropdown.selectOption("consult")
        //to click on Radio button
        await page.locator("//*[@class='radiotextsty' and contains(text(),'User')]").click()
        await page.locator("#okayBtn").click()
        await expect(page.locator("//*[@class='radiotextsty' and contains(text(),'User')]")).toBeChecked()//assertion on radio button clicked
        console.log(expect(await page.locator("//*[@class='radiotextsty' and contains(text(),'User')]").isChecked()))
        //to check checkbox
        await page.locator("#terms").click()
        await expect(page.locator("#terms")).toBeChecked()//assertions on checkbox
        await page.locator("#terms").uncheck()
        expect(await page.locator("#terms").isChecked()).toBeFalsy()//assertions on unchecking checkbox
        //to validate attribute values
        await expect(documentLink).toHaveAttribute("class","blinkingText")
});

test("Child window test",async({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator("//*[contains(@href,'documents-request')]")
    const username = page.locator("[id='username']")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])

    const textObtd = await newPage.locator("//*[contains(@class,'red')]/strong").textContent()
    const domain = textObtd.split("@")[1]
    console.log("Domain: "+domain)
    await username.type(domain)
    console.log(await username.inputValue())

});