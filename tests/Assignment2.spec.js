const{test,expect} = require('@playwright/test')
const { log } = require('node:console')
const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
const USERNAME="swathi.n@gmail.com"
const PASSWORD="Eventhub@123"

async function loginAndGoToBooking(page)
{
    await page.goto(BASE_URL,'/login')
    await page.getByPlaceholder("you@email.com").fill(USERNAME)
    await page.getByLabel("Password").fill(PASSWORD)
    await page.locator("#login-btn").click()
    await expect(page.locator("//*[text()='Browse Events →']/..")).toBeVisible()
}   
test('Refund Validations',async({page})=>{
    await loginAndGoToBooking(page)
    await page.goto(BASE_URL,'/events')
    
    await page.locator("//*[@data-testid='event-card']").first().locator("//*[@id='book-now-btn']").click()
    await page.getByLabel("Full Name").fill("Swathi N")
    await page.locator("#customer-email").fill("Swathi@gmail.com")
    await page.getByPlaceholder("+91 98765 43210").fill("1234567890")
    await page.locator(".confirm-booking-btn").click()

    await page.getByRole("button",{name:'View My Bookings'}).click()
    await page.locator("//*[@data-testid='booking-card']").first().getByRole("link",{name:'View Details'}).click()
    await expect(page.getByText("Booking Information")).toBeVisible()

    const bookingRef = await page.locator("//*[contains(@class,'flex items-center gap')]//span[contains(@class,'text-sm')]").textContent()
    const eventTitle = await page.locator("//h1").textContent()
    
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0))

    await page.locator("#check-refund-btn").click()
    await expect(page.locator("#refund-spinner")).toBeVisible()
    await expect(page.locator("#refund-spinner")).not.toBeVisible({timeout:6000})

    await expect(page.locator("#refund-result")).toBeVisible()
    await expect(page.locator("//*[@id='refund-result']//span/strong")).toHaveText("Eligible for refund.")
    await expect(page.locator("//*[@id='refund-result']//span")).toContainText(" Single-ticket bookings qualify for a full refund.")

})

test("Group ticket booking is NOT eligible for refund",async({page})=>
{
    await loginAndGoToBooking(page)
    await page.goto(BASE_URL,'/events')
    
    await page.locator("//*[@data-testid='event-card']").first().locator("//*[@id='book-now-btn']").click()
    await page.getByLabel("Full Name").fill("Swathi N")
    await page.locator("#customer-email").fill("Swathi@gmail.com")
    await page.getByPlaceholder("+91 98765 43210").fill("1234567890")
    await page.locator("//*[@id='ticket-count']/..//button[text()='+']").click()
    await page.locator("//*[@id='ticket-count']/..//button[text()='+']").click()
    await page.locator(".confirm-booking-btn").click()

    await page.getByRole("button",{name:'View My Bookings'}).click()
    await page.locator("//*[@data-testid='booking-card']").first().getByRole("link",{name:'View Details'}).click()
    await expect(page.getByText("Booking Information")).toBeVisible()

    const bookingRef = await page.locator("//*[contains(@class,'flex items-center gap')]//span[contains(@class,'text-sm')]").textContent()
    const eventTitle = await page.locator("//h1").textContent()
    
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0))

    await page.locator("#check-refund-btn").click()
    await expect(page.locator("#refund-spinner")).toBeVisible()
    await expect(page.locator("#refund-spinner")).not.toBeVisible({timeout:6000})

    await expect(page.locator("#refund-result")).toBeVisible()
    await expect(page.locator("//*[@id='refund-result']//span/strong")).toHaveText("Not eligible for refund.")
    await expect(page.locator("//*[@id='refund-result']//span")).toContainText("Group bookings (3 tickets) are non-refundable.")

})