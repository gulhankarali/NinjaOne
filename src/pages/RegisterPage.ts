import { BasePage } from "./BasePage"
import { Locator } from 'playwright';

export class RegisterPage extends BasePage{


    public readonly organizationInput: Locator 
  = this.page.locator('input[name="organization"][type="text"].form-control');

    public async fillOrganizationInput(value: string) {
    await this.organizationInput.fill(value);
    }

    public readonly firstNameInput: Locator 
  = this.page.locator('input[name="firstName"][maxlength="150"][type="text"].form-control');

    public async fillFirstNameInput(value: string) {
    await this.firstNameInput.fill(value);
    }

    public readonly lastNameInput: Locator 
  = this.page.locator('input[name="lastName"][maxlength="150"][type="text"].form-control');

    public async fillLastNameInput(value: string) {
    await this.lastNameInput.fill(value);
    }

    public readonly emailInputOnCreation: Locator 
  = this.page.locator('input[name="email"][type="email"].form-control');

    public async fillEmailInputOnCreation(value: string) {
    await this.emailInputOnCreation.fill(value);
    }

    public readonly passwordInputOnCreation: Locator 
  = this.page.locator('input[name="password"][autocomplete="new-password"][maxlength="72"][type="password"].has-error.form-control');

    public async fillPasswordInputOnCreation(value: string) {
    await this.passwordInputOnCreation.fill(value);
    }

    public readonly passwordConfirmInput: Locator 
  = this.page.locator('input[name="passwordConfirm"][autocomplete="new-password"][maxlength="72"][type="password"].has-error.form-control');

    public async fillPasswordConfirmInput(value: string) {
    await this.passwordConfirmInput.fill(value);
    }

    public readonly phoneInput: Locator 
  = this.page.locator('input[type="tel"][autocomplete="tel"][maxlength="20"].PhoneInputInput');

    public async fillPhoneInput(value: string) {
    await this.phoneInput.fill(value);
    }

    public readonly phoneCountrySelect: Locator 
  = this.page.locator('select[aria-label="Phone number country"].PhoneInputCountrySelect');

    public async selectPhoneCountry(value: string) {
    await this.phoneCountrySelect.selectOption(value);
    }

    public readonly registerButton: Locator 
  = this.page.locator('button[type="submit"].btn.btn-primary.m-t-sm');

    public async clickRegisterButton() {
    await this.registerButton.click();
    }

    public readonly accountSuccessMessage: Locator 
  = this.page.locator('p.css-bk160n.e1qlhcgt2');

    public async getAccountSuccessMessageText(): Promise<string> {
    const textContent = await this.accountSuccessMessage.textContent();
    if (textContent === null) {
      throw new Error('Account success message not found or has no text.');
    }
    return textContent;
  }
}