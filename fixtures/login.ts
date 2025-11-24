import { test as base, expect as baseExpect } from '@playwright/test';

type LoginFixture = {
  // callable fixture that performs login when awaited
  login: () => Promise<void>;
};

export const test = base.extend<LoginFixture>({
  login: async ({ page }, use) => {
    await use(async () => {
      await page.goto('/');
      await page.getByTestId('user-name').fill('standard_user');
      await page.getByTestId('password').fill('secret_sauce');
      await page.getByRole('button', { name: 'Login' }).click();
      await baseExpect(page).toHaveURL(/inventory\.html/);
      await baseExpect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
    });
  },
});

export const expect = baseExpect;
