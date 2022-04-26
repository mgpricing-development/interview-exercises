describe("Login Page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Page Exists", () => {
        cy.contains("[data-cy=task-list-header]", "Task List");
    });

    it("Create a New Task", () => {
        const taskName = "New Task";

        cy.get("#basic_name").type(taskName);
        cy.get("button[type=submit]").click();
        cy.contains("[data-cy=task-name]", taskName);
    });
});