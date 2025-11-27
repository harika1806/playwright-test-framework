import { test, expect } from '../fixtures/collect-networkLogs';
import users from '../test-data/users.json';

test('Login Success @smoke', async ({ page }) => {
  await page.goto('/');
  //await a11y.scan({ include: ['#main', 'header', 'footer'], failOnImpact: 'serious' });
  await page.getByTestId("user-name").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");
  const button = page.getByRole('button',{name: 'Login'})
  expect(button).toBeVisible()
  await page.getByRole('button',{name: 'Login'}).click();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
 // await page.selectOption('[data-test="product_sort_container"]', "Price (high to low)" );
 });

test('Login failure', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId("user-name").fill("standard_user");
  await page.getByTestId("password").fill("Nosecret_sauce");
  await page.getByRole('button',{name: 'Login'}).click();
});

test('Test case for failed result', async ({ page, networkLogs}) => {
  await page.goto('/');
  await page.getByTestId("user-name").fill(users.invalidUser.username);
  await page.getByTestId("password").fill(users.invalidUser.password);
  await page.getByRole('button',{name: 'Login'}).click();
  // verify we did not navigate to inventory page
  await expect(page).toHaveURL(/inventory\.html/);
});

test.skip('Intentionally skipping a test case', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId("user-name").fill("standard_user");
  await page.getByTestId("password").fill("Nosecret_sauce");
  await page.getByRole('button',{name: 'Login'}).click();
  timeout: 5000
});
