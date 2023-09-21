const globalDecorate = {
  getDate: () => new Date(),
};

const API_ENVIRONMENT = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  TEST: "test",
};

export { globalDecorate, API_ENVIRONMENT };
