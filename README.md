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

## TODO Integrating-interface-html

- Keep left bottom about info in screen when page is higher than screen
- Style Login-, Token- and SelectHostModal
