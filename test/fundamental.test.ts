import { bundleAndRun, bundle } from './utils'
import { baseCompile } from '@intlify/message-compiler'
import { MessageFunction } from '@intlify/runtime'
import prettier from 'prettier'

test('basic', async () => {
  const { module } = await bundleAndRun('basic.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('special characters', async () => {
  const { module } = await bundleAndRun('special-char.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('multiple', async () => {
  const { module } = await bundleAndRun('multiple.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('import', async () => {
  const { module } = await bundleAndRun('import.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('locale attr', async () => {
  const { module } = await bundleAndRun('locale.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('locale attr and basic', async () => {
  const { module } = await bundleAndRun('locale-mix.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('locale attr and import', async () => {
  const { module } = await bundleAndRun('locale-import.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('yaml', async () => {
  const { module } = await bundleAndRun('yaml.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('json5', async () => {
  const { module } = await bundleAndRun('json5.vue')
  expect(module.__i18n).toMatchSnapshot()
})

test('pre compile', async () => {
  const options: prettier.Options = { parser: 'babel' }
  const { module } = await bundleAndRun('compile.vue', bundle, {
    preCompile: true
  })
  const { functions } = module.__i18n()
  for (const [key, value] of Object.entries(functions)) {
    const msg = value as MessageFunction
    const data = JSON.parse(key)
    const result = baseCompile(data.s, { mode: 'arrow' })
    expect(prettier.format(msg.toString(), options)).toMatch(
      prettier.format(result.code, options)
    )
  }
})

test('global', async () => {
  const { module } = await bundleAndRun('global.vue')
  expect(module.__i18n).toBeUndefined()
  expect(module.__i18nGlobal).toMatchSnapshot()
})

test('global and local', async () => {
  const { module } = await bundleAndRun('global-mix.vue')
  expect(module.__i18n).toMatchSnapshot()
  expect(module.__i18nGlobal).toMatchSnapshot()
})
