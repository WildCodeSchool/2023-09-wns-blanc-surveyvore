import { test, expect } from "@playwright/test";

test("new survey when user unsigned", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await page.locator("[data-test-id = new-survey]").click();
  expect(page.url()).toEqual("http://localhost:3000/signin");
});

test("new survey when user signed in", async ({ page }) => {
  const email = page.locator("[data-test-id = email]");
  const password = page.locator("[data-test-id = password]");

  await page.goto("http://localhost:3000/");
  await page.locator("[data-test-id = signin]").click();
  expect(page.url()).toEqual("http://localhost:3000/signin");
  await email.click();
  await email.fill("mail@test.fr");
  await password.click();
  await password.fill("passwordtest");
  await page.locator("[data-test-id] = submit-sign-in").click();
  expect(page.url()).toEqual("http://localhost:3000/");
  await page.locator("[data-test-id = new-survey]").click();
  expect(page.url()).toEqual("http://localhost:3000/newSurvey");
});
