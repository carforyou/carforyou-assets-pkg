/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  extends: ["@carforyou/eslint-config"],
  overrides: [
    {
      files: ["*"],
      rules: {
        "no-console": "off",
      },
    },
  ],
}
