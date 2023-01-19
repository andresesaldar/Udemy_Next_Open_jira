# Open Jira

## Local environment

### DB

Use docker compose to run the db

```bash
docker-compose up -d
```

### Environment variables

Setup the following environment variables on the **.env.local** file.

- MONGO_URL: Db connection url
- NEXT_PUBLIC_BASE_URL: Base api integration url