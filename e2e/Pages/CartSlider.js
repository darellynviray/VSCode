export class CartSlider {
  constructor(page) {
    this.page = page;
    this.slider_Cart = page.locator("//div[@id='slideover-cart']");
    this.lbl_ProductName = page.locator("//li[contains(@class, 'cart-line-item')][1]//a[contains(@class, 'text')]");
    this.lbl_ProductPrice = page.locator("//li[contains(@class, 'cart-line-item')][1]//span");
    this.lbl_ProductQty = page.locator("//li[contains(@class, 'cart-line-item')][1]//input[contains(@id, 'line_item_quantity')]");
    this.btn_CheckOut = page.locator("//a[@data-cart-target='checkoutButton']");

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

  async clickCheckOut() {
    await this.btn_CheckOut.click();
  }

}