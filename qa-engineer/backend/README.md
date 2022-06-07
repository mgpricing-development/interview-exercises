# Backend

## Configure .env File

Before you start the backend, you'll need a .env configuration file with the
following parameters:

| Parameter Name                | Reasonable Default        | Description                |
|-------------------------------|---------------------------|----------------------------|
| BASIC_AUTH_USERNAME           | cuvama                    | Basic auth username        |
| BASIC_AUTH_PASSWORD           | <password>                | Basic auth password        |
| MONGODB_URL                   | http://localhost:27017    | URL for MongoDB            |
| 
You can see an example in [.env.example](.env.example).

## Run the backend

To start the backend:

```shell
> nvm use
> npm install
> npm run dev
```
