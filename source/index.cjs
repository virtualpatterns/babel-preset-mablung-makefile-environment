const Is = require('@pwn/is')
const Path = require('jsonpath')

module.exports = function () {

  let configuration = require('@virtualpatterns/mablung-makefile-environment/babel.json')

  let plugins = Path.query(configuration, '$..plugins')

  plugins.forEach((plugins) => {

    plugins.forEach((plugin, index, plugins) => {

      if (Is.array(plugin)) {
        // console.log(`plugin[0] = ${plugin[0] == 'importMeta' ? `'${plugin[0]}'` : `require('${plugin[0]}')`}`)
        plugin[0] = plugin[0] == 'importMeta' ? plugin[0] : require(plugin[0])
      } else {
        // console.log(`plugins[${index}] = ${plugin == 'importMeta' ? `'${plugin}'` : `require('${plugin}')`}`)
        plugins[index] = plugin == 'importMeta' ? plugin : require(plugin)
      }

    })

  })

  let presets = Path.query(configuration, '$..presets')

  presets.forEach((presets) => {

    presets.forEach((preset, index, presets) => {

      if (Is.array(preset)) {
        // console.log(`preset[0] = require('${preset[0]}')`)
        preset[0] = require(preset[0])
      } else {
        // console.log(`presets[${index}] = require('${preset}')`)
        presets[index] = require(preset)
      }

    })

  })

  return configuration

}

// {
//   "presets": [
//     "@virtualpatterns/babel-preset-mablung-makefile"
//   ],
//     "env": {
//     "commonjs": {
//       "plugins": [
//         [
//           "@virtualpatterns/babel-plugin-mablung-replace-identifier",
//           {
//             "rule": [
//               {
//                 "searchFor": "__filePath",
//                 "replaceWith": "__filename"
//               },
//               {
//                 "searchFor": "__require",
//                 "replaceWith": "require"
//               }
//             ]
//           }
//         ],
//         [
//           "@virtualpatterns/babel-plugin-mablung-replace-string-literal",
//           {
//             "rule": [
//               {
//                 "searchFor": "^(\\.{1,2}\\/.*?)\\.js$",
//                 "replaceWith": "$1.cjs"
//               }
//             ]
//           }
//         ]
//       ],
//         "presets": [
//           [
//             "@babel/preset-env",
//             {
//               "targets": {
//                 "node": "current"
//               }
//             }
//           ]
//         ]
//     },
//     "esmodule": {
//       "plugins": [
//         "@babel/plugin-syntax-import-meta",
//         [
//           "@virtualpatterns/babel-plugin-mablung-replace-identifier",
//           {
//             "rule": [
//               {
//                 "searchFor": "__filePath",
//                 "replaceWith": "__importIdentifier.fileURLToPath(import.meta.url)",
//                 "parserOption": {
//                   "plugins": [
//                     "importMeta"
//                   ],
//                   "sourceType": "module"
//                 },
//                 "addImport": [
//                   {
//                     "type": "default",
//                     "source": "url",
//                     "option": {
//                       "nameHint": "URL"
//                     }
//                   }
//                 ]
//               },
//               {
//                 "searchFor": "__require",
//                 "replaceWith": "__importIdentifier(import.meta.url)",
//                 "parserOption": {
//                   "plugins": [
//                     "importMeta"
//                   ],
//                   "sourceType": "module"
//                 },
//                 "addImport": [
//                   {
//                     "type": "named",
//                     "name": "createRequire",
//                     "source": "module"
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       ]
//     }
//   }
// }
