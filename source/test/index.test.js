import Babel from '@babel/core'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const Resolve = __resolve

const SourceFilePath = FilePath.replace('/release/', '/source/')
const SourceFolderPath = Path.dirname(SourceFilePath)

Test('index.cjs', async (test) => {

  let codeIn = 'export const OK = true'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.cjs'),
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
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

Test('index.cjs using __filePath', async (test) => {

  let codeIn = 'export const FilePath = __filePath'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.cjs'),
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
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

Test('index.cjs using __folderPath', async (test) => {

  let codeIn = 'export const FolderPath = __folderPath'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.cjs'),
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '"use strict";\n' +
                        '\n' +
                        'Object.defineProperty(exports, "__esModule", {\n' +
                        '  value: true\n' +
                        '});\n' +
                        'exports.FolderPath = void 0;\n' +
                        'const FolderPath = __dirname;\n' +
                        'exports.FolderPath = FolderPath;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('index.cjs using __resolve', async (test) => {

  let codeIn = 'export function GetFilePath() { return __resolve(\'./index.js\') }'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.cjs'),
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '"use strict";\n' +
                        '\n' +
                        'Object.defineProperty(exports, "__esModule", {\n' +
                        '  value: true\n' +
                        '});\n' +
                        'exports.GetFilePath = GetFilePath;\n' +
                        '\n' +
                        'function GetFilePath() {\n' +
                        '  return ((...argument) => Promise.resolve(require.resolve(...argument)))(\'./index.js\');\n' +
                        '}'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('index.js', async (test) => {

  let codeIn = 'export const OK = true'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.js'),
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'export const OK = true;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('index.js using __filePath', async (test) => {

  let codeIn = 'export const FilePath = __filePath'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.js'),
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'import _URL from "url";\n' +
                        'export const FilePath = _URL.fileURLToPath(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('index.js using __folderPath', async (test) => {

  let codeIn = 'export const FolderPath = __folderPath'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.js'),
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'import _Path from "path";\n' +
                        'import _URL from "url";\n' +
                        'export const FolderPath = _Path.dirname(_URL.fileURLToPath(import.meta.url));'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('index.js using __resolve', async (test) => {

  let codeIn = 'export function GetFilePath() { return __resolve(\'./index.js\') }'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.js'),
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'import _URL from "url";\n' +
                        'export function GetFilePath() {\n' +
                        '  return ((...argument) => import.meta.resolve(...argument).then(url => _URL.fileURLToPath(url)))(\'./index.js\');\n' +
                        '}'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('index.js using from-esmodule-to-commonjs', async (test) => {

  let codeIn = 'export const OK = true'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.js'),
    'envName': 'from-esmodule-to-commonjs',
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
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

Test('index.js using from-esmodule-to-commonjs and __filePath', async (test) => {

  let codeIn = 'export const FilePath = __filePath'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.js'),
    'envName': 'from-esmodule-to-commonjs',
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
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

Test('index.js using from-esmodule-to-commonjs and __folderPath', async (test) => {

  let codeIn = 'export const FolderPath = __folderPath'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.js'),
    'envName': 'from-esmodule-to-commonjs',
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '"use strict";\n' +
                        '\n' +
                        'Object.defineProperty(exports, "__esModule", {\n' +
                        '  value: true\n' +
                        '});\n' +
                        'exports.FolderPath = void 0;\n' +
                        'const FolderPath = __dirname;\n' +
                        'exports.FolderPath = FolderPath;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('index.js using from-esmodule-to-commonjs and __resolve', async (test) => {

  let codeIn = 'export function GetFilePath() { return __resolve(\'./index.js\') }'
  let option = {
    'root': SourceFolderPath,
    'filename': Path.resolve(SourceFolderPath, 'index.js'),
    'envName': 'from-esmodule-to-commonjs',
    'presets': [
      await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = '"use strict";\n' +
                        '\n' +
                        'Object.defineProperty(exports, "__esModule", {\n' +
                        '  value: true\n' +
                        '});\n' +
                        'exports.GetFilePath = GetFilePath;\n' +
                        '\n' +
                        'function GetFilePath() {\n' +
                        '  return ((...argument) => Promise.resolve(require.resolve(...argument)))("./index.cjs");\n' +
                        '}'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})


// Test('presets: [ [ \'...\', { header: { exclude: \'...\' } } ] ] on index.cjs', async (test) => {

//   let codeIn = 'export const OK = true'
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.cjs'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'exclude': Path.resolve(SourceFolderPath, 'index.cj')`
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = '"use strict";\n' +
//                         '\n' +
//                         'Object.defineProperty(exports, "__esModule", {\n' +
//                         '  value: true\n' +
//                         '});\n' +
//                         'exports.OK = void 0;\n' +
//                         'const OK = true;\n' +
//                         'exports.OK = OK;'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })

// Test('presets: [ [ \'...\', { header: { exclude: [ ... ] } } ] ] on index.js', async (test) => {

//   let codeIn = 'export const OK = true'
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.js'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'exclude': [
//               Path.resolve(SourceFolderPath, 'index.j')`
//             ]
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = 'export const OK = true;'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })

// Test('presets: [ [ \'...\', { header: { content: \'...\' } } ] ] on index.js', async (test) => {

//   let codeIn = 'export const OK = true'
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.js'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'content': '...'
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = '/**\n' +
//                         '* ...\n' +
//                         '**/\n' +
//                         '\n' +
//                         'export const OK = true;'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })

// Test('presets: [ [ \'...\', { header: { content: [ ... ] } } ] ] on index.js', async (test) => {

//   let codeIn = 'export const OK = true'
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.js'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'content': [
//               '...'
//             ]
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = '/**\n' +
//                         '* ...\n' +
//                         '**/\n' +
//                         '\n' +
//                         'export const OK = true;'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })

// Test.serial('presets: [ [ \'...\', ... ] ] on index.cjs using __filePath', async (test) => {

//   let codeIn = 'export const FilePath = __filePath'
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.cjs'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'exclude': Path.resolve(SourceFolderPath, 'index.cj')`
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = '"use strict";\n' +
//                         '\n' +
//                         'Object.defineProperty(exports, "__esModule", {\n' +
//                         '  value: true\n' +
//                         '});\n' +
//                         'exports.FilePath = void 0;\n' +
//                         'const FilePath = __filename;\n' +
//                         'exports.FilePath = FilePath;'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })

// Test.serial('presets: [ [ \'...\', ... ] ] on index.cjs using __resolve', async (test) => {

//   let codeIn = 'export const Resolve = __resolve'
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.cjs'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'exclude': Path.resolve(SourceFolderPath, 'index.cj')`
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = '"use strict";\n' +
//                         '\n' +
//                         'Object.defineProperty(exports, "__esModule", {\n' +
//                         '  value: true\n' +
//                         '});\n' +
//                         'exports.Resolve = void 0;\n' +
//                         'const Resolve = resolve;\n' +
//                         'exports.Resolve = Resolve;'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })

// Test.serial('presets: [ [ \'...\', ... ] ] on index.cjs using \'../index.js\'', async (test) => {

//   let codeIn = 'export const Path = \'../index.js\''
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.cjs'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'exclude': Path.resolve(SourceFolderPath, 'index.cj')`
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = '"use strict";\n' +
//                         '\n' +
//                         'Object.defineProperty(exports, "__esModule", {\n' +
//                         '  value: true\n' +
//                         '});\n' +
//                         'exports.Path = void 0;\n' +
//                         'const Path = "../index.cjs";\n' +
//                         'exports.Path = Path;'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })

// Test.serial('presets: [ [ \'...\', ... ] ] on index.js using __filePath', async (test) => {

//   Process.env.NODE_ENV = 'esmodule'

//   let codeIn = 'export const FilePath = __filePath'
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.js'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'exclude': Path.resolve(SourceFolderPath, 'index.j')`
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = 'import _URL from "url";\n' +
//                         'export const FilePath = _URL.fileURLToPath(import.meta.url);'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })

// Test.serial('presets: [ [ \'...\', ... ] ] on index.js using __resolve', async (test) => {

//   Process.env.NODE_ENV = 'esmodule'

//   let codeIn = 'export const Resolve = __resolve'
//   let option = {
//     'root': SourceFolderPath,
//     'filename': Path.resolve(SourceFolderPath, 'index.js'),
//     'presets': [
//       [
//         await Resolve('@virtualpatterns/babel-preset-mablung-makefile-environment'),
//         {
//           'header': {
//             'exclude': Path.resolve(SourceFolderPath, 'index.j')`
//           }
//         }
//       ]
//     ]
//   }

//   let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
//   let expectedCodeOut = 'import { createResolve as _createResolve } from "module";\n' +
//                         'export const Resolve = _createResolve(import.meta.url);'

//   // test.log(actualCodeOut)
//   test.is(actualCodeOut, expectedCodeOut)

// })
