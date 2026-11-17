import { h } from 'vue'
import katex from 'katex'

export default {
  props: {
    expression: { type: String, required: true },
    displayMode: Boolean,
  },
  setup: (props) => () => h(props.displayMode ? 'div' : 'span', {
    style: { fontSize: '16px' },
    innerHTML: katex.renderToString(props.expression, {
      displayMode: props.displayMode,
      throwOnError: false,
      trust: false,
    }),
  }),
}
