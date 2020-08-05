module.exports = {
  publicPath: '/nokiatwin/',
  devServer: {
    host: 'http://social-dynamics.net',
    proxy: 'http://localhost:80' //redirect api requests to apache server
    //proxy: 'http://social-dynamics.net' //redirect to remote SQL
    /*proxy: {
      '^/api': {
        target: 'http://social-dynamics.net',
        ws: true,
        changeOrigin: true
      },
      '^/foo': {
        target: '<other_url>'
      }
    }*/
  },
}
