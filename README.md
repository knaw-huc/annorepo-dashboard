# AnnoRepo Dashboard

Dashboard for [AnnoRepo](https://github.com/knaw-huc/annorepo/)

## Development


First time: 
```shell
cp public/webapp.config.json.example public/webapp.config.json 
# and change AR_HOST

npm install
```

Start: `
npm start
`

## TODO

## Requirements

Users: 
 - annorepo admin
 - annorepo editor?
 - annorepo guest?

Use cases:
- Manage containers
  - Add container
  - Edit container: what does editing a container mean?
  - Note: this would mean a dashboard has access to docker and can fire up
    containers
- Manage users
  - Add/edit/remove users
  - Authorization: manage users and their permissions
- View annotation statistics
  - Annotation count
- View annotations
  - Filter annotations
    - by target
    - user/creator (ORCID URI)
    - motivation/purpose
  - Browse annotations
    - Set limit, offset (view all at once)
  - Visualise annotations:
    - Photos, documents, ...?
- Import annotations
  - using existing 'annotationPages' (?)
- Create annotations?
  - Note: what should be the scope of this dashboard?

- Authenticate
  - Login using ORCID? 
  - Edu-id? Reuse functionality from TT editor workflow?

## Workflow

- Login: ORCID?
- Admin page
  - List and select containers
    - title + truncated description
    - annotation count
    - link to container page
  - Add new container
  - Link to user management
- Container page
  - Manage container
  - Link to users
  - Link to query page
  - Link to annotation form
- Container users page
  - Add users
  - Modify users
  - Delete users
- Custom query page
  - Create query
    - Plain text input field
    - Query builder?
  - Store and list queries?
  - View query
- Annotation form page?
  - Insert new query

## Tech setup

### Stack
- Language: Typescript
- Bundler: Vite
- Components: React
- State: Zustand
- Routing: Tanstack Router?
- Fetching: Tanstack Query?
- Styling: Tailwind

### Packages (workspace)

- `@annorepo/client`:    annorepo client using openapi + tanstack query
- `@annorepo/component`: reusable react components with query provider, no routing
- `@annorepo/dashboard`: full webapp with routing using components
