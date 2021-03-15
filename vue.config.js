module.exports = {
  publicPath: '/openinc/',
  devServer: {
    host: 'localhost',
    proxy: 'https://social-dynamics.net',
    //proxy: 'http://localhost:80'
  },
}
