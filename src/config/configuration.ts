export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 1521,
    db: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  keycloak: JSON.parse(process.env.KEYCLOAK_JSON),
  keycloakAdmin: JSON.parse(process.env.KEYCLOAK_ADMIN_JSON),
  jwt: {
    public_key: process.env.JWT_KEYCLOAK_PUBLIC_KEY,
  },
  http: {
    timeout: parseInt(process.env.HTTP_REQUEST_TIMEOUT),
    redirects: parseInt(process.env.HTTP_REQUEST_MAX_REDIRECTS),
  },
});
