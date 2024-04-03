import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { defineComponent, h } from 'vue'
import { PreviewText } from '../preview-text'

import { ElSelect, ElOption } from 'element-plus'
import { resolveComponent, transformComponent } from '../__builtins__'

export type SelectProps = typeof ElSelect & {
  options?: Array<typeof ElOption>
}

const TransformElSelect = transformComponent<SelectProps>(ElSelect, {
  change: 'update:modelValue',
})

const InnerSelect = connect(
  TransformElSelect,
  mapProps({ value: 'modelValue', readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Select)
)

const SelectOption = defineComponent({
  name: 'FSelect',
  props: ['options'],
  setup(customProps, { attrs, slots }) {
    return () => {
      console.log('options', customProps.options, customProps.enum)
      let options = customProps.options || []
      // if (!customProps.options || customProps.options?.length === 0) {
      //   options = customProps.enum || []
      // }
      console.log('options result', options.length)
      // [{label: '选项1', value: 1}]

      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option: any) => {
                  if (typeof option === 'string') {
                    return h(
                      ElOption,
                      { key: option, value: option, label: option }
                      // {
                      //   default: () => [
                      //     resolveComponent(slots?.option ?? option, { option }),
                      //   ],
                      // }
                    )
                  } else {
                    return h(
                      ElOption,
                      {
                        key: option.value,
                        ...option,
                      }
                      // {
                      //   default: () => [
                      //     resolveComponent(slots?.option ?? option, { option }),
                      //   ],
                      // }
                    )
                  }
                }),
            }
          : slots
      return h(
        InnerSelect,
        {
          ...attrs,
        },
        children
      )
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select
