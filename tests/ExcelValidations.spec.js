const ExcelJS = require('exceljs')
const { test, expect } = require('@playwright/test')

async function writeExcel(searchText, replaceText, change, path) {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(path)
    const worksheet = workbook.getWorksheet('Sheet1')
    const out = await readExcel(worksheet, searchText, change)
    const cell = worksheet.getCell(out.row, out.col)
    cell.value = replaceText
    await workbook.xlsx.writeFile(path)
}

async function readExcel(worksheet, searchText, change) {
    let output = { row: -1, col: -1 }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber + change.rowChange
                output.col = colNumber + change.colChange

            }

        })
    })
    return output
}

test('Excel Validations', async ({ browser }) => {
    const context = await browser.newContext(
        {
            acceptDownloads: true,

            downloadsPath: "downloads/"
        }
    )
    const page = await context.newPage()
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/")
    const downloadPromise =  page.waitForEvent('download')
    await page.getByRole("button", { name: "Download" }).click()
    await page.pause()
    await downloadPromise
   

    writeExcel("Mango", 350, { rowChange: 0, colChange: 2 }, "C:\\Users\\Ravhi\\Downloads\\download.xlsx")
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles("C:\\Users\\Ravhi\\Downloads\\download.xlsx")
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);

})
