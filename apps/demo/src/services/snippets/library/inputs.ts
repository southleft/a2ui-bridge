/**
 * Input Snippets
 *
 * Pre-built form input components for rapid UI composition.
 */

import type { Snippet } from '../types';

export const textFieldSnippet: Snippet = {
  id: 'text-field',
  name: 'Text Input',
  description: 'A single-line text input field. Use for names, emails, short text.',
  category: 'input',
  tags: ['input', 'text', 'form', 'field', 'name', 'email'],
  slots: [
    { name: 'label', type: 'string', required: true, description: 'Field label' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'binding', type: 'dataPath', required: true, description: 'Data model path for value' },
    { name: 'value', type: 'string', description: 'Pre-filled value' },
  ],
  template: {
    componentIds: ['{{id}}-field'],
    components: [
      {
        id: '{{id}}-field',
        type: 'TextField',
        props: {
          label: { literalString: '{{label}}' },
          placeholder: { literalString: '{{placeholder}}' },
          text: { path: '{{binding}}' },
        },
      },
    ],
  },
  examples: [
    {
      description: 'Email input',
      slots: { label: 'Email Address', placeholder: 'you@example.com', binding: 'form.email' },
      result: 'A labeled email input field',
    },
  ],
};

export const amountInputSnippet: Snippet = {
  id: 'amount-input',
  name: 'Amount/Currency Input',
  description: 'A numeric input for money/amounts. Use for payments, prices, quantities.',
  category: 'input',
  tags: ['money', 'currency', 'number', 'price', 'payment', 'amount'],
  slots: [
    { name: 'label', type: 'string', default: 'Amount', description: 'Field label' },
    { name: 'currency', type: 'string', default: '$', description: 'Currency symbol' },
    { name: 'binding', type: 'dataPath', required: true, description: 'Data model path' },
    { name: 'value', type: 'string', description: 'Pre-filled value' },
  ],
  template: {
    componentIds: ['{{id}}-amount'],
    components: [
      {
        id: '{{id}}-amount',
        type: 'TextField',
        props: {
          label: { literalString: '{{label}}' },
          placeholder: { literalString: '{{currency}}0.00' },
          text: { path: '{{binding}}' },
        },
      },
    ],
  },
};

export const datePickerSnippet: Snippet = {
  id: 'date-picker',
  name: 'Date Picker',
  description: 'A date selection input. Use for scheduling, deadlines, birthdays.',
  category: 'input',
  tags: ['date', 'calendar', 'schedule', 'deadline', 'time'],
  slots: [
    { name: 'label', type: 'string', required: true, description: 'Field label' },
    { name: 'binding', type: 'dataPath', required: true, description: 'Data model path' },
    { name: 'includeTime', type: 'boolean', default: false, description: 'Include time selection' },
  ],
  template: {
    componentIds: ['{{id}}-date'],
    components: [
      {
        id: '{{id}}-date',
        type: 'DateTimeInput',
        props: {
          label: { literalString: '{{label}}' },
          value: { path: '{{binding}}' },
          enableDate: { literalBoolean: true },
          enableTime: { literalBoolean: false },
        },
      },
    ],
  },
};

export const selectSnippet: Snippet = {
  id: 'select',
  name: 'Dropdown Select',
  description: 'A dropdown for selecting from options. Use for categories, statuses, choices.',
  category: 'input',
  tags: ['dropdown', 'select', 'options', 'choice', 'picker'],
  slots: [
    { name: 'label', type: 'string', required: true, description: 'Field label' },
    { name: 'binding', type: 'dataPath', required: true, description: 'Data model path' },
    { name: 'placeholder', type: 'string', default: 'Select...', description: 'Placeholder text' },
    { name: 'options', type: 'string', description: 'Comma-separated options' },
  ],
  template: {
    componentIds: ['{{id}}-select'],
    components: [
      {
        id: '{{id}}-select',
        type: 'Select',
        props: {
          label: { literalString: '{{label}}' },
          placeholder: { literalString: '{{placeholder}}' },
          value: { path: '{{binding}}' },
        },
      },
    ],
  },
};

export const checkboxSnippet: Snippet = {
  id: 'checkbox',
  name: 'Checkbox',
  description: 'A boolean checkbox input. Use for toggles, agreements, options.',
  category: 'input',
  tags: ['toggle', 'boolean', 'check', 'agree', 'option'],
  slots: [
    { name: 'label', type: 'string', required: true, description: 'Checkbox label' },
    { name: 'binding', type: 'dataPath', default: 'form.checkbox', description: 'Data model path' },
  ],
  template: {
    componentIds: ['{{id}}-checkbox'],
    components: [
      {
        id: '{{id}}-checkbox',
        type: 'CheckBox',
        props: {
          label: { literalString: '{{label}}' },
          value: { path: '{{binding}}' },
        },
      },
    ],
  },
};

export const textAreaSnippet: Snippet = {
  id: 'text-area',
  name: 'Multi-line Text',
  description: 'A multi-line text input. Use for comments, notes, descriptions.',
  category: 'input',
  tags: ['textarea', 'multiline', 'comment', 'note', 'description', 'message'],
  slots: [
    { name: 'label', type: 'string', required: true, description: 'Field label' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'binding', type: 'dataPath', required: true, description: 'Data model path' },
  ],
  template: {
    componentIds: ['{{id}}-textarea'],
    components: [
      {
        id: '{{id}}-textarea',
        type: 'TextArea',
        props: {
          label: { literalString: '{{label}}' },
          placeholder: { literalString: '{{placeholder}}' },
          text: { path: '{{binding}}' },
        },
      },
    ],
  },
};

export const recipientSelectorSnippet: Snippet = {
  id: 'recipient-selector',
  name: 'Recipient Selector',
  description: 'An input for selecting a person/contact. Use for payments, messages, invites.',
  category: 'input',
  tags: ['person', 'contact', 'recipient', 'user', 'send-to'],
  slots: [
    { name: 'label', type: 'string', default: 'Recipient', description: 'Field label' },
    { name: 'binding', type: 'dataPath', required: true, description: 'Data model path' },
    { name: 'placeholder', type: 'string', default: 'Name, email, or phone', description: 'Placeholder' },
  ],
  template: {
    componentIds: ['{{id}}-recipient'],
    components: [
      {
        id: '{{id}}-recipient',
        type: 'TextField',
        props: {
          label: { literalString: '{{label}}' },
          placeholder: { literalString: '{{placeholder}}' },
          text: { path: '{{binding}}' },
        },
      },
    ],
  },
};

export const inputSnippets: Snippet[] = [
  textFieldSnippet,
  amountInputSnippet,
  datePickerSnippet,
  selectSnippet,
  checkboxSnippet,
  textAreaSnippet,
  recipientSelectorSnippet,
];
