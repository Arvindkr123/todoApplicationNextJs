const config = {
  mongo_url: String(process.env.MONGO_URI),
  jwt_secret: String(process.env.jwtSecret),
  url: String(process.env.URL),
};

export default config;
