import { expect } from '@playwright/test';

export class HeaderMenu {
  constructor(page) {
    this.page = page;
    this.btn_Account = page.locator("//div[@class= 'page-container']//button[contains(@data-action, 'slideover-account')]");
    this.btn_AccountLI = page.locator("//div[contains(@class, 'hidden')]/a[@href= '/account']");
    this.btn_Search = page.locator("//button[@id = 'open-search']");
    this.txt_Search = page.locator("//form[@action = '/search']//input[@id = 'q']");
    this.tile_1stItem = page.locator("//div[@id='search-suggestions-content']//div[contains(@id, 'swiper-wrapper')]//div[contains(@class, 'swiper-slide-active')] ");
  }

  async clickAccountButton() {
    await this.btn_Account.click();
  }

  async clickAccountButtonLI() {
    await this.btn_AccountLI.click();
  }

  async searchAnItem(item){
    await this.btn_Search.click();
    await this.txt_Search.fill(item);
    await this.tile_1stItem.click();
  }
 
}