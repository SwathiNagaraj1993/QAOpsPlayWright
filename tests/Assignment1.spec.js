const {test,expect} = require('@playwright/test')
const BASE_URL="https://eventhub.rahulshettyacademy.com"
const USERNAME="swathi.n@gmail.com"
const PASSWORD="Eventhub@123"
async function login(page)
{
    await page.goto(BASE_URL,'/login')
    await page.getByPlaceholder("you@email.com").fill(USERNAME)
    await page.getByLabel("Password").fill(PASSWORD)
    await page.locator("#login-btn").click()
    await expect(page.locator("//*[text()='Browse Events →']/..")).toBeVisible()
}
test("Login Page",async({page})=>
{
    
    await login(page)
    await page.goto(BASE_URL,'/admin/events')

    const eventName = "Test Event "+Date.now()
    await page.locator("#event-title-input").fill(eventName)
    await page.locator("//*[@id='admin-event-form']//*[@placeholder='Describe the event…']").fill("Testing Event")
    await page.getByLabel("City").fill("Bengaluru")
    await page.getByLabel("Venue").fill("M.Chinnaswamy Stadium")

    const categoryDropdown =  page.locator("#category")
    categoryDropdown.selectOption("Workshop")
    
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2027-12-31T10:00');
  
    await page.getByLabel("Price ($)").fill('100')
    await page.getByLabel("Total Seats").fill('50')
    await page.locator("#add-event-btn").click()
    await page.getByText("Event created!").waitFor()
    await expect(page.getByText("Event created!")).toBeVisible()

      await page.goto(BASE_URL,'/events')
      await page.locator("//*[@id='event-card']").nth(0).waitFor()

      await expect(page.locator("//*[@id='event-card']").filter({hasText:eventName})).toBeVisible()

      const events = await page.locator("//*[@id='event-card']")
      const eventsCount=await events.count()
      let seatsBeforeBooking = 0
      for(let i=0;i<eventsCount;i++)
      {
        seatsBeforeBooking = (await events.nth(i).locator("//*[contains(@class,'text-emerald')]").textContent()).split(" ")[0].trim()
      }

       await page.locator("//*[@id='event-card']").filter({hasText:eventName}).locator("//*[@data-testid='book-now-btn']").click()
       await expect(page.locator("#ticket-count")).toHaveText("1")

       await page.getByLabel("Full Name").fill("Swathi N")
       await page.locator("#customer-email").fill("Swathi@gmail.com")
       await page.getByPlaceholder("+91 98765 43210").fill("1234567890")
       await page.locator(".confirm-booking-btn").click()
       
       await expect(page.locator("//*[contains(@class,'booking-ref')]")).toBeVisible()
       const bookingRef = (await page.locator("//*[contains(@class,'booking-ref')]").innerText()).trim()

       await page.getByRole("button",{name:'View My Bookings'}).click()

       await expect(page.locator("#booking-card").first()).toBeVisible()
       await expect(page.locator("#booking-card").filter({hasText:bookingRef})).toBeVisible()
       await expect(page.locator("//*[@id='booking-card']").filter({hasText:bookingRef}).locator("//h3")).toHaveText(eventName)

      await page.goto(BASE_URL,'/events')
      await page.locator("//*[@id='event-card']").nth(0).waitFor()
      await expect(page.locator("//*[@id='event-card']").filter({hasText:eventName})).toBeVisible()

      
      let seatsAfterBooking = 0
      for(let i=0;i<eventsCount;i++)
      {
        seatsAfterBooking = (await events.nth(i).locator("//*[contains(@class,'text-emerald')]").textContent()).split(" ")[0].trim()
      }

     expect(parseInt(seatsAfterBooking)).toBe(parseInt(seatsBeforeBooking-1))

});