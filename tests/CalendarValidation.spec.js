const {test,expect} = require('@playwright/test')
test("Calendar Validations",async({page})=>{
    const month = "6"
    const date = "18"
    const year = "2027"
    const expected=[month,date,year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator("//*[@class='react-date-picker__inputGroup']").click()
    await page.locator("//*[@class='react-calendar__navigation__label']").click()
    await page.locator("//*[@class='react-calendar__navigation__label']").click()
    await page.getByText(year).click()
    await page.locator("//button[contains(@class,'view__months')]").nth(Number(month-1)).click()
    await page.locator("//abbr[text()='"+date+"']").click()

    const inputs = page.locator("//input[contains(@class,'react-date-picker__inputGroup')]")
    for(let i=0;i<expected.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expected[i])
    }
});