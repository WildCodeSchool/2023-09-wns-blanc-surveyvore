import { test, expect, Page } from "@playwright/test";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test.describe("Add a new survey", () => {
    test("01. Go to login page", async () => {
        await page.goto("http://localhost:3000/signin");
    });

    test("02. Login with valid credentials", async () => {
        const emailInput = await page.getByPlaceholder("example@gmail.com");
        await emailInput.click();
        await emailInput.fill("charlie.feix@gmail.com");

        const passwordInput = await page.getByPlaceholder("••••••••");
        await passwordInput.click();
        await passwordInput.fill("12345");

        await page.getByRole("button", { name: "Se connecter" }).click();

        await page.waitForLoadState("networkidle");
        await expect(page.url()).toEqual("http://localhost:3000/");
    });

    test("03. Go to the new survey page", async () => {
        await page.getByRole("button", { name: "Nouveau formulaire" }).click();
        await expect(page).toHaveURL(
            new RegExp("^http://localhost:3000/surveys/")
        );
    });

    test("04. Create a new survey", async () => {
        const titleInput = await page.getByPlaceholder("Formulaire sans titre");
        await titleInput.click();
        await titleInput.fill("Test de nouveau titre de formulaire");

        await page.getByText("PrivéIl ne sera visible que").click();

        const descriptionInput = await page.getByPlaceholder(
            "Description de mon formulaire"
        );
        await descriptionInput.click();
        await descriptionInput.fill(
            "Test de nouvelle description de formulaire"
        );
    });

    test("05. Add a question", async () => {
        const questionInput = await page.getByPlaceholder("Nouvelle question");
        await questionInput.click();
        await questionInput.fill("Test de nouvelle question");

        const questionDescriptionInput = await page.locator('form textarea[name="question-description"]');
        await questionDescriptionInput.click();
        await questionDescriptionInput.fill("Test de nouvelle description de question");

        await page.locator('label').filter({ hasText: 'Choix unique' }).click();

        await page.getByRole("button", { name: "Ajouter" }).click();
    });
});
