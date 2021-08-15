const Clone = require('clone')
const Is = require('@pwn/is')

const Package = require('../package.json')

module.exports = function (api, option) {

  // {
  //   "presets": [
  //     [
  //       "@virtualpatterns/babel-preset-mablung-makefile",
  //       {
  //         "header": {
  //           "exclude": [
  //             "source/esmodule/sandbox",
  //             "source/esmodule/test",
  //             "source/test",
  //             "source/index.js"
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

  let configuration = Clone(Package.babel)
  // console.dir(configuration, { 'depth': null })

  let name = null
  name = configuration.presets[0][0]
  // console.log(`configuration.presets[0][0] = require('${name}')`)
  configuration.presets[0][0] = require(name)

  let exclude = null
  exclude = option.header?.exclude || []
  exclude = Is.array(exclude) ? exclude : [ exclude ]

  // console.log(`configuration.presets[0][1].header.exclude = ${exclude.length == 0 ? '[]' : `['${exclude.join('\', \'')}']`}`)
  configuration.presets[0][1].header.exclude = exclude

  name = configuration.env.commonjs.plugins[0][0]
  // console.log(`configuration.env.commonjs.plugins[0][0] = require('${name}')`)
  configuration.env.commonjs.plugins[0][0] = require(name)

  name = configuration.env.commonjs.plugins[1][0]
  // console.log(`configuration.env.commonjs.plugins[1][0] = require('${name}')`)
  configuration.env.commonjs.plugins[1][0] = require(name)

  name = configuration.env.commonjs.presets[0][0]
  // console.log(`configuration.env.commonjs.presets[0][0] = require('${name}')`)
  configuration.env.commonjs.presets[0][0] = require(name)

  name = configuration.env.esmodule.plugins[0]
  // console.log(`configuration.env.esmodule.plugins[0] = require('${name}')`)
  configuration.env.esmodule.plugins[0] = require(name)

  name = configuration.env.esmodule.plugins[1][0]
  // console.log(`configuration.env.esmodule.plugins[1][0] = require('${name}')`)
  configuration.env.esmodule.plugins[1][0] = require(name)

  return configuration

}
