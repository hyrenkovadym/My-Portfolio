import { expect, test } from "@playwright/test";

test("renders homepage core sections", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Backend-first Fullstack Engineer" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected Projects" })).toBeVisible();
});

test("shows not-found UI for unknown project slug", async ({ page }) => {
  await page.goto("/projects/non-existent-case");

  await expect(page.getByRole("heading", { name: "Case not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
