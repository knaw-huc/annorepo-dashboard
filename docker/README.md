Run in project root:
```shell
docker build -f docker/Dockerfile . --tag annorepo-dashboard --build-arg VITE_AR_HOST=http://localhost:8080
docker compose -f ./docker/docker-compose.yml up -d
```
