import { expect, test } from "@playwright/test";

test("renders homepage core sections", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Fullstack Developer focused on Backend, Mobile and AI" }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Section jump").getByRole("link", { name: "My Knowledge" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "What I Already Shipped" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Agro AI Scout" })).toBeVisible();
});

test("shows not-found UI for unknown project slug", async ({ page }) => {
  await page.goto("/projects/non-existent-case");

  await expect(page.getByRole("heading", { name: "Case not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
