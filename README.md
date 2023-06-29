# Compliance automation prototype

## About

A web app to facilitate

## User stories

- Users:

  - manager
  - employee

- A user should be able to (unpreviledged)employee

  - [x] register/login
  - [x] check (added)integration status
  - [x] view failing controls, risks and policies (mocked)
  - [ ] manage their account
  - [ ] check their risk posture
  - [ ] check compliance policies

- A manager should be able to,
  - [x] add/remove compliance frameworks
  - [ ] add/remove/modify policies
  - [ ] add/remove/configure integrations

## Schema

### Tables

- [x] **account**

  | Field             | Type        |
  | ----------------- | ----------- |
  | type              | String      |
  | provider          | String      |
  | providerAccountId | String      |
  | refresh_token     | String?     |
  | access_token      | String?     |
  | expires_at        | Int?        |
  | token_type        | String?     |
  | scope             | String?     |
  | id_token          | String?     |
  | session_state     | String?     |
  | user_id           | FK(user.id) |

- [x] **session**

  | Field        | Type     |
  | ------------ | -------- |
  | id           | String   |
  | sessionToken | String   |
  | userId       | String   |
  | expires      | DateTime |

- [x] **user**

  | Field         | Type                    |
  | ------------- | ----------------------- |
  | name          | String                  |
  | email         | String?                 |
  | emailVerified | DateTime?               |
  | image_url     | String?                 |
  | role          | enum(manager, employee) |
  | company_id    | FK(company.id)          |

- [x] **frameworks**

  | Field       | Type   |
  | ----------- | ------ |
  | name        | String |
  | description | String |
  | url         | String |

- [x] **verifcation_token**

  | Field      | Type            |
  | ---------- | --------------- |
  | identifier | String          |
  | token      | String (unique) |
  | expires    | DateTime        |

- [x] **company**

  | Field  | Type   |
  | ------ | ------ |
  | domain | String |
  | name   | String |

- [x] **control**

  | Field        | Type             |
  | ------------ | ---------------- |
  | name         | String           |
  | description  | String           |
  | framework_id | FK(framework.id) |

- [x] **policy**

  | Field        | Type             |
  | ------------ | ---------------- |
  | name         | String           |
  | description  | String           |
  | framework_id | FK(framework.id) |

- [x] **evidence**

  | Field       | Type   |
  | ----------- | ------ |
  | name        | String |
  | data        | BLOB   |
  | description | String |
  | url         | String |

- [x] **integration**

  | Field       | Type            |
  | ----------- | --------------- |
  | name        | String          |
  | description | String          |
  | url         | String          |
  | config      | Json            |
  | company_id  | FK(company.id)  |
  | evidence_id | FK(evidence.id) |

- [ ] **inspection**

  | Field          | Type                |
  | -------------- | ------------------- |
  | started_at     | DateTime            |
  | completed_at   | DateTime?           |
  | user_id        | FK(user.id)         |
  | company        | FK(company.id)      |
  | integration_id | FK(integration.id)? |
  | integration_id | FK(integration.id)? |

- [ ] **integration_type**

  | Field       | Type   |
  | ----------- | ------ |
  | name        | String |
  | description | String |
  | driver      | String |
  | config      | Json   |

  > Note:
  >
  > - driver is a classname for the adapter that has definitions for how to speak to that endpoint.
  >   configuration {
  >   api_key: string
  >   region: string,
  >   auth: boolean
  >   }

### Relations

    -----SYNTAX-----
    >-< many to many
    --< one to many
    >-- many to one

- [x] user --< account
- [x] user --< session
- [x] company >-< framework
- [x] company --< user
- [x] company --< integration
- [x] control >-< evidence
- [x] control >-< policy
- [x] framework --< control
- [x] framework --< policy
- [x] integration --< evidence

### Explanation

- Framework will be split into to policy then these policies are mapped to controls.
- Might have a policy that states you need to a data recovery strategy ?
- Controls that you want to have but not to meet any compliance standard !!!

  - e.g. not updated a package.

- For integration they have to have a standardise our data
  - This allows us to map against some control and see if they are met.
  -

On new integration

- start a check right away.
- can take some time. When complete
  - notify the admin of completion

## TODOs

- FIX: Fix the sign up process
- TODO: Add a image to the company.
- TODO: Need to figure out the onboarding process ???
  - As users can only join right now if they have a company to belong to !

## Build instructions

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on
[http://localhost:3000/api/hello](http://localhost:3000/api/hello). This
endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are
treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead
of React pages.

This project uses
[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Storybook

https://storybook.js.org/recipes/next
https://storybook.js.org/blog/storybook-7-docs/

Note: Using storybook with componenets from the nextjs 13 app dir requires
addational configuration found above.
