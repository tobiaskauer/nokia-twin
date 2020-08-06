module.exports = {
  publicPath: '/nokiatwin/',
  devServer: {
    host: 'localhost',
    proxy: 'http://social-dynamics.net' //avoid CORS errors when running development server
  },
}
