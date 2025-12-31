import { test, expect } from "@playwright/test";

const FRONT_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(FRONT_URL);
  await page.getByRole("link", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await page.locator("input[name=email]").fill("georgeynr@gmail.com");
  await page.locator("input[name=password]").fill("abc123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Logged In Successfully")).toBeVisible();
});

test("should not allow the user to sign in", async ({ page }) => {
  await page.goto(FRONT_URL);
  await page.getByRole("link", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await page.locator("input[name=email]").fill("georgeynr11@gmail.com");
  await page.locator("input[name=password]").fill("abc123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Invalid Credentials")).toBeVisible();
});

test("Should allow user to register", async ({ page }) => {
  const email = `george-${Date.now().toString().slice(-5)}@gmail.com`;
  await page.goto(FRONT_URL);
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("link", { name: "Register Now" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();
  await page.locator("input[name=firstName]").fill("Albert");
  await page.locator("input[name=lastName]").fill("George");
  await page.locator("input[name=email]").fill(email);
  await page.locator("input[name=password]").fill("abc123");
  await page.locator("input[name=confirmPassword]").fill("abc123");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("User Registered Successfully")).toBeVisible();
});
