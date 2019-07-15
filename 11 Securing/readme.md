# Security

## Configure SSL in Angular

- Execute `bash generate.sh` `create-certs\` in Git Bash to create certs.
- Copy `server.crt`and `server.key` to newly created `ssl` folder of Angular project.`
- Register in `angular.json`

```typescript
"serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
        "browserTarget": "HelloSSL:build",
        "ssl": true,
        "sslKey": "/ssl/server.key",
        "sslCert": "/ssl/server.crt"
    },
```

## Auth Bascis

[JSON Web Tokens - Jwt](https://jwt.io/)

[OpenID Connect](https://connect2id.com/learn/openid-connect)

[.NET Core Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-2.0&tabs=visual-studio%2Caspnetcore2x)
