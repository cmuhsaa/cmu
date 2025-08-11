module.exports = {
  siteUrl: "https://www.cmu-alumni.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude specific routes from sitemap
  exclude: ["/login", "/dashboard/*", "/forgot-password", "/reset-password"],
};
