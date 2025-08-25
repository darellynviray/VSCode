import { expect } from '@playwright/test';

export class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.img_Product = page.locator("//div[contains(@id, 'main-desktop-product')]");
    this.dropdown_Size = page.locator("//button[contains(@class, 'dropdown-button')]/legend[contains(text() ,  'Please choose Size')]"); //("//button[@type='button']/legend[contains(text() ,  'Please choose Size')]"); //
    this.dropdown_Option = page.locator("//label[contains(@class, 'ease-in-out hover:bg-accent')][1]"); //selects first available size
    this.btn_AddToCart = page.locator("//div[@data-sticky-button-target = 'stickyButton']/button[contains(@class, 'add-to-cart-button')]");
    this.lbl_ProductName = page.locator("//div[@data-product-form-target='productDetails']//h1");
    this.lbl_ProductPrice = page.locator("//div[@data-product-form-target='productDetails']//span[contains(text(), 'Regular price')]/following-sibling::p");
    this.lbl_ProductQty = page.locator("//input[@id='quantity']");
    
  }

  async verifyProductImageLoaded() {
      await this.img_Product.waitFor({ state: 'visible', timeout: 10000 });
      await expect(this.img_Product).toBeVisible();
    }

  async selectSize(){
    await expect(this.dropdown_Size).toBeVisible();
    await this.dropdown_Size.hover();
    await this.dropdown_Size.click({ force: true });
    // await this.btn_AddToCart.hover();
    // await this.btn_AddToCart.click();
    await this.dropdown_Option.waitFor({ state: 'visible', timeout: 20000 });
    await this.dropdown_Option.hover();
    await this.dropdown_Option.click({ force: true });
  }

  async clickAddToCart() {
    await this.btn_AddToCart.click();
  }

  async getProductName(){
    return await this.lbl_ProductName.innerText();
  }

  async getProductPrice(){
    return await this.lbl_ProductPrice.innerText();
  }

  async getProductQty(){
    return await this.lbl_ProductQty.getAttribute('value')
  }

}

//div[@data-product-form-target='desktopMediaGallery']