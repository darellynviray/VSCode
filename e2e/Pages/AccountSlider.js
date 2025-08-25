import { expect } from '@playwright/test';

export class AccountSlider {
  constructor(page) {
    this.page = page;
    this.frame_Login = page.locator("//turbo-frame[@id = 'login']");
    this.lbl_LoginHeader = page.locator("//h2[contains(text(), 'Login')]");
    this.link_SignUp = page.locator("//a[contains(@href, 'sign_up')]");
    this.link_Login = page.locator("//a[contains(@href, 'sign_in')]");
    this.lbl_SignUpHeader = page.locator("//h2[contains(text(), 'Sign Up')]");
    this.txt_Email = page.locator("//input[@id = 'user_email']");
    this.txt_Password = page.locator("//input[@id = 'user_password']");
    this.txt_ConfirmPassword = page.locator("//input[@id = 'user_password_confirmation']");
    this.btn_SignUp = page.locator("//input[@type = 'submit' and @value = 'Sign Up']");
    this.btn_Login = page.locator("//input[@id = 'login-button']");
    this.btn_LogOut = page.locator("//form[contains(@action, 'sign_out')]/button");
  }

  async waitForLoginFrame() {
    await this.frame_Login.waitFor({ state: 'visible' });
  }

  async isLogin() {
    return await this.lbl_LoginHeader.isVisible();
  }

  async clickSignUpLink() {
    await this.link_SignUp.click();
  }
  

  async signUp(email, password) {
    await this.btn_SignUp.waitFor({ state: 'visible' });
    await this.txt_Email.fill(email);
    await this.txt_Password.fill(password);
    await this.txt_ConfirmPassword.fill(password);
    await this.btn_SignUp.click();
  }

  async login(email, password) {

    if(await this.btn_LogOut.isVisible()){
        console.log('User is already logged in')
    } else {
        if (await this.lbl_SignUpHeader.isVisible()) {
            await this.link_Login.click();
        }

        await this.txt_Email.fill(email);
        await this.txt_Password.fill(password);
        await this.btn_Login.click();
    }
  }


}