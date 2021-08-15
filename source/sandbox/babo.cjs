// import Is from '@pwn/is'
// import Path from 'jsonpath'

// const Configuration = {
//   'plugins': [
//     'a',
//     [
//       'b',
//       {
//         'c': true
//       }
//     ]
//   ],
//   'env': {
//     'commonjs': {
//       'plugins': [
//         'c',
//         [
//           'd',
//           {
//             'e': true
//           }
//         ]
//       ]
//     },
//     'esmodule': {
//       'plugins': [
//         'f',
//         [
//           'g',
//           {
//             'h': true
//           }
//         ]
//       ]
//     }
//   }
// }

// let plugins = Path.query(Configuration, '$..plugins')

// plugins.forEach((plugins) => {

//   plugins.forEach((plugin, index, plugins) => {

//     if (Is.array(plugin)) {
//       // console.log(`plugin[0] = '${plugin[0] == 'importMeta' ? plugin[0] : `-${plugin[0]}-`}'`)
//       plugin[0] = plugin[0] == 'importMeta' ? plugin[0] : `-${plugin[0]}-`
//     } else {
//       // console.log(`plugins[${index}] = '${plugin == 'importMeta' ? plugin : `-${plugin}-`}'`)
//       plugins[index] = plugin == 'importMeta' ? plugin : `-${plugin}-`
//     }

//   })

// })

// console.dir(Configuration, { 'depth': null })

// // let preset = null
// // preset = Path.query(Configuration, '$..presets[*]')
// // preset = preset.map((preset) => Is.array(preset) ? preset[0] : preset)
// // preset = preset.map((preset) => GetDependencyName(preset))
