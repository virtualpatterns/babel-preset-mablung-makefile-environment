import { createRequire as CreateRequire } from 'module'
import Babel from '@babel/core'
import Test from 'ava'

import { Package } from './library/package.js'

const Require = CreateRequire(import.meta.url)

Test('source/index.cjs', async (test) => {

  let codeIn = 'export const OK = true'
  let option = {
    'babelrc': false,
    'envName': 'commonjs',
    'filename': 'source/index.cjs',
    'presets': [
      Require.resolve('../index.cjs')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '/**\n' +
                        '* \n' +
                        '* Package:     @virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Description: TBD\n' +
                        `* Version:     ${Package.version}\n` +
                        '* License:     GPL-3.0+\n' +
                        '* Author:      virtualpatterns.com <code@virtualpatterns.com> (http://www.virtualpatterns.com)\n' +
                        '* Repository:  https://github.com/virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Source:      undefined\n' +
                        '* \n' +
                        '**/\n' +
                        '"use strict";\n' +
                        '\n' +
                        'Object.defineProperty(exports, "__esModule", {\n' +
                        '  value: true\n' +
                        '});\n' +
                        'exports.OK = void 0;\n' +
                        '\n' +
                        'const OK = true;\n' +
                        'exports.OK = OK;'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('source/index.cjs { header: { exclude: [ ... ] } }', async (test) => {

  let codeIn = 'export const OK = true'
  let option = {
    'babelrc': false,
    'envName': 'commonjs',
    'filename': 'source/index.cjs',
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': [
              'source/index.cjs'
            ]
          }
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '"use strict";\n' +
    '\n' +
    'Object.defineProperty(exports, "__esModule", {\n' +
    '  value: true\n' +
    '});\n' +
    'exports.OK = void 0;\n' +
    'const OK = true;\n' +
    'exports.OK = OK;'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('source/index.js', async (test) => {

  let codeIn = 'export const OK = true'
  let option = {
    'babelrc': false,
    'envName': 'esmodule',
    'filename': 'source/index.js',
    'presets': [
      Require.resolve('../index.cjs')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '/**\n' +
                        '* \n' +
                        '* Package:     @virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Description: TBD\n' +
                        `* Version:     ${Package.version}\n` +
                        '* License:     GPL-3.0+\n' +
                        '* Author:      virtualpatterns.com <code@virtualpatterns.com> (http://www.virtualpatterns.com)\n' +
                        '* Repository:  https://github.com/virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Source:      undefined\n' +
                        '* \n' +
                        '**/\n' +
                        '\n' +
                        'export const OK = true;'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('source/index.js { header: { exclude: [ ... ] } }', async (test) => {

  let codeIn = 'export const OK = true'
  let option = {
    'babelrc': false,
    'envName': 'esmodule',
    'filename': 'source/index.js',
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': [
              'source/index.js'
            ]
          }
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'export const OK = true;'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('source/index.cjs using __filePath', async  (test) => {

  let codeIn = 'console.log(__filePath)'
  let option = {
    'babelrc': false,
    'envName': 'commonjs',
    'filename': 'source/index.cjs',
    'presets': [
      Require.resolve('../index.cjs')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '/**\n' +
                        '* \n' +
                        '* Package:     @virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Description: TBD\n' +
                        `* Version:     ${Package.version}\n` +
                        '* License:     GPL-3.0+\n' +
                        '* Author:      virtualpatterns.com <code@virtualpatterns.com> (http://www.virtualpatterns.com)\n' +
                        '* Repository:  https://github.com/virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Source:      undefined\n' +
                        '* \n' +
                        '**/\n' +
                        '"use strict";\n' +
                        '\n' +
                        'console.log(__filename);'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('source/index.cjs using __require', async (test) => {

  let codeIn = 'console.log(__require.resolve(\'./index.cjs\'))'
  let option = {
    'babelrc': false,
    'envName': 'commonjs',
    'filename': 'source/index.cjs',
    'presets': [
      Require.resolve('../index.cjs')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '/**\n' +
                        '* \n' +
                        '* Package:     @virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Description: TBD\n' +
                        `* Version:     ${Package.version}\n` +
                        '* License:     GPL-3.0+\n' +
                        '* Author:      virtualpatterns.com <code@virtualpatterns.com> (http://www.virtualpatterns.com)\n' +
                        '* Repository:  https://github.com/virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Source:      undefined\n' +
                        '* \n' +
                        '**/\n' +
                        '"use strict";\n' +
                        '\n' +
                        'console.log(require.resolve(\'./index.cjs\'));'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('source/index.cjs using .js', async (test) => {

  let codeIn = 'console.log(\'./index.js\')'
  let option = {
    'babelrc': false,
    'envName': 'commonjs',
    'filename': 'source/index.cjs',
    'presets': [
      Require.resolve('../index.cjs')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '/**\n' +
                        '* \n' +
                        '* Package:     @virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Description: TBD\n' +
                        `* Version:     ${Package.version}\n` +
                        '* License:     GPL-3.0+\n' +
                        '* Author:      virtualpatterns.com <code@virtualpatterns.com> (http://www.virtualpatterns.com)\n' +
                        '* Repository:  https://github.com/virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Source:      undefined\n' +
                        '* \n' +
                        '**/\n' +
                        '"use strict";\n' +
                        '\n' +
                        'console.log("./index.cjs");'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('source/index.js using __filePath', async (test) => {

  let codeIn = 'console.log(__filePath)'
  let option = {
    'babelrc': false,
    'envName': 'esmodule',
    'filename': 'source/index.js',
    'presets': [
      Require.resolve('../index.cjs')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '/**\n' +
                        '* \n' +
                        '* Package:     @virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Description: TBD\n' +
                        `* Version:     ${Package.version}\n` +
                        '* License:     GPL-3.0+\n' +
                        '* Author:      virtualpatterns.com <code@virtualpatterns.com> (http://www.virtualpatterns.com)\n' +
                        '* Repository:  https://github.com/virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Source:      undefined\n' +
                        '* \n' +
                        '**/\n' +
                        'import _URL from "url";\n' +
                        '\n' +
                        'console.log(_URL.fileURLToPath(import.meta.url));'

  test.is(actualCodeOut, expectedCodeOut)

})

Test('source/index.js using __require', async (test) => {

  let codeIn = 'console.log(__require.resolve(\'./index.js\'))'
  let option = {
    'babelrc': false,
    'envName': 'esmodule',
    'filename': 'source/index.js',
    'presets': [
      Require.resolve('../index.cjs')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '/**\n' +
                        '* \n' +
                        '* Package:     @virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Description: TBD\n' +
                        `* Version:     ${Package.version}\n` +
                        '* License:     GPL-3.0+\n' +
                        '* Author:      virtualpatterns.com <code@virtualpatterns.com> (http://www.virtualpatterns.com)\n' +
                        '* Repository:  https://github.com/virtualpatterns/babel-preset-mablung-makefile-environment\n' +
                        '* Source:      undefined\n' +
                        '* \n' +
                        '**/\n' +
                        'import { createRequire as _createRequire } from "module";\n' +
                        '\n' +
                        'console.log(_createRequire(import.meta.url).resolve(\'./index.js\'));'

  test.is(actualCodeOut, expectedCodeOut)

})
