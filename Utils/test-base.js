const base = require('@playwright/test')

exports.customTest = base.test.extend(
    {
        testDataForOrder:
        {
            username: "swathi.n2@gmail.com",
            password: "Swathi@123",
            productName: "ZARA COAT 3"
        }
    }
)