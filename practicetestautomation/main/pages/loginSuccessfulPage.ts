import { expect, Locator, Page } from "@playwright/test";

export class LoginSuccessfulPage{

    readonly page: Page;
    readonly page_content: Locator;
    readonly logout_button: Locator;

    constructor(page: Page){

        this.page = page;
        this.page_content = page.locator("xpath=.//*[contains(@class,'has-text-align-center')]")
        this.logout_button = page.locator("xpath=.//*[contains(@class,'button__link')]")

    }

    async logOut(){
        await this.logout_button.click()
    }
}