// import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/LogIn";
import { render, screen, fireEvent } from '@testing-library/react';

test("ログイン画面-存在チェック", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
    );
  //Loginの文字が存在するか
  expect(screen.getByText('Log In')).toBeVisible();
  //useNameのラベルが存在するか
  expect(screen.getByLabelText('userName')).toBeVisible();
  //emailのラベルが存在するか
  expect(screen.getByLabelText('email')).toBeVisible();
  //passwordのラベルが存在するか
  expect(screen.getByLabelText('Password')).toBeVisible();
})

test("ログイン画面-正常系", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
    );

  //入力フィールド取得
  const nameInput = screen.getByLabelText('userName');
  const emailInput = screen.getByLabelText('email');
  const passswordInput = screen.getByLabelText('Password');

  //各フィールドに値入力
  fireEvent.change(nameInput, {target: {value: 'test name'}});
  fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
  fireEvent.change(passswordInput, {target: {value: 'testpassword'}});

  //フィールドに入力した値が存在するか確認
  expect(nameInput).toHaveValue('test name');
  expect(emailInput).toHaveValue('test@example.com');
  expect(passswordInput).toHaveValue('testpassword');
});

test("ログイン画面-異常系", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
    );

  //入力フォームが空の状態でSubmitボタン押下
  fireEvent.click(screen.getByRole('button'));
  screen.debug();

  //エラーメッセージの表示確認
  const userNameError = await screen.getByText('Please enter userName.');
  const emailError = await screen.getByText('Please enter a valid email address.');
  const passwordError = await screen.getByText('Please enter your password.');
  expect(userNameError).toBeVisible();
  expect(emailError).toBeVisible();
  expect(passwordError).toBeVisible();
});