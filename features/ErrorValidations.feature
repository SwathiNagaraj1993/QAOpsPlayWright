Feature: ECommerce Validations
@Validation
  Scenario Outline: Error Validation
    Given A login to ECommerce2 application with "<username>" and "<password>"
    Then Verify Error Message

Examples:
|   username    |   password    |
|   rahulshetty |   abc |
|   swathi.n2@gmail.com | Swathi@123 |
    
