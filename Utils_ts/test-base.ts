import{test as basetest} from '@playwright/test'

interface TestDataForOrder{
    username: string;
    password: string;
    productName: string;
}
export const customTest = basetest.extend<{testDataForOrder:TestDataForOrder}>(
    {
        testDataForOrder:
        {
            username: "swathi.n2@gmail.com",
            password: "Swathi@123",
            productName: "ZARA COAT 3"
        }
    }
)