import type { DemoScenario } from './types';

/**
 * Form Demo
 * Demonstrates form inputs with data binding
 */
export const formDemoScenario: DemoScenario = {
  id: 'form-demo',
  title: 'Interactive Form',
  description: 'A form with text fields and data binding',
  messages: [
    {
      dataModelUpdate: {
        surfaceId: '@default',
        path: '/',
        contents: [
          { key: 'form.firstName', value: { valueString: 'John' } },
          { key: 'form.lastName', value: { valueString: 'Doe' } },
          { key: 'form.email', value: { valueString: 'john.doe@example.com' } },
        ],
      },
    },
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'form-card',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'form-card',
            component: {
              Card: {
                children: ['form-content'],
              },
            },
          },
          {
            id: 'form-content',
            component: {
              Column: {
                children: ['form-title', 'form-desc', 'name-row', 'email-field', 'divider', 'submit-row'],
              },
            },
          },
          {
            id: 'form-title',
            component: {
              Text: {
                text: { literalString: 'Edit Profile' },
                usageHint: { literalString: 'h2' },
              },
            },
          },
          {
            id: 'form-desc',
            component: {
              Text: {
                text: { literalString: 'Update your profile information below' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'name-row',
            component: {
              Row: {
                children: ['first-name-field', 'last-name-field'],
              },
            },
          },
          {
            id: 'first-name-field',
            component: {
              TextField: {
                label: { literalString: 'First Name' },
                text: { path: 'form.firstName' },
                type: { literalString: 'shortText' },
              },
            },
          },
          {
            id: 'last-name-field',
            component: {
              TextField: {
                label: { literalString: 'Last Name' },
                text: { path: 'form.lastName' },
                type: { literalString: 'shortText' },
              },
            },
          },
          {
            id: 'email-field',
            component: {
              TextField: {
                label: { literalString: 'Email Address' },
                text: { path: 'form.email' },
                type: { literalString: 'shortText' },
              },
            },
          },
          {
            id: 'divider',
            component: {
              Divider: {},
            },
          },
          {
            id: 'submit-row',
            component: {
              Row: {
                alignment: { literalString: 'end' },
                children: ['cancel-btn', 'save-btn'],
              },
            },
          },
          {
            id: 'cancel-btn',
            component: {
              Button: {
                child: 'cancel-btn-text',
                action: { name: 'cancel-form' },
              },
            },
          },
          {
            id: 'cancel-btn-text',
            component: {
              Text: {
                text: { literalString: 'Cancel' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'save-btn',
            component: {
              Button: {
                child: 'save-btn-text',
                action: {
                  name: 'save-form',
                  context: [
                    { key: 'firstName', value: { path: 'form.firstName' } },
                    { key: 'lastName', value: { path: 'form.lastName' } },
                    { key: 'email', value: { path: 'form.email' } },
                  ],
                },
              },
            },
          },
          {
            id: 'save-btn-text',
            component: {
              Text: {
                text: { literalString: 'Save Changes' },
                usageHint: { literalString: 'body' },
              },
            },
          },
        ],
      },
    },
  ],
};
