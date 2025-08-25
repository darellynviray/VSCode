import { expect } from "@playwright/test";

export class CheckOutPage {
    constructor(page) {
    this.page = page;
    this.input_FirstName = page.locator("//input[@id='order_ship_address_attributes_firstname']");
    this.input_LastName = page.locator("//input[@id='order_ship_address_attributes_lastname']");
    this.input_Address = page.locator("//input[@id='order_ship_address_attributes_address1']");
    this.input_City = page.locator("//input[@id='order_ship_address_attributes_city']");
    this.input_PostCode = page.locator("//input[@id='order_ship_address_attributes_zipcode']");
    this.btn_SaveContinue = page.locator("//button[contains(@class, 'checkout-content-save-continue-button')]");
    this.options_DeliveryMethods = page.locator("//div[@id='shipping-method']");
    this.btn_Pay = page.locator("//button[@id='checkout-payment-submit']");
    this.lbl_OrderNumber = page.locator("//div[@id='checkout']//strong");
    this.lbl_OrderConfirmation = page.locator("//div[@id='checkout']//h4/following-sibling::div[1]//h5");

  }

  async enterShippingDetails(firstName, lastName, address, city, postCode){
    await this.input_FirstName.waitFor({ state: 'visible', timeout: 10000 });
    await this.input_FirstName.fill(firstName);
    await this.input_LastName.fill(lastName);
    await this.input_Address.fill(address);
    await this.input_City.fill(city);
    await this.input_PostCode.fill(postCode);

  }

  async clickSaveAndContinue(){
    await this.btn_SaveContinue.click();
  }

  async verifyDeliveryMethods(){
    await this.options_DeliveryMethods.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.options_DeliveryMethods).toBeVisible();
  }

  async addPaymentDetails(cardNmber, expiry, cvv){
    const frame = this.page.frameLocator("//iframe[@title='Secure payment input frame']");
    const txt_CardNumber = frame.locator("//input[@id='Field-numberInput']");
    const txt_Expiry = frame.locator("//input[@id='Field-expiryInput']");
    const txt_Cvv = frame.locator("//input[@id='Field-cvcInput']");
   

    await txt_CardNumber.fill(cardNmber);
    await txt_Expiry.fill(expiry);
    await txt_Cvv.fill(cvv)
    await this.btn_Pay.click();
  }
  
  async verifyOrderNumber(){
    await this.lbl_OrderNumber.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.lbl_OrderNumber).toBeVisible();
  }

  async verifyOrderConfirmed(){
    await this.lbl_OrderConfirmation.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.lbl_OrderConfirmation).toBeVisible();
  }
}
