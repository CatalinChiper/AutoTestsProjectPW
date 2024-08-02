import { type Page, type Locator, expect } from "@playwright/test";
import { LoginPageUtils } from "../utils/loginPageUtils";

export class LoginPage{

    readonly page: Page;
    readonly username_input: Locator;
    readonly password_input: Locator;
    readonly submit_button: Locator;
    readonly validation_message: Locator;

    constructor(page: Page) {

        this.page = page;
        this.username_input = page.locator("xpath=.//*[@id='username']")
        this.password_input = page.locator("xpath=.//*[@id='password']")
        this.submit_button = page.getByRole('button', { name: 'Submit' })
        this.validation_message = page.locator("xpath=.//*[@id='error']")

    }

    async openLoginPage() {
        await this.page.goto(LoginPageUtils.PAGE_URL)
    }
    
    async loginWithCredentials(username: string, password: string) {
        await this.username_input.pressSequentially(username, {delay: 10})
        await this.password_input.pressSequentially(password, {delay: 10})
        await this.submit_button.click()
    }

    async openPageAndLogin() {
        this.openLoginPage()
        this.loginWithCredentials(LoginPageUtils.USERNAME, LoginPageUtils.PASSWORD)
    }
 
    async checkValidationMessage(errorMessage: string) {
        expect(this.validation_message).toBeVisible()
        await expect(this.validation_message).toHaveText(errorMessage)
    }

}