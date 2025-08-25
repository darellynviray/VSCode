// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from './Pages/HomePage';
import { HeaderMenu } from './Pages/HeaderMenu';
import { AccountSlider } from './Pages/AccountSlider';
import { ProductDetailPage } from './Pages/ProuctDetailPage';
import { CartSlider } from './Pages/CartSlider';
import { CheckOutPage } from './Pages/CheckOutPage'
import data from './Data File/testData.json';

let page;

//generate random email
const randomNumber = Math.floor(Math.random() * 10000);
let email = `user${randomNumber}@test.com`;

test.beforeAll(async ({ browser }) => {
  // Launch once
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://demo.spreecommerce.org/');
});

test.afterAll(async () => {
  await page.context().close();
});


test.describe.serial('Run tests in order', () => {

  test('Navigate to Spree Commerce demo store', async() => {
    const homePage = new HomePage(page);

    //await homePage.goto();
    await homePage.verifyHomePageLoaded();

  });

  test('SignUp new user', async() => {
    const homePage = new HomePage(page);
    const headerMenu = new HeaderMenu(page);
    const accountSlider = new AccountSlider(page);

    await headerMenu.clickAccountButton();

    if(await accountSlider.btn_LogOut.isVisible()){
      await accountSlider.btn_LogOut.click();
      await headerMenu.clickAccountButton();
    }

    await accountSlider.frame_Login.waitFor({ state: 'visible' });

    if (await accountSlider.lbl_LoginHeader.isVisible()) {
      await accountSlider.link_SignUp.click();
    } 
    
    await accountSlider.signUp(email, data.validUser.password);
    await homePage.verifySignUpSuccessfully();

    await headerMenu.clickAccountButtonLI();
    await accountSlider.btn_LogOut.click();

  });


  test('Login', async() => {
    const homePage = new HomePage(page);
    const headerMenu = new HeaderMenu(page);
    const accountSlider = new AccountSlider(page);

    await page.reload();
    await headerMenu.clickAccountButton();
    await accountSlider.login(email, data.validUser.password)
    await homePage.verifyLoginSuccessfully();

  });


  test('Purchase Products', async() => {
    const headerMenu = new HeaderMenu(page);
    const productDetail = new ProductDetailPage(page);
    const cartSlider = new CartSlider(page);
    const checkOut = new CheckOutPage(page);

    await headerMenu.searchAnItem(data.validUser.searchItem);
    await productDetail.verifyProductImageLoaded();

    await productDetail.selectSize();

    const productName = await productDetail.getProductName();
    const productPrice = await productDetail.getProductPrice();
    const productQty = await productDetail.getProductQty();

    await productDetail.clickAddToCart();
    await page.waitForTimeout(10000);

    console.log('Product Name: ' + productName);
    console.log('Product Price: ' + productPrice);
    console.log('Product Quantity: ' + productQty);

    const cartProductName = await cartSlider.getProductName();
    const cartProductPrice = await cartSlider.getProductPrice();
    const cartProductQty = await cartSlider.getProductQty();

    expect(productName.toUpperCase()).toBe(cartProductName.toUpperCase());
    expect(productPrice).toBe(cartProductPrice);
    expect(productQty).toBe(cartProductQty);

    await cartSlider.clickCheckOut();
    
    await checkOut.enterShippingDetails(data.validUser.firstName,
      data.validUser.lastName,
      data.validUser.address,
      data.validUser.city,
      data.validUser.postCode);
    await checkOut.clickSaveAndContinue();
    await checkOut.verifyDeliveryMethods();
    await checkOut.clickSaveAndContinue();
    await page.waitForTimeout(5000);

    await checkOut.addPaymentDetails(data.validUser.cardNumber,
      data.validUser.expiry,
      data.validUser.cvv);
    await page.waitForTimeout(5000);

    await checkOut.verifyOrderConfirmed();
    await checkOut.verifyOrderNumber();
  });

});