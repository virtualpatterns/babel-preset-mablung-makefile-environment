const Assert = require('assert')
const FileSystem = require('fs-extra')
const Is = require('@pwn/is')
const Path = require('path')

module.exports = function (api, option) {

  // {
  //   "presets": [
  //     [
  //       "@virtualpatterns/babel-preset-mablung-makefile",
  //       {
  //         "header": {
  //           "content": [
  //           ],
  //           "exclude": [
  //           ]
  //         }
  //       }
  //     ]
  //   ],
  //   "env": {
  //     "commonjs": {
  //       "plugins": [
  //         [
  //           "@virtualpatterns/babel-plugin-mablung-replace-identifier",
  //           {
  //           }
  //         ],
  //         [
  //           "@virtualpatterns/babel-plugin-mablung-replace-string-literal",
  //           {
  //           }
  //         ]
  //       ],
  //       "presets": [
  //           [
  //             "@babel/preset-env",
  //             {
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
  //           }
  //         ]
  //       ]
  //     }
  //   }
  // }

  let path = Path.resolve(`${__dirname}/../babel.config.json`)
  let configuration = FileSystem.readJsonSync(path, { 'encoding': 'utf-8' })

  Assert.strictEqual(configuration.presets[0][0], '@virtualpatterns/babel-preset-mablung-makefile')
  configuration.presets[0][0] = require('@virtualpatterns/babel-preset-mablung-makefile')

  Assert.strictEqual(configuration.env.commonjs.plugins[0][0], '@virtualpatterns/babel-plugin-mablung-replace-identifier')
  configuration.env.commonjs.plugins[0][0] = require('@virtualpatterns/babel-plugin-mablung-replace-identifier')

  Assert.strictEqual(configuration.env.commonjs.plugins[1][0], '@virtualpatterns/babel-plugin-mablung-replace-string-literal')
  configuration.env.commonjs.plugins[1][0] = require('@virtualpatterns/babel-plugin-mablung-replace-string-literal')

  Assert.strictEqual(configuration.env.commonjs.presets[0][0], '@babel/preset-env')
  configuration.env.commonjs.presets[0][0] = require('@babel/preset-env')

  Assert.strictEqual(configuration.env.esmodule.plugins[0], '@babel/plugin-syntax-import-meta')
  configuration.env.esmodule.plugins[0] = require('@babel/plugin-syntax-import-meta')

  Assert.strictEqual(configuration.env.esmodule.plugins[1][0], '@virtualpatterns/babel-plugin-mablung-replace-identifier')
  configuration.env.esmodule.plugins[1][0] = require('@virtualpatterns/babel-plugin-mablung-replace-identifier')
  
  let exclude = null
  exclude = option.header?.exclude || []
  exclude = Is.array(exclude) ? exclude : [ exclude ]

  configuration.presets[0][1].header.exclude = exclude

  let content = null
  content = option.header?.content || ['!npx mablung-makefile-environment get-header']
  content = Is.array(content) ? content : [ content ]

  configuration.presets[0][1].header.content = content

  return configuration

}
