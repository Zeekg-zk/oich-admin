const mockFiles = require.context('./modules', false, /\.js$/);

mockFiles.keys().forEach(key => {
  require(`${'./modules' + key.slice(1)}`)
})