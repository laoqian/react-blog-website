
const config    = require('../config/base.config')
const debug     = require('debug')('app:bin:compile')


debug('创建webpack编译器.')
const compiler = require('webpack')(require('../config/webpack.config'))

compiler.run(function (err, stats) {
  const jsonStats = stats.toJson()

  debug('Webpack编译完成.')

  if (err) {
    debug('Webpack编译器产生致命错误.', err)
    process.exit(1)
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    console.log(jsonStats.errors)
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')

    if (config.compiler_fail_on_warning) {
      process.exit(1)
    }
  } else {
    debug('编译成功!')
  }

  config.copyStatic()
})
