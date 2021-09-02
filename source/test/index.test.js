import Babel from '@babel/core'
import Path from 'path'
import Test from 'ava'

import { Package } from './library/package.js'

const Process = process
const Require = __require
const SourceFilePath = __filePath.replace('release/', 'source/')
const SourceFolderPath = Path.dirname(SourceFilePath).replace('release/', 'source/')

Test.serial('presets: [ index.cjs ] on index.cjs', async (test) => {

  Process.env.NODE_ENV = 'commonjs'

  let codeIn = 'export const OK = true'
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.cjs`,
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
                        '* Environment: commonjs\n' +
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

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test.serial('presets: [ index.cjs ] on index.js', async (test) => {

  Process.env.NODE_ENV = 'esmodule'

  let codeIn = 'export const OK = true'
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.js`,
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
                        '* Environment: esmodule\n' +
                        '* \n' +
                        '**/\n' +
                        '\n' +
                        'export const OK = true;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test.serial('presets: [ [ index.cjs, { header: { exclude: \'...\' } } ] ] on index.cjs', async (test) => {

  Process.env.NODE_ENV = 'commonjs'

  let codeIn = 'export const OK = true'
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.cjs`,
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': `${SourceFolderPath}/index.cjs`
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

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test.serial('presets: [ [ index.cjs, { header: { exclude: [ ... ] } } ] ] on index.js', async (test) => {

  Process.env.NODE_ENV = 'esmodule'

  let codeIn = 'export const OK = true'
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.js`,
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': [
              `${SourceFolderPath}/index.js`
            ]
          }
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'export const OK = true;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test.serial('presets: [ [ index.cjs, ... ] ] on index.cjs using __filePath', async (test) => {

  Process.env.NODE_ENV = 'commonjs'

  let codeIn = 'export const FilePath = __filePath'
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.cjs`,
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': `${SourceFolderPath}/index.cjs`
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
                        'exports.FilePath = void 0;\n' +
                        'const FilePath = __filename;\n' +
                        'exports.FilePath = FilePath;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test.serial('presets: [ [ index.cjs, ... ] ] on index.cjs using __require', async (test) => {

  Process.env.NODE_ENV = 'commonjs'

  let codeIn = 'export const Require = __require'
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.cjs`,
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': `${SourceFolderPath}/index.cjs`
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
                        'exports.Require = void 0;\n' +
                        'const Require = require;\n' +
                        'exports.Require = Require;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test.serial('presets: [ [ index.cjs, ... ] ] on index.cjs using \'../index.js\'', async (test) => {

  Process.env.NODE_ENV = 'commonjs'

  let codeIn = 'export const Path = \'../index.js\''
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.cjs`,
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': `${SourceFolderPath}/index.cjs`
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
                        'exports.Path = void 0;\n' +
                        'const Path = "../index.cjs";\n' +
                        'exports.Path = Path;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test.serial('presets: [ [ index.cjs, ... ] ] on index.js using __filePath', async (test) => {

  Process.env.NODE_ENV = 'esmodule'

  let codeIn = 'export const FilePath = __filePath'
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.js`,
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': `${SourceFolderPath}/index.js`
          }
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'import _URL from "url";\n' +
                        'export const FilePath = _URL.fileURLToPath(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test.serial('presets: [ [ index.cjs, ... ] ] on index.js using __require', async (test) => {

  Process.env.NODE_ENV = 'esmodule'

  let codeIn = 'export const Require = __require'
  let option = {
    'root': SourceFolderPath,
    'filename': `${SourceFolderPath}/index.js`,
    'presets': [
      [
        Require.resolve('../index.cjs'),
        {
          'header': {
            'exclude': `${SourceFolderPath}/index.js`
          }
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\n' +
                        'export const Require = _createRequire(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})
