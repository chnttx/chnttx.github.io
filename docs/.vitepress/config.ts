import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "harry's site notes",
  description: "These cover various things I find useful to remember",
  base: "/docs/",
  outDir: "../dist/docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "../index.html", target: "_self" },
    ],

    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "Countries",
        items: [
          { text: "Australia", link: "/australia" },
          { text: "New Zealand", link: "/new-zealand" },
          { text: "Brazil", link: "/brazil" },
          { text: "Canada", link: "/canada" },
          { text: "United States", link: "/united-states" },
          { text: "Russia", link: "/russia" },
        ],
      },
    ],

    socialLinks: [
      { icon: "linkedin", link: "https://linkedin.com/in/thn864" },
      { icon: "github", link: "https://github.com/chnttx" },
    ],
  },
});
