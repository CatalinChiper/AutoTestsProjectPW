import { test, expect, } from '@playwright/test'
import { LoginPage } from '../main/pages/loginPage'
import { LoginPageUtils } from '../main/utils/loginPageUtils'
import { LoginSuccessfulPageUtils } from '../main/utils/loginSuccessfulPageUtils'

var loginPage : LoginPage

test.beforeEach(async ({page}) => {
    
    loginPage = new LoginPage(page)
    await loginPage.openLoginPage()

})

let parameters:string[][] = [
    ['', '', LoginPageUtils.INVALID_USERNAME_ERROR], 
    ["invalidUsername", '', LoginPageUtils.INVALID_USERNAME_ERROR],
    [LoginPageUtils.USERNAME, '', LoginPageUtils.INVALID_PASSWORD_ERROR],
    [LoginPageUtils.USERNAME, "invalidPassword" ,LoginPageUtils.INVALID_PASSWORD_ERROR]]

for (const parameter of parameters) {
test(`Login to page with username:"${parameter[0]}", password:"${parameter[1]}", expecting error message:"${parameter[2]}"`, async () => {

    await loginPage.loginWithCredentials(parameter[0], parameter[1])
    await loginPage.checkValidationMessage(parameter[2])

})
}

test(`Successfully log in with valid credentials`, async({ page }) => {

    await loginPage.loginWithCredentials(LoginPageUtils.USERNAME, LoginPageUtils.PASSWORD)
    await expect(page).toHaveURL(LoginSuccessfulPageUtils.PAGE_URL)

})