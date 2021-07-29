import Test from 'ava'

import Configuration from '../index.cjs'

Test('index.cjs', (test) => {
  test.deepEqual(Configuration().presets.length, 1)
})
