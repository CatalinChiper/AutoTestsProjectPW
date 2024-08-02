import { test, expect, } from '@playwright/test'
import { LoginPage } from '../main/pages/loginPage'
import { LoginPageUtils } from '../main/utils/loginPageUtils'
import { LoginSuccessfulPage } from '../main/pages/loginSuccessfulPage'
import { LoginSuccessfulPageUtils } from '../main/utils/loginSuccessfulPageUtils'

let PAGE_CONTENT:string = "Congratulations student. You successfully logged in!"

var loginPage : LoginPage
var loginSuccessfulPage : LoginSuccessfulPage

test.beforeEach(async ({ page }) => {

    loginSuccessfulPage = new LoginSuccessfulPage(page)
    loginPage = new LoginPage(page)
    await loginPage.openPageAndLogin();

})

test('Check that the page has correct title', async() => {
    await expect(loginSuccessfulPage.page).toHaveTitle(LoginSuccessfulPageUtils.PAGE_TITLE)
})

test('Check that the page has correct text', async() => {

    await expect(loginSuccessfulPage.page_content).toHaveText(PAGE_CONTENT)

})

test(`Check that 'Log Out' button is functional`, async({ page }) => {
    await loginSuccessfulPage.logOut()
    await expect(page).toHaveURL(LoginPageUtils.PAGE_URL)
})



