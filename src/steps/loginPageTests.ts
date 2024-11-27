import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { loginPage, mfaPage, registerPage, resetPasswordPage } from "../../globalSetup"
import { TOTPHelper } from "../helpers/googleAuth";
import { CustomWorld } from "../hooks/globalHooks";
import { FakerHelper } from "../helpers/fakerHelper";

  Given('I am on the login page', async function () {
    await this.page.goto(process.env.URL as string);
    await new Promise(resolve => setTimeout(resolve, 3000));
  });
  
  When('I enter valid MFA code on MFA page', async function () {    
    const totpHelper = await TOTPHelper.createWithFreshToken(process.env.SECRET as string);
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const currentCode = totpHelper.getCurrentToken();
        await mfaPage.mfaSendkeys(currentCode);
        await mfaPage.clickSubmitButton();
        
    } catch (error) {
        console.error('2FA Login failed:', error);
        throw error;
    }
  });
  
  When('I enter a valid email', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await loginPage.inputEmail(process.env.USERNAME as string);
  });
  
  When('I enter a valid password', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await loginPage.inputPassword(process.env.PASSWORD as string);
  });
  
  When('I check checkbox', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await loginPage.tickKeepMeSignedInCheckbox();
  });
  
  When('I click submit button', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await loginPage.clickSigninButton();
  });

  Then('I should be logged into the application successfully', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await expect(this.page).toHaveTitle("Get started | NinjaOne");
  });

  When('I click create account link', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await loginPage.clickCreateAccountLink();
    });
  
  
  When('I enter all details in form', async function () {
        const userData = FakerHelper.generateUserData();
        await registerPage.fillOrganizationInput(userData.organizationName);
        await registerPage.fillFirstNameInput(userData.firstName);
        await registerPage.fillLastNameInput(userData.lastName);
        await registerPage.fillEmailInputOnCreation(userData.email);
        await registerPage.emailInputOnCreation.press('Enter');
        await registerPage.fillPasswordInputOnCreation(userData.password);
        await registerPage.fillPasswordConfirmInput(userData.password);
        await registerPage.fillPhoneInput(userData.ukPhoneNumber);
        await registerPage.emailInputOnCreation.press('Enter');
        await registerPage.selectPhoneCountry(userData.country);
    });

  
  Then('I see account creation message on next page', async function () {
      await new Promise(resolve => setTimeout(resolve, 10000))
      const successMessage = await registerPage.accountSuccessMessage.textContent(); 
      expect(successMessage?.trim()).toContain("Account successfully created. Please check your email to activate your account."); 
  });
  
  When('I check keep me signed in checkbox', async function () {
     await new Promise(resolve => setTimeout(resolve, 3000));
     await loginPage.tickKeepMeSignedInCheckbox()
  });

  When('I close and open browser', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const world  = new CustomWorld();
    await world.close();
    await this.page.goto(process.env.URL as string);
  });
  
  Then('I should remain logged in after closing and reopening the browser', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await expect(this.page).toHaveTitle("Get started | NinjaOne");

 });

  When('I enter an invalid email', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await loginPage.inputEmail(process.env.INVALID_USERNAME as string);

});

  Then('I should see an error message', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const actualMessage = await loginPage.getErrorMessage();
    if (actualMessage !== "Human verification failed. Please try again or contact your system administrator for assistance.") {
        throw new Error(`Expected message: "Human verification failed. Please try again or contact your system administrator for assistance.", but got: "${actualMessage}"`);
    }
  });
  
  Then('I should remain on the login page', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const currentUrl = this.page.url();
    await expect(currentUrl).toBe('https://app.ninjarmm.com/auth/#/login');
  });

  When('I click the forgot your password link', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));  
    await loginPage.clickForgotPasswordLink();
  });


  When('I choose email as a way of verification', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));   
    await resetPasswordPage.selectDropdownOption("Email");
  });


  Then('I enter a valid email address', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));    
    await resetPasswordPage.fillEmailInput(process.env.USERNAME as string);
  });

  When('I click the send button', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));  
    await resetPasswordPage.clickSendButton();
  });

  Then('I should see a confirmation message', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));  
    const actualMessage = await resetPasswordPage.getPasswordRecoveryMessage();
    const expectedMessage = "Password recovery email sent";
    if (actualMessage !== expectedMessage) {
        throw new Error(`Expected message: "${expectedMessage}", but got: "${actualMessage}"`);
    }
  });