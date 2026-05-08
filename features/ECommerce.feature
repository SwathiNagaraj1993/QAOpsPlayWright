Feature: ECommerce Validations

@Regression
  Scenario Outline: Placing the Order
    Given A login to ECommerce application with '<username>' and '<password>'
    When Add '<productName>' to Cart
    Then Verify '<productName>' is displayed in the Cart
    When Enter the details '<name>','<cvv>','<username>','<country>' and '<confirmText>' and Place the Order
    Then Verify order is present in the OrderHistory

  Examples:
  |username|password|productName|name|cvv|country|confirmText|
  |swathi.n2@gmail.com|Swathi@123|ZARA COAT 3|Swathi|123| India| Thankyou for the order. |

