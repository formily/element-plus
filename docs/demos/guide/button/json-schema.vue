<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Input, Button, Select } from '@niceone/formily-element-plus'

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    textarea: {
      type: 'string',
      title: '文本框',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
    },
    age: {
      type: 'string',
      title: '年龄',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'integer',
      'x-component-props': {},
      'x-decorator-props': {},
      name: 'age',
      required: true,
      'x-designable-id': 's6b842898ol',
    },
    bro1x999900: {
      type: 'string',
      'x-component': 'Button',
      'x-component-props': {
        btnText: '重置',
        type: 'default',
        btnType: 'reset',
      },
      'x-designable-id': 'bro1x999900',
    },
    crvaand6cyt: {
      type: 'string',
      'x-component': 'Button',
      'x-component-props': {
        btnText: '提交',
      },
      'x-designable-id': 'crvaand6cyt',
    },
    '91kpz9objwj': {
      title: '性别',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-validator': [],
      'x-component-props': {},
      'x-decorator-props': {},
      enum: [
        {
          children: [],
          label: '男',
          value: 'man',
        },
        {
          children: [],
          label: '女',
          value: 'women',
        },
      ],
      required: true,
      'x-designable-id': '91kpz9objwj',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    Button,
    Select,
  },
})

const onSubmit = (value) => {
  console.log(value)
}
</script>
