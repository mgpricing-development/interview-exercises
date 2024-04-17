const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalOriginDependencies: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    specPattern: "**/**.cy.js",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

