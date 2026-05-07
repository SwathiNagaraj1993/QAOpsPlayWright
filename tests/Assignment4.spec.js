const { test, expect } = require('@playwright/test')
const YAHOO_USER = {
    email: "swathi.n@yahoo.co.in",
    password: "Eventhub@123"
}

const GMAIL_USER = {
    email: "swathi.n@gmail.com",
    password: "Eventhub@123"
}

async function loginAs(page, user) {
    await page.goto('https://eventhub.rahulshettyacademy.com/login')
    await page.getByPlaceholder('you@email.com').fill(user.email)
    await page.getByLabel('Password').fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('Verification as Yahoo user', async ({ page,request }) => {
    
    const loginRespone = await request.post("https://eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: {
                email: YAHOO_USER.email, password: YAHOO_USER.password
            }
        }
    )
    await expect(loginRespone.ok()).toBeTruthy()
    const loginJSON = await loginRespone.json()
    const token = loginJSON.token

    const eventResponse = await request.get("https://eventhub.rahulshettyacademy.com/api/events",
        {
            headers: {
                Authorization: token
            }
        }
    )
    await expect(eventResponse.ok()).toBeTruthy()
    const eventJSON = await eventResponse.json()
    const eventId = eventJSON.data[0].id

    const bookingResponse = await request.post("https://eventhub.rahulshettyacademy.com/api/bookings",
        {
            headers:
            {
                Authorization: token
            },
            data:
            {
                eventId: eventId,
                customerName: 'Yahoo User',
                customerEmail: 'swathi.n@yahoo.co.in',
                customerPhone: '98745896123',
                quantity: 1
            }
        }
    )
    await expect(bookingResponse.ok()).toBeTruthy()
    const bookingJSON = await bookingResponse.json()
    const yahooBookingId = bookingJSON.data.id

    await loginAs(page, GMAIL_USER)
    await page.goto("https://eventhub.rahulshettyacademy.com/" + yahooBookingId, { waitUntil: 'networkidle' })
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
})