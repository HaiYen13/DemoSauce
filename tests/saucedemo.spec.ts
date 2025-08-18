import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const SAUCEDEMO_URL = 'https://www.saucedemo.com/'

// Ex 1: Login successfully with valid credentials
test('Login successfully with valid credentials', async ({ page }) => {
  await page.goto(SAUCEDEMO_URL);

  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');

  await expect(page).toHaveURL(/.*inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

// Ex 2: Product list contains exactly 6 items
test('Product list contains exactly 6 items', async ({ page }) => {
  await page.goto(SAUCEDEMO_URL);

  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');

  const items = page.locator('.inventory_item');
  await expect(items).toHaveCount(6);
});

// Ex 3: Confirm that each product in the list displays its price
test('Each product displays its price', async ({ page }) => {
  await page.goto(SAUCEDEMO_URL);
  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');

  const products = page.locator('.inventory_item');
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const price = await products.nth(i).locator('.inventory_item_price').textContent();
    expect(price).not.toBeNull();
    expect(price?.trim()).not.toBe('');
    console.log(`Product ${i + 1} has price: ${price}`);
  }
});

// Ex 4: Confirm that products are successfully added to the cart
test('Products can be added to the cart successfully', async ({ page }) => {
  await page.goto(SAUCEDEMO_URL);
  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');

  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct.locator('.inventory_item_name').textContent();
  await firstProduct.locator('button').click();

  await page.click('.shopping_cart_link');

  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toContainText(productName as string);
});