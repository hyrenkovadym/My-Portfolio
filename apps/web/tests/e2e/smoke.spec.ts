import { expect, test } from "@playwright/test";

test("homepage loads with visible project cards", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Fullstack Developer focused on Backend, Mobile and AI" }),
  ).toBeVisible();
  await expect(page.getByTestId("projects-section")).toBeVisible();
  await expect(page.getByTestId("project-card").first()).toBeVisible();
});

test("project scope filter updates the visible list", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("project-filter-frontend").click();

  await expect(page).toHaveURL(/scope=Frontend/);
  await expect(page.getByRole("heading", { name: "TerraNavix Site (English Landing)" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Agro AI Scout" })).toHaveCount(0);
});

test("project detail page opens from project card", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("project-card").first().getByRole("link", { name: "Open Case Page" }).click();

  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.getByTestId("project-detail-card")).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("shows not-found UI for unknown project slug", async ({ page }) => {
  await page.goto("/projects/non-existent-case");

  await expect(page.getByRole("heading", { name: "Case not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
