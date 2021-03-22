export const appConfig = () => ({
  port: +process.env.PORT || 3333,
  db: {
    url:
      process.env.DATABASE_URL ||
      'postgres://postgres:postgres@localhost:5432/booking'
  }
});
