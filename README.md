# Playwright Test Framework

This repository contains a Playwright-based test framework for UI automation. It provides a simple structure for writing and running end-to-end tests across multiple environments and includes support for fixtures, test data, screenshots for failures, and HTML reports.

## Features

- Based on Playwright (`@playwright/test`)
- Reusable fixtures for setup and authentication
- JSON-driven test data
- Automatic screenshots on failure (configurable)
- HTML test reports
- Cross-browser execution (Chromium, Firefox, WebKit)

## Prerequisites

- Node.js (>= 16)
- npm (or yarn)

## Installation

1. Install dependencies:

   npm install

2. Install Playwright browsers (required once per machine):

   npx playwright install

## Running tests

- Run the full test suite:

  npx playwright test

- Run a specific test file:

  npx playwright test tests/example.spec.ts

- Run in headed mode (see the browser window):

  npx playwright test --headed


## Configuration

The Playwright configuration is stored in `playwright.config.ts`. Use this file to set timeouts, test directory, reporters, projects (browsers), and global fixtures.

## Project structure

- `package.json` - project metadata and scripts
- `playwright.config.ts` - Playwright configuration
- `tests/` - test files and test-specific fixtures
- `fixtures/` - shared fixtures used by tests (for example `fixtures/login.ts`)
- `test-data/` - JSON files containing test data (e.g. `users.json`)
- `README.md` - this file

## Fixtures and Test Data

Fixtures are defined under `fixtures/` and used to encapsulate common setup steps (for example logging in). Test data files are located under `test-data/` and can be imported into tests.

Example:

- `fixtures/login.ts` - provides a login fixture to reuse authentication steps
- `test-data/users.json` - contains user credentials and other test data

## Screenshots and Artifacts

Playwright can capture screenshots, traces, and videos for failed tests. Configure these options in `playwright.config.ts`. After a failed run, screenshots are typically saved to the test-results directory and can be reviewed from the HTML report.

## Tips

- Use `.only` and `.skip` while developing tests to focus on a single test or exclude others.
- Keep tests independent and avoid relying on previous test state.
- Store reusable selectors and helpers in separate files to keep tests simple.

