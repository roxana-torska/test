module.exports = {
  env: {
    APP_URL: "http://localhost:3001",
  },
  useFileSystemPublicRoutes: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
