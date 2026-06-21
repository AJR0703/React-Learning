# Serverless Fitness App (Personal Learning Project)

A personal project for learning how to build and deploy a full-stack **serverless
single-page application (SPA)** on AWS. It is a work in progress, built to
understand each piece hands-on rather than to ship a finished product.

## What I'm learning here

- **React frontend** — a single-page app built with React and Vite, styled with
  React Bootstrap, using React Router for navigation and React Context for shared
  auth state.
- **Infrastructure as Code (IaC)** — defining the entire backend in a single AWS
  **SAM** (Serverless Application Model) `template.yaml`, then using `sam build`
  and `sam deploy` to provision and deploy real resources into an AWS account.
- **Serverless AWS services** and how they fit together:
  - **Cognito** — the identity store that handles sign-up, email verification and
    login, and issues JWT tokens. (The app never stores passwords itself.)
  - **DynamoDB** — a serverless NoSQL table holding per-user profile data, keyed
    by the user's Cognito id.
  - **HTTP API (API Gateway)** — the public entry point, with a Cognito **JWT
    authorizer** that rejects unauthenticated requests before any code runs.
  - **Lambda** — Node.js functions (the only thing allowed to touch DynamoDB) that
    read and write a user's profile.

## Architecture

```
React SPA (Amplify Auth)
   │  sign up / log in  ──►  Cognito User Pool  ──►  issues JWT
   │  data calls (Authorization: Bearer <JWT>)
   ▼
HTTP API + Cognito JWT authorizer
   ▼
Lambda (Node.js, AWS SDK v3)  ──►  DynamoDB
```

The browser never talks to DynamoDB or the AWS SDK directly — it only holds a
token and calls the API; Lambda does the data access.

## Authentication flow

1. **Sign up** with email + password → Cognito creates an unconfirmed user and
   emails a verification code.
2. **Confirm** the code → the account becomes active and the user is logged in.
3. **Log in** → Cognito returns JWT tokens, which the frontend stores via Amplify.
4. **Authenticated requests** attach the Cognito **ID token** as a Bearer header;
   the API's authorizer validates it, and the Lambda reads the user's id from the
   verified token claims (never from the request body) so each user can only
   access their own data.
5. **Session persistence** — on page refresh the app re-hydrates the user from the
   existing session, so a logged-in user stays logged in.

## Tech stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, React Bootstrap, React Router, AWS Amplify (Auth) |
| Backend  | AWS SAM, Lambda (Node.js, AWS SDK v3) |
| Auth     | Amazon Cognito (User Pool + JWT authorizer) |
| Data     | Amazon DynamoDB (on-demand) |
| API      | Amazon API Gateway (HTTP API) |

## Project structure

```
src/
├── api/         # authenticated fetch wrapper + profile API calls
├── config/      # Amplify configuration
├── context/     # auth state (React Context)
├── features/    # auth pages, dashboard
├── routes/      # protected route guard
└── backend/     # SAM template + Lambda handlers (Infrastructure as Code)
docs/            # build/learning guide plans for the backend and frontend
```

## Running it

```bash
# Frontend
npm install
npm run dev

# Backend (from src/backend, requires AWS credentials + SAM CLI)
sam build
sam deploy --guided
```

> Note: this is a learning project and a work in progress.
