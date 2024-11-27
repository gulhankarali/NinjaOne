import { BasePage } from "./BasePage"
import { Locator } from 'playwright';

export class ResetPasswordPage extends BasePage{

    public readonly dropdownList: Locator = this.page.locator('div[class*="css-yk16xz-control"]');

    public async selectDropdownOption(optionValue: string): Promise<void> {
        await this.dropdownList.click(); 
        const option = this.page.locator(`div.css-1uccc91-singleValue:has-text("${optionValue}")`);
        await option.click();        
    }

    public readonly emailInput: Locator = this.page.locator('input[name="email"]');

    public async fillEmailInput(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    public readonly sendButton: Locator = this.page.locator('button[type="submit"].btn.btn-primary.m-t-sm');

    public async clickSendButton(): Promise<void> {
         await this.sendButton.click();
    }

    public readonly passwordRecoveryMessage: Locator = this.page.locator('p.css-bk160n.e1nhwllb0');

    public async getPasswordRecoveryMessage(): Promise<string> {
        return (await this.passwordRecoveryMessage.textContent())?.trim() || '';
    }

}
