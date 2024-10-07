import { test, expect } from '@playwright/test';

test('ログイン-正常系', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  // フォーム入力
  await page.locator('input[name="user"]').fill('test name');
  await page.locator('input[name="email"]').fill('test email');
  await page.locator('input[name="password"]').fill('test password');

  //ログインボタンクリック
  await page.click('button:has-text("Submit")');

  //遷移先確認
  await page.waitForURL('http://localhost:5173/');
  await expect(page).toHaveURL('http://localhost:5173/');
});

test('ログイン-異常系', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
    //ログインボタンクリック
    await page.click('button:has-text("Submit")');

    async function checkErrorMessage(value, message) {
      const errorSelector = `label:has-text("${value}") .error-message`;
      const errorElement = page.locator(errorSelector);
      const errorText = await errorElement.textContent();

      //エラーメッセージ確認
      expect(errorText).toBe(message);
    }

    await checkErrorMessage("userName","Please enter userName.");
    await checkErrorMessage("email","Please enter a valid email address.");
    await checkErrorMessage("password","Please enter your password.");
});

