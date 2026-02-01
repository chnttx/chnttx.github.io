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
      { text: "Home", link: "/" },
      { text: "GeoGuessr Notes", link: "/geoguessr-notes" },
    ],

    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "Notes",
        items: [
          { text: "GeoGuessr Notes", link: "/geoguessr-notes" },
        ],
      },
    ],

    socialLinks: [
      { icon: "linkedin", link: "https://linkedin.com/in/thn864" },
      { icon: "github", link: "https://github.com/chnttx" },
    ],
  },
});
