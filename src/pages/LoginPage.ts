import { BasePage } from "./BasePage";
import { Locator } from 'playwright';

export class LoginPage extends BasePage {

    public readonly emailInput: Locator 
    = this.page.locator("//input[@name='email' and @type='text' and @class='form-control' and @autocomplete='username']");
    
    public async inputEmail(email: string) {
        await this.emailInput.fill(email);
    }

    public readonly passwordInput: Locator 
  = this.page.locator("//input[@name='password' and @type='password' and @class='form-control' and @autocomplete='current-password']");

    public async inputPassword(password: string) {
    await this.passwordInput.fill(password);
    }

    public readonly signInButton: Locator 
    = this.page.locator("//button[@type='submit' and contains(@class, 'btn') and contains(@class, 'btn-primary') and text()='Sign In']");

    public async clickSigninButton() {
    await this.signInButton.dblclick();
    }
    
    public readonly keepMeSignedInCheckbox: Locator 
    = this.page.locator("//div[contains(@class, 'css-j5jbvc')]");

    public async tickKeepMeSignedInCheckbox(){
    await this.keepMeSignedInCheckbox.check(); 
    }

    public readonly createAccountLink: Locator 
    = this.page.locator('text="Do not have an account?"');

    public async clickCreateAccountLink(){
     await this.createAccountLink.dblclick();
    }

    public readonly errorMessage: Locator 
    = this.page.locator('div.alert.alert-danger');

    public async getErrorMessage(){
      return (await this.errorMessage.textContent())?.trim() || '';
    }

    public readonly forgotPasswordLink: Locator = this.page.locator('a[href="#/resetPassword"]');

    public async clickForgotPasswordLink(): Promise<void> {
    await this.forgotPasswordLink.click();
    }


}