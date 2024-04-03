import { defineComponent, SetupContext } from 'vue'
import { h, useParentForm } from '@formily/vue'
import { IFormFeedback } from '@formily/core'
import { observer } from '@formily/reactive-vue'

import type { ElButton as ElButtonProps } from 'element-plus'
import { ElButton } from 'element-plus'

export type IButtonProps = {
  onClick?: (e: MouseEvent) => any
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  btnText?: string
  btnType?: string
} & typeof ElButtonProps

export const Button = observer(
  defineComponent({
    name: 'Button',
    props: ['onClick', 'onSubmit', 'onSubmitSuccess', 'onSubmitFailed'],
    setup(props, { attrs, slots }: SetupContext) {
      const formRef = useParentForm()

      return () => {
        const {
          onClick = attrs?.onClick,
          onSubmit = attrs?.onSubmit,
          onSubmitSuccess = attrs?.onSubmitSuccess,
          onSubmitFailed = attrs?.onSubmitFailed,
          btnText = attrs?.btnText,
          btnType = attrs?.btnType,
        } = props

        const form = formRef?.value
        return h(
          ElButton,
          {
            nativeType: attrs?.submit ? 'button' : 'submit',
            type: 'primary',
            ...attrs,
            loading:
              attrs.loading !== undefined ? attrs.loading : form?.submitting,
            onClick: (e: any) => {
              console.log('click type:', btnType || 'submit')
              if (!btnType || btnType === 'submit') {
                form
                  ?.submit(onSubmit as (e: any) => void)
                  .then(onSubmitSuccess as (e: any) => void)
                  .catch(onSubmitFailed as (e: any) => void)
              } else if (btnType === 'reset') {
                form?.reset()
              } else {
                onClick && onClick()
              }

              //   if (onClick) {
              //     if (onClick(e) === false) return
              //   }
              //   if (onSubmit) {
              //     form
              //       ?.submit(onSubmit as (e: any) => void)
              //       .then(onSubmitSuccess as (e: any) => void)
              //       .catch(onSubmitFailed as (e: any) => void)
              //   }
            },
          },
          btnText || '请修改按钮文案'
        )
      }
    },
  })
)

export default Button
