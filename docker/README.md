To create docker image, run in project root:

```shell
cp docker/webapp.config.json.example docker/webapp.config.json # modify webapp.config.json
docker build -f docker/Dockerfile . --tag annorepo-dashboard --build-arg VITE_CONFIG_URL=/assets/webapp.config.json
docker compose -f ./docker/docker-compose.yml up -d
```
