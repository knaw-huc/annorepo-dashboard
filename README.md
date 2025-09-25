# AnnoRepo Dashboard

Dashboard for [AnnoRepo](https://github.com/knaw-huc/annorepo/)

_Note: Work in Progress_

## Features

- Create and delete containers
- Assign users to containers
- Search annotations in a container
- Create and delete annotations
- Create and delete custom queries

## Development

First time:

```shell
cp public/webapp.config.json.example public/webapp.config.json
# change AR_HOST, and possibly AUTH_HOST

npm install
```

Start: `npm start`

## Auth

- Authentication methods:
  - use anonymously
  - login with oidc
  - enter api key
- Workflow:
  - start: anonymously
    - top-right: show anonymously, plus button: login
  - click: login
    - show modal with login options: cancel | oidc | token
  - click cancel:
    - continue anonymously
  - click oidc:
    - redirect to oidc login page
    - login: set oidc user
      - when success: set oidc user
      - when failed: stay anonymous
  - click token:
    - show token password input field + submit button
    - when submit --> /my/profile status === 200: set token user
    - when submit --> /my/profile status !== 200: stay anonymous
- Allowed methods:
  - anonymously: always
  - token: check if `$.withAuthentication && $.authentication.internal === api-keys`
    --> allow loging in using token
  - oidc: check if `$.withAuthentication && $.authentication.oidc.serverUrl === AUTH_HOST`
    --> allow loging in using oidc
- State model:

```typescript
type AuthState = {
  methods: AuthMethod[];
  user: User;
};

type AuthMethod = "token" | "oidc" | "anonymously";

type User = OidcUser | TokenUser | AnonymousUser;
type UserBase = {
  authenticated: boolean;
};
type OidcUser = UserBase & {
  authenticated: true;
  nickname: true;
};
type TokenUser = UserBase & {
  authenticated: true;
  token: string;
};
type AnonymousUser = UserBase & {
  authenticated: false;
};
```
