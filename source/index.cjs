import Assert from 'assert'
import FileSystem from 'fs-extra'
import Json from 'json5'
import Path from 'path'

module.exports = function (api, option) {

  // {
  //   "presets": [
  //     "@virtualpatterns/babel-preset-mablung-makefile"
  //   ],
  //     "overrides": [
  //       {
  //         "include": [
  //         ],
  //         "plugins": [
  //           [
  //             "@virtualpatterns/babel-plugin-mablung-replace-identifier",
  //             {
  //             }
  //           ]
  //         ]
  //       }
  //     ],
  //       "plugins": [
  //         "@babel/plugin-syntax-import-meta",
  //         [
  //           "@virtualpatterns/babel-plugin-mablung-replace-identifier",
  //           {
  //           }
  //         ]
  //       ],
  //         "env": {
  //     "from-esmodule-to-commonjs": {
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
  //         "presets": [
  //           [
  //             "@babel/preset-env",
  //             {
  //             }
  //           ]
  //         ]
  //     }
  //   }
  // }

  let configuration = Json.parse(FileSystem.readFileSync(Path.resolve(__dirname, '../babel.config.json'), { 'encoding': 'utf-8' }))

  // preset
  Assert.strictEqual(configuration.presets[0], '@virtualpatterns/babel-preset-mablung-makefile')
  configuration.presets[0] = require(configuration.presets[0])

  // overrides
  Assert.strictEqual(configuration.overrides[0].plugins[0][0], '@virtualpatterns/babel-plugin-mablung-replace-identifier')
  configuration.overrides[0].plugins[0][0] = require(configuration.overrides[0].plugins[0][0])

  // default plugin
  Assert.strictEqual(configuration.plugins[0], '@babel/plugin-syntax-import-meta')
  configuration.plugins[0] = require(configuration.plugins[0])

  Assert.strictEqual(configuration.plugins[1][0], '@virtualpatterns/babel-plugin-mablung-replace-identifier')
  configuration.plugins[1][0] = require(configuration.plugins[1][0])

  // env from-esmodule-to-commonjs
  Assert.strictEqual(configuration.env['from-esmodule-to-commonjs'].plugins[0][0], '@virtualpatterns/babel-plugin-mablung-replace-identifier')
  configuration.env['from-esmodule-to-commonjs'].plugins[0][0] = require(configuration.env['from-esmodule-to-commonjs'].plugins[0][0])

  Assert.strictEqual(configuration.env['from-esmodule-to-commonjs'].plugins[1][0], '@virtualpatterns/babel-plugin-mablung-replace-string-literal')
  configuration.env['from-esmodule-to-commonjs'].plugins[1][0] = require(configuration.env['from-esmodule-to-commonjs'].plugins[1][0])

  Assert.strictEqual(configuration.env['from-esmodule-to-commonjs'].presets[0][0], '@babel/preset-env')
  configuration.env['from-esmodule-to-commonjs'].presets[0][0] = require(configuration.env['from-esmodule-to-commonjs'].presets[0][0])

  return configuration

}
