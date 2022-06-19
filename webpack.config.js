//让webstorm支持别名解析
//让ide自动跳转

const path= require('path')

module.exports={
  context: path.resolve(__dirname,'./'),
  resolve: {
    extensions: ['.js','.vue','.json'],
    alias: {
      '@': path.resolve('src'),
    }
  }

}
