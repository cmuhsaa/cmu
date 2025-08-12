/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.cmu-alumni.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,

  exclude: [
    "/login",
    "/dashboard/*",
    "/dashboard",
    "/forgot-password",
    "/reset-password",
  ],

  transform: async (config, path) => {
    const entry = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };

    // Add favicon for home page
    if (path === "/") {
      entry.image = [
        {
          loc: "https://www.cmu-alumni.com/favicon.ico",
          title: "Site Favicon",
        },
      ];
    }

    return entry;
  },
};
