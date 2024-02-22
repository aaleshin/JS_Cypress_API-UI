const { defineConfig } = require("cypress");
const synpressPlugins = require("@synthetixio/synpress/plugins");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const { ImapFlow } = require("imapflow");
const nodemailer = require("nodemailer");

module.exports = defineConfig({
  screenshotsFolder: "cypress/screenshots",
  video: false,
  chromeWebSecurity: true,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  projectId: "m36rd6",

  e2e: {
    testIsolation: true,
    setupNodeEvents(on, config) {
      on("task", {
        async getUserEmail() {
          const data = await nodemailer.createTestAccount();
          return {
            host: data.imap.host,
            secure: data.imap.secure,
            port: data.imap.port,
            auth: {
              user: data.user, //email
              pass: data.pass,
            },
          };
        },
        async getLastEmail(conf) {
          const client = new ImapFlow(conf);
          await client.connect();
          const lock = await client.getMailboxLock("INBOX");
          let message = null;

          try {
            message = await client.fetchOne(client.mailbox.exists, {
              source: true,
            });
            message = message?.source?.toString();
          } finally {
            lock.release();
          }
          await client.logout();
          return message;
        },
      });

      allureWriter(on, config);
      synpressPlugins(on, config);
      return config;
    },
  },
  experimentalWebKitSupport: true
});
