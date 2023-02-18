# Dubs-Flavored Serverless Stack

**This is a work in progress.**

This repo aims to create a reusable template for quickly setting up a full-stack [SST](https://sst.dev). SST already offers some well-thought-out templates, but I gravitate toward a slightly different setup.

There are two SST apps within this repo:

- dubs-base - The base template to help setup your AWS account.
- dubs-app - The main application stack.

In the main repo folder, you will want to place a .env.local file with the following variables:

```
DOMAIN_NAME=yourdomain.com
```

This env file will be shared by both dubs-base and dubs-app.

---

## Dubs-Base

- Sets up a Hosted Zone in Route53
- Updates the nameservers on the domain

### Still To Do

- Setup scripts to leverage profiles and stage names for multi-account setups
- Setup Pipeline for CI/CD
  - SEED or AWS Codepipeline?
  - Determine how best to run tests in CI/CD

---

## Dubs-App

- GraphQL API server using Apollo Server
  - Utilize Pothos to create Typescript-based schemas
  - Graphql Codegen to create types, mocks, and apollo client queries/mutations
- RDS Serverless Postgres Database
  - Utilize Kysley for API, Migrations, and Type Generation
- Cookie based passwordless auth system
  - Uses SES to send emails and creates the SES verified domain identity
- Frontend app using Vite
  - Uses Apollo Client and graphql-coden queries
  - Setup Storybook
    - Deploys the storybook site to https://storybook.yourdomain.com
  - Setup Tailwind
- Custom Domains
  - Attaches custom domains to API, Frontend, and Documentation sites
- Foundational setup for testing both the domaain api and the frontend

### Still To Do

- App
  - Implement the Hygen templates, and allow for complicated model attributes
- Auth
  - Create tests for the auth system
- Frontend
  - Improve the login workflow
    - Setup the welcome page for a newly created user
- Documentation site using Docusaurus
- SES
  - Setup SES to receive emails
  - Create a cleanup script to remove SES CNAMES when stack is deleted

---

## Usage

### Domain Name Setup

Register a domain in AWS. The code will automatically create the Hosted Zone and update the nameservers on the domain.

Store you domain name in .env.local as DOMAIN_NAME

You need to run dubs-base first, then dubs-app. After the first time you run dubs-base, you do not need to run it again.

```shell
# Run the dubs-base stack
cd /dubs-base
npm install
npm run dev
```

### Running the app

```shell
# After dubs-base is deployed, run the dubs-app stack
cd /dubs-app
npm install
npm run dev

# After starting dubs-app, you can run the frontend site locally
cd /frontend
npm run dev
```

### Running the tests

Make sure you have the live lambda running locally, as the tests currently require the live environment.

```shell
# Run the tests from the root folder of dubs-app
npm run test
```

To run the storybook test suite, you need to run the storybook server locally.

```shell
# Run the tests from the root folder of frontend
npm run storybook
npm run test-storybook
```

## Contributing

Pull requests are welcome. For significant changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
