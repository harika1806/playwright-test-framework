import { test, expect } from '@playwright/test';
import users from '../test-data/users.json';

test('Login Success @sanity', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId("user-name").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");
  const button = page.getByRole('button',{name: 'Login'})
  expect(button).toBeVisible()
  await page.getByRole('button',{name: 'Login'}).click();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
 // await page.selectOption('[data-test="product_sort_container"]', "Price (high to low)" );
 });

test('Login fail', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId("user-name").fill("standard_user");
  await page.getByTestId("password").fill("Nosecret_sauce");
  await page.getByRole('button',{name: 'Login'}).click();
});

test('Expected to fail', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId("user-name").fill(users.invalidUser.username);
  await page.getByTestId("password").fill(users.invalidUser.password);
  await page.getByRole('button',{name: 'Login'}).click();
  // verify we did not navigate to inventory page
  await expect(page).not.toHaveURL(/inventory\.html/);
});

test.skip('Intentionally skipping a test case', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId("user-name").fill("standard_user");
  await page.getByTestId("password").fill("Nosecret_sauce");
  await page.getByRole('button',{name: 'Login'}).click();
});