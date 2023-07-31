export {};
// const fs = require('fs')
// const globby = require('globby');

// function addPage(page) {
//     const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '')
//     const route = path === '/index' ? '' : path
//     return `  <url>
//     <loc>${`${process.env.NEXT_PUBLIC_BASE_URL}${route}`}</loc>
//     <lastmod>${new Date().toISOString()}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>1.0</priority>
//   </url>`
// }

// // excludes Nextjs files and API routes.
// const pages = await globby([
//     'pages/**/*{.js,.mdx}',
//     '!pages/_*.js',
//     '!pages/api',
// ])
// const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${pages.map(addPage).join('\n')}
// </urlset>`
// fs.writeFileSync('public/sitemap.xml', sitemap)
// }
// generateSitemap()

/**
 * 2
 */

// const fs = require("fs");
// const globby = require("globby");
// const prettier = require("prettier");

// const getDate = new Date().toISOString();

// const YOUR_AWESOME_DOMAIN = "https://website.com";

// const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

// (async () => {
//   const pages = await globby([
//     // include
//     "../pages/**/*.tsx",
//     "../pages/*.tsx",
//     // exclude
//     "!../pages/_*.tsx"
//   ]);

//   const pagesSitemap = `
//     ${pages
//       .map(page => {
//         const path = page
//           .replace("../pages/", "")
//           .replace(".tsx", "")
//           .replace(/\/index/g, "");
//         const routePath = path === "index" ? "" : path;
//         return `
//           <url>
//             <loc>${YOUR_AWESOME_DOMAIN}/${routePath}</loc>
//             <lastmod>${getDate}</lastmod>
//           </url>
//         `;
//       })
//       .join("")}
//   `;

//   const generatedSitemap = `
//     <?xml version="1.0" encoding="UTF-8"?>
//     <urlset
//       xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//       xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
//     >
//       ${pagesSitemap}
//     </urlset>
//   `;

//   const formattedSitemap = [formatted(generatedSitemap)];

//   fs.writeFileSync("../public/sitemap-common.xml", formattedSitemap, "utf8");
// })();
