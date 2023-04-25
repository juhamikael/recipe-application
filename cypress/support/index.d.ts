// cypress/support/index.d.ts

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in.
     * @param username - The username to log in with.
     * @param password - The password to log in with.
     */
    login(username: string, password: string): Chainable<void>;
  }
}
