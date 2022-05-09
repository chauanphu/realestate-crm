// vue.config.js

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.electron.realestate",
        productName: "Customer Manager 4.0",
        executableName: "Customer Manager 4.0",
        extraResources: [{ from: "src/db", to: "./", filter: "**/customer.sqlite3" }],
        linux: {
          target: "deb",
          icon: "bundled/favicon.ico",
          publish: ["github"],
          category: "Office",
        },
      },
    },
  },
};
