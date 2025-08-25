import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
   // this.accountButton = page.locator("//div[@class= 'page-container']//button[contains(@data-action, 'slideover-account')]");
    this.lbl_WelcomeBanner = page.locator("//div[contains(text(), 'Welcome to the Spree')]");
    this.lbl_SignUpSuccessBanner = page.locator("//p[contains(text(), 'signed up successfully')]");
    this.lbl_LoginSuccessBanner = page.locator("//p[contains(text(), 'Signed in successfully')]");
  }

  async goto() {
    await this.page.goto('https://demo.spreecommerce.org/'); 
  }

  async verifyHomePageLoaded() {
    await expect(this.lbl_WelcomeBanner).toBeVisible();
  }

  async verifySignUpSuccessfully() {
    await expect(this.lbl_SignUpSuccessBanner).toBeVisible();
  }

   async verifyLoginSuccessfully() {
    await expect(this.lbl_LoginSuccessBanner).toBeVisible();
  }


}