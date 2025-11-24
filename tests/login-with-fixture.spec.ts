import { test, expect } from '../fixtures/login';

test('Add first product to cart using login fixture', async ({ page, login }) => {
  await login();
  await expect(page).toHaveURL(/inventory\.html/);

  const addButton = page.getByRole('button', { name: 'Add to cart' }).first();
  await expect(addButton).toBeVisible();
  await addButton.click();

  // after adding, the same item button typically changes to 'Remove'
  await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();

  // optionally verify cart icon shows 1 item (if present)
  const cartBadge = page.locator('.shopping_cart_badge');
  if (await cartBadge.count()) {
    await expect(cartBadge).toHaveText('1');
  }
});
