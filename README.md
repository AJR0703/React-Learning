# Serverless Fitness App

A full-stack **serverless single-page application** built to demonstrate
end-to-end ownership of a modern cloud app: a React frontend, a secure
token-based auth flow, and a Lambda + DynamoDB backend defined entirely as
Infrastructure as Code with the AWS Serverless Application Model (SAM).

It is a hands-on portfolio project — every layer is built from scratch to show
how the pieces fit together, from the browser all the way down to the IAM
policies on each function.

## Highlights

- **Modern React SPA** — React 19 + Vite, React Bootstrap for UI, React Router
  for navigation, and React Context for shared auth state.
- **Secure auth, done properly** — Amazon Cognito for identity, JWTs validated
  at the API edge, and per-user data isolation driven entirely by verified token
  claims (never by client input).
- **100% serverless backend** — API Gateway (HTTP API) → Lambda → DynamoDB, with
  no servers to manage and pay-per-request billing.
- **Infrastructure as Code** — the whole backend (Cognito, two DynamoDB tables,
  the HTTP API + JWT authorizer, and six Lambda functions) lives in one SAM
  `template.yaml`, deployable with `sam build` / `sam deploy`.
- **Least-privilege by design** — each Lambda gets a scoped `DynamoDBCrudPolicy`
  for only the table it needs.

## Tech stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, React Bootstrap, React Router, AWS Amplify (Auth) |
| Backend  | AWS SAM, Lambda (Node.js 24, AWS SDK v3) |
| Auth     | Amazon Cognito (User Pool + HTTP API JWT authorizer) |
| Data     | Amazon DynamoDB (on-demand / pay-per-request) |
| API      | Amazon API Gateway (HTTP API) |

## Architecture

```
React SPA (Amplify Auth)
   │  sign up / log in  ──►  Cognito User Pool  ──►  issues JWTs
   │  data calls (Authorization: Bearer <ID token>)
   ▼
HTTP API (API Gateway) + Cognito JWT authorizer
   ▼
Lambda (Node.js 24, AWS SDK v3)  ──►  DynamoDB
```

The browser never talks to DynamoDB or the AWS SDK directly — it only holds a
token and calls the API. Lambda is the only thing that touches the database, and
every function reads the caller's identity from the **verified JWT claims** so a
user can only ever see their own data.

## Authentication flow

1. **Sign up** with email + password → Cognito creates an unconfirmed user and
   emails a verification code.
2. **Confirm** the code → the account becomes active and the user is logged in.
3. **Log in** → Cognito returns JWT tokens, which Amplify stores client-side.
4. **Authenticated requests** attach the Cognito **ID token** as a Bearer header;
   the HTTP API's JWT authorizer validates it before any Lambda code runs, and
   the function reads the user's `sub` from the token claims (never from the
   request body).
5. **Session persistence** — on refresh the app re-hydrates the user from the
   existing session, so a logged-in user stays logged in.

## Features

### Auth
Sign up, email confirmation, login, protected routes, and persistent sessions.

### Workouts
Authenticated users can build and manage workouts — each one has a name and a
list of exercises (sets, reps, weight). Full CRUD is backed by a dedicated
DynamoDB table:

| Action | Method & path | Lambda |
|--------|---------------|--------|
| Create a workout | `POST /workouts` | `createWorkout` |
| List my workouts | `GET /workouts` | `listWorkouts` |
| Get one workout | `GET /workouts/{workoutId}` | `getWorkout` |
| Delete a workout | `DELETE /workouts/{workoutId}` | `removeWorkout` |

Workouts use a **composite primary key** (`userId` as partition key +
`workoutId` as sort key), so listing a user's workouts is a single efficient
query scoped to their partition.

### Profile
A per-user profile record in a separate table:

| Action | Method & path | Lambda |
|--------|---------------|--------|
| Get my profile | `GET /profile` | `getProfile` |
| Save my profile | `PUT /profile` | `saveProfile` |

## Project structure

```
.
├── react-test-app/            # React SPA (Vite)
│   └── src/
│       ├── api/               # authenticated fetch wrapper + profile/workout API calls
│       ├── components/ui/     # shared UI (nav bar)
│       ├── config/            # Amplify configuration
│       ├── context/           # auth state (React Context)
│       ├── features/
│       │   ├── auth/          # login, signup, confirmation pages
│       │   └── content/       # workouts page + components
│       ├── hooks/             # useAuth hook
│       └── routes/            # protected route guard
└── backend/                   # Infrastructure as Code (independent of the SPA)
    ├── template.yaml          # SAM template: Cognito, DynamoDB, HTTP API, Lambdas
    └── handlers/
        ├── profile/           # getProfile, saveProfile
        └── workout/           # createWorkout, listWorkouts, getWorkout, removeWorkout
```

The backend lives outside the React app because it's deployed and versioned
independently of the web client.

## Running it

### Frontend

```bash
cd react-test-app
npm install
npm run dev          # http://localhost:5173
```

### Backend

Requires AWS credentials and the [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html).

```bash
cd backend
sam build
sam deploy --guided
```

After deploying, the stack outputs the **User Pool ID**, **App Client ID**, and
**API base URL** — wire these into the frontend's Amplify config
(`react-test-app/src/config/amplify.js`).

> This is a personal learning project and a work in progress — built to explore
> serverless architecture hands-on and to demonstrate the technologies above.
</content>
</invoke>
