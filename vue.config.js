module.exports = {
  publicPath: '/nokiatwin/',
  devServer: {
    host: 'localhost',
    //proxy: 'https://social-dynamics.net'.
    proxy: 'http://localhost:80'
  },
}
