import { BasePage } from "./BasePage";
import { Locator } from 'playwright';

export class DashboardPage extends BasePage{

    public readonly userIcon: Locator 
    = this.page.locator("//*[contains(@class, 'fa-user')]");

    public readonly logoutButton: Locator 
    = this.page.locator("[data-testid='styled-text-div']");

    public async logout(){
        await this.logoutButton.dblclick();
    }


}
