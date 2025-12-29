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
