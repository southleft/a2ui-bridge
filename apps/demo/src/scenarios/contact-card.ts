import type { DemoScenario } from './types';

/**
 * Contact Card Demo
 * Demonstrates a simple contact card with image, text, and action buttons
 */
export const contactCardScenario: DemoScenario = {
  id: 'contact-card',
  title: 'Contact Card',
  description: 'A contact profile card with image, details, and actions',
  messages: [
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'contact-card',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'contact-card',
            component: {
              Card: {
                children: ['contact-content'],
              },
            },
          },
          {
            id: 'contact-content',
            component: {
              Column: {
                alignment: 'center',
                children: ['avatar', 'name', 'title', 'email', 'actions'],
              },
            },
          },
          {
            id: 'avatar',
            component: {
              Image: {
                url: { literalString: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
                usageHint: { literalString: 'profile-avatar' },
              },
            },
          },
          {
            id: 'name',
            component: {
              Text: {
                text: { literalString: 'Alex Jordan' },
                usageHint: { literalString: 'h2' },
              },
            },
          },
          {
            id: 'title',
            component: {
              Text: {
                text: { literalString: 'Senior Software Engineer' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'email',
            component: {
              Text: {
                text: { literalString: 'alex.jordan@example.com' },
                usageHint: { literalString: 'caption' },
              },
            },
          },
          {
            id: 'actions',
            component: {
              Row: {
                alignment: 'center',
                children: ['call-btn', 'email-btn'],
              },
            },
          },
          {
            id: 'call-btn',
            component: {
              Button: {
                child: 'call-btn-text',
                action: { name: 'call-contact' },
              },
            },
          },
          {
            id: 'call-btn-text',
            component: {
              Text: {
                text: { literalString: 'Call' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'email-btn',
            component: {
              Button: {
                child: 'email-btn-text',
                action: { name: 'email-contact' },
              },
            },
          },
          {
            id: 'email-btn-text',
            component: {
              Text: {
                text: { literalString: 'Email' },
                usageHint: { literalString: 'body' },
              },
            },
          },
        ],
      },
    },
  ],
};
