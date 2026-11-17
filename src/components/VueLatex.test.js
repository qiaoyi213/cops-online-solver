import assert from 'node:assert/strict'
import { test } from 'node:test'
import VueLatex from './VueLatex.js'

test('renders solver formulas and reacts to expression changes', () => {
  const props = { expression: String.raw`H(x)=(\sum_{i=0}^{n}s_ix_i-T)^2`, displayMode: true }
  const render = VueLatex.setup(props)
  assert.equal(render().type, 'div')
  assert.match(render().props.innerHTML, /katex-display/)
  assert.doesNotMatch(render().props.innerHTML, /katex-error/)
  const first = render().props.innerHTML
  props.expression = String.raw`H(x)=\sum_{(u,v)\in E}w_{u,v}(-x_u-x_v+2x_u x_v)`
  assert.notEqual(render().props.innerHTML, first)
  assert.doesNotMatch(render().props.innerHTML, /katex-error/)
})

test('handles invalid formulas and blocks untrusted links', () => {
  const props = { expression: '{', displayMode: false }
  const render = VueLatex.setup(props)
  assert.equal(render().type, 'span')
  assert.match(render().props.innerHTML, /katex-error/)
  props.expression = String.raw`\href{javascript:alert(1)}{click}`
  assert.doesNotMatch(render().props.innerHTML, /href="javascript:/)
})
