export default () => ({
  port: parseInt(process.env.APP_PORT!) || 5000,
  database: {
    url: process.env.DATABASE_URL!,
  },
});
