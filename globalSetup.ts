import { Page } from 'playwright';
import { LoginPage } from './src/pages/LoginPage';
import { DashboardPage } from './src/pages/DashboardPage';
import { MfaPage } from './src/pages/MfaPage';
import { RegisterPage } from './src/pages/RegisterPage';
import { ResetPasswordPage } from './src/pages/ResetPasswordPage';


export let loginPage: LoginPage;
export let dashboardPage: DashboardPage;
export let mfaPage: MfaPage;
export let registerPage: RegisterPage;
export let resetPasswordPage: ResetPasswordPage;
export let page: Page;

export const initElements = (argPage: Page): void => {

    page = argPage;
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    mfaPage = new MfaPage(page);
    registerPage = new RegisterPage(page);
    resetPasswordPage = new ResetPasswordPage(page);
}