const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://koske-game.web.app/',
    supportFile: false
  }
})

