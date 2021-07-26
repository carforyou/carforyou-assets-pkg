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
