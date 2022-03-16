import { Check } from '@virtualpatterns/mablung-check-dependency'

import Test from 'ava'

const Process = process

Test('default', async (test) => {

  let dependency = await Check()

  test.deepEqual(dependency.missing, {})
  test.deepEqual(dependency.unused, [])

})

Test('section', async (test) => {

  let dependency = await Check(Process.cwd(), {
    'ignoreMatch': [
      '@babel/core',
      '@babel/plugin-syntax-import-meta',
      '@babel/preset-env',
      '@virtualpatterns/babel-plugin-mablung-replace-identifier',
      '@virtualpatterns/babel-plugin-mablung-replace-string-literal',
      '@virtualpatterns/babel-preset-mablung-makefile'
    ]
  })

  test.deepEqual(dependency.section, {})

})
