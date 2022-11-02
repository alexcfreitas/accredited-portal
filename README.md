# Portal Credenciados Template

1. Preencher as variáveis de ambiente abaixo no arquivo .env

```
DB_HOST=xxxx
DB_PORT=xxxxx
DATABASE=xxxx
DB_USER=xxxx
DB_PASSWORD=xxxx
```
2. Carregar as dependências na raiz do projeto
    
```
npm i 
```
3. Iniciar os containers referente a aplicação keycloak rodando na porta http://localhost:8090
   
```
cd keycloak
docker compose up 
```
4. Iniciar a Api rodando na porta http://localhost:3000 acesse http://localhost:3000/docs para ter acesso a toda documentação da api.
   
```
npm run start:local
```