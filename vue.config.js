module.exports = {
  devServer: {
    host: 'localhost',
    proxy: 'http://localhost:80' //redirect api requests to apache server
  },
}
