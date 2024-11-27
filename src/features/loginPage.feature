Feature: Login Page Testing

  Scenario: Successful account creation 
    Given I am on the login page
    When I click create account link
    And I enter all details in form
    Then I see account creation message on next page

  Scenario: Successful login with "Remember Me" checked
    Given I am on the login page
    When I enter a valid email
    And I enter a valid password
    And I check keep me signed in checkbox
    And I click submit button
    When I enter valid MFA code on MFA page
    Then I should be logged into the application successfully
    When I close and open browser
    And I should remain logged in after closing and reopening the browser

  Scenario: Login fails with an invalid email (negative test)
    Given I am on the login page
    When I enter an invalid email 
    And I enter a valid password 
    And I click submit button
    Then I should see an error message
    And I should remain on the login page

  Scenario: Successful login with valid email and password
    Given I am on the login page
    When I enter a valid email
    And I enter a valid password
    And I click submit button
    When I enter valid MFA code on MFA page
    Then I should be logged into the application successfully

  Scenario: Succesful reset password with valid email
    Given I am on the login page
    When I click the forgot your password link
    And I choose email as a way of verification
    Then I enter a valid email address
    And I click the send button
    Then I should see a confirmation message
