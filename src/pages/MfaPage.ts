import { BasePage } from "./BasePage";
import { Locator } from 'playwright';

export class MfaPage extends BasePage {

    public readonly mfaCodeInput: Locator 
  = this.page.locator("//input[@name='mfaCode']");

  public async mfaSendkeys(mfaCode: string){
    await this.mfaCodeInput.fill(mfaCode);
  }

  public readonly submitButtonMfa: Locator 
  = this.page.locator("//button[@type='submit']");

  public async clickSubmitButton(){
    await this.submitButtonMfa.dblclick();
  }

  async selectFromDropdown(): Promise<void> {
  const dropdown = this.page.locator('input#react-select-2-input');
  await dropdown.click();

  }


}
