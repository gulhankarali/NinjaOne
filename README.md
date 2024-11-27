# Playwright Cucumber Testing Framework

This is a robust UI testing framework built using [Playwright], [Cucumber], and [TypeScript]
It supports environment configurations via `dotenv`, data generation with `faker`, and MFA handling with `otplib`.
The framework includes GitHub Actions integration for CI/CD.

## Features

- **Testing Tool**: Playwright with TypeScript for browser automation.
- **Test Scenarios**: Includes 4 scenarios in one feature file based on Cucumber.
- **Reporting**: Generates Cucumber JSON and Playwright reports. (See Github Actions / Artifacts section)
- **Global Setup**: Centralized fixtures for setup of pages.
- **Global Hooks**: Global setup and teardown.
- **Data Management**: Uses `faker` for dynamic test data generation.
- **CI/CD**: Pipeline defined in `pipeline.yml` for GitHub Actions.


## Prerequisites

Before starting, ensure you have:

- **Node.js**: Version `20.x` or higher.
- **npm**: Version `9.5.0` or higher.
- **Playwright Browsers**: Installed via the Playwright CLI.

---

## Installation and Running

```bash
   git clone https://github.com/your-repo/NinjaOne.git
   cd NinjaOne
   npm install
   npm install --save-dev playwright dotenv fakers otplib
   npx playwright install --with-deps
   npx cucumber-js


NinjaOne/
├── .github/
│   └── workflows/
│       └── pipeline.yml         # GitHub Actions CI/CD pipeline
├── reports/                     # Test reports generated during runtime
├── src/
│   ├── features/                # Cucumber feature files
│   ├── helpers/                 # Helper functions and utilities
│   ├── hooks/                   # Global hooks for setup/teardown
│   ├── pages/                   # Page object models (POM)
│   └── steps/                   # Step definitions for Cucumber
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── cucumber.js                  # Cucumber configuration
├── globalSetup.ts               # Playwright global setup
├── package.json                 # npm dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project documentation
└── pipeline.yml                 # GitHub Actions pipeline
```

## Configuration
Add environment variables in .env:

URL=https://example.com
USERNAME=testuser
PASSWORD=securepassword
INVALID_USERNAME=invaliduser
SECRET=google-secret (Google Authenticator)
