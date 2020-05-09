let removeConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
  removeConsolePlugin = [ ["transform-remove-console", { "exclude": [ "error", "warn"] }] ]
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  // comment out the line below to allow console.logs in production builds.
  plugins: removeConsolePlugin
}
