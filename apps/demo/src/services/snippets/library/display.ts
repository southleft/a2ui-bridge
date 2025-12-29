/**
 * Display Snippets
 *
 * Pre-built display components for showing information.
 */

import type { Snippet } from '../types';

export const headingSnippet: Snippet = {
  id: 'heading',
  name: 'Heading Text',
  description: 'A large page title or main heading. Use for the primary title at the top of a card or page.',
  category: 'display',
  tags: ['title', 'header', 'h1', 'page-title', 'main-heading'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Heading text' },
    { name: 'level', type: 'string', default: 'h1', description: 'Heading level: h1, h2, h3' },
  ],
  template: {
    componentIds: ['{{id}}-heading'],
    components: [
      {
        id: '{{id}}-heading',
        type: 'Text',
        props: {
          text: { literalString: '{{text}}' },
          usageHint: { literalString: '{{level}}' },
        },
      },
    ],
  },
};

export const sectionHeadingSnippet: Snippet = {
  id: 'section-heading',
  name: 'Section Heading',
  description: 'A bold section header to divide content into logical groups. Use for "Trip Details", "Preferences", "Settings" etc.',
  category: 'display',
  tags: ['section', 'header', 'h2', 'h3', 'divider', 'group-title'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Section heading text' },
  ],
  template: {
    componentIds: ['{{id}}-section-heading'],
    components: [
      {
        id: '{{id}}-section-heading',
        type: 'Text',
        props: {
          text: { literalString: '{{text}}' },
          usageHint: { literalString: 'h3' },
          fontWeight: { literalNumber: 700 },
        },
      },
    ],
  },
};

export const bodyTextSnippet: Snippet = {
  id: 'body-text',
  name: 'Body Text',
  description: 'Regular paragraph text. Use for descriptions, instructions.',
  category: 'display',
  tags: ['text', 'paragraph', 'body', 'description'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Text content' },
  ],
  template: {
    componentIds: ['{{id}}-text'],
    components: [
      {
        id: '{{id}}-text',
        type: 'Text',
        props: {
          text: { literalString: '{{text}}' },
          usageHint: { literalString: 'body' },
        },
      },
    ],
  },
};

export const captionTextSnippet: Snippet = {
  id: 'caption',
  name: 'Caption Text',
  description: 'Small helper text. Use for hints, timestamps, secondary info.',
  category: 'display',
  tags: ['caption', 'helper', 'hint', 'small', 'secondary'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Caption text' },
  ],
  template: {
    componentIds: ['{{id}}-caption'],
    components: [
      {
        id: '{{id}}-caption',
        type: 'Text',
        props: {
          text: { literalString: '{{text}}' },
          usageHint: { literalString: 'caption' },
        },
      },
    ],
  },
};

export const badgeSnippet: Snippet = {
  id: 'badge',
  name: 'Status Badge',
  description: 'A status indicator badge. Use for labels, tags, status indicators.',
  category: 'display',
  tags: ['badge', 'tag', 'label', 'status', 'indicator', 'chip'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Badge text' },
    { name: 'color', type: 'string', default: 'blue', description: 'Color: blue, green, red, yellow, gray' },
  ],
  template: {
    componentIds: ['{{id}}-badge'],
    components: [
      {
        id: '{{id}}-badge',
        type: 'Badge',
        props: {
          text: { literalString: '{{text}}' },
          color: { literalString: '{{color}}' },
        },
      },
    ],
  },
};

export const avatarSnippet: Snippet = {
  id: 'avatar',
  name: 'Avatar',
  description: 'A user avatar/profile image placeholder. Use for user representation.',
  category: 'display',
  tags: ['avatar', 'profile', 'user', 'image', 'photo'],
  slots: [
    { name: 'name', type: 'string', description: 'Name for initials fallback' },
  ],
  template: {
    componentIds: ['{{id}}-avatar'],
    components: [
      {
        id: '{{id}}-avatar',
        type: 'Avatar',
        props: {
          name: { literalString: '{{name}}' },
        },
      },
    ],
  },
};

export const labelValueSnippet: Snippet = {
  id: 'label-value',
  name: 'Label-Value Pair',
  description: 'A label with its value. Use for displaying data fields.',
  category: 'display',
  tags: ['label', 'value', 'field', 'data', 'info'],
  slots: [
    { name: 'label', type: 'string', required: true, description: 'Field label' },
    { name: 'value', type: 'string', required: true, description: 'Field value' },
  ],
  template: {
    componentIds: ['{{id}}-lv-container', '{{id}}-label', '{{id}}-value'],
    components: [
      {
        id: '{{id}}-lv-container',
        type: 'Column',
        props: {
          children: ['{{id}}-label', '{{id}}-value'],
          gap: { literalString: 'xs' },
        },
      },
      {
        id: '{{id}}-label',
        type: 'Text',
        props: {
          text: { literalString: '{{label}}' },
          usageHint: { literalString: 'caption' },
        },
      },
      {
        id: '{{id}}-value',
        type: 'Text',
        props: {
          text: { literalString: '{{value}}' },
          usageHint: { literalString: 'body' },
        },
      },
    ],
  },
};

export const amountDisplaySnippet: Snippet = {
  id: 'amount-display',
  name: 'Amount Display',
  description: 'A large currency/amount display. Use for totals, balances, prices.',
  category: 'display',
  tags: ['amount', 'price', 'total', 'currency', 'money', 'balance'],
  slots: [
    { name: 'amount', type: 'string', required: true, description: 'Amount value' },
    { name: 'label', type: 'string', description: 'Optional label below amount' },
  ],
  template: {
    componentIds: ['{{id}}-amount-container', '{{id}}-amount', '{{id}}-amount-label'],
    components: [
      {
        id: '{{id}}-amount-container',
        type: 'Column',
        props: {
          children: ['{{id}}-amount', '{{id}}-amount-label'],
          gap: { literalString: 'xs' },
          align: { literalString: 'center' },
        },
      },
      {
        id: '{{id}}-amount',
        type: 'Text',
        props: {
          text: { literalString: '{{amount}}' },
          usageHint: { literalString: 'h1' },
        },
      },
      {
        id: '{{id}}-amount-label',
        type: 'Text',
        props: {
          text: { literalString: '{{label}}' },
          usageHint: { literalString: 'caption' },
        },
      },
    ],
  },
};

export const alertSnippet: Snippet = {
  id: 'alert',
  name: 'Alert Message',
  description: 'An alert/notification message. Use for warnings, info, success messages.',
  category: 'display',
  tags: ['alert', 'notification', 'message', 'warning', 'info', 'success', 'error'],
  slots: [
    { name: 'title', type: 'string', description: 'Alert title' },
    { name: 'message', type: 'string', required: true, description: 'Alert message' },
    { name: 'type', type: 'string', default: 'info', description: 'Type: info, success, warning, error' },
  ],
  template: {
    componentIds: ['{{id}}-alert'],
    components: [
      {
        id: '{{id}}-alert',
        type: 'Alert',
        props: {
          title: { literalString: '{{title}}' },
          message: { literalString: '{{message}}' },
          variant: { literalString: '{{type}}' },
        },
      },
    ],
  },
};

export const statCardSnippet: Snippet = {
  id: 'stat-card',
  name: 'Statistic Display',
  description: 'A prominent statistic with label and optional badge. Great for dashboards, summaries.',
  category: 'display',
  tags: ['stat', 'metric', 'number', 'kpi', 'dashboard', 'summary'],
  slots: [
    { name: 'value', type: 'string', required: true, description: 'The statistic value' },
    { name: 'label', type: 'string', required: true, description: 'What this stat represents' },
    { name: 'badge', type: 'string', description: 'Optional badge text (e.g., "+12%")' },
  ],
  template: {
    componentIds: ['{{id}}-stat-container', '{{id}}-stat-value', '{{id}}-stat-row', '{{id}}-stat-label', '{{id}}-stat-badge'],
    components: [
      {
        id: '{{id}}-stat-container',
        type: 'Column',
        props: {
          children: ['{{id}}-stat-value', '{{id}}-stat-row'],
          gap: { literalString: 'xs' },
          align: { literalString: 'center' },
        },
      },
      {
        id: '{{id}}-stat-value',
        type: 'Text',
        props: {
          text: { literalString: '{{value}}' },
          usageHint: { literalString: 'h1' },
        },
      },
      {
        id: '{{id}}-stat-row',
        type: 'Row',
        props: {
          children: ['{{id}}-stat-label', '{{id}}-stat-badge'],
          gap: { literalString: 'sm' },
          align: { literalString: 'center' },
        },
      },
      {
        id: '{{id}}-stat-label',
        type: 'Text',
        props: {
          text: { literalString: '{{label}}' },
          usageHint: { literalString: 'caption' },
        },
      },
      {
        id: '{{id}}-stat-badge',
        type: 'Badge',
        props: {
          text: { literalString: '{{badge}}' },
          color: { literalString: 'green' },
        },
      },
    ],
  },
};

export const heroHeaderSnippet: Snippet = {
  id: 'hero-header',
  name: 'Hero Header',
  description: 'A prominent header with title, subtitle, and optional context. Use at the top of cards/pages.',
  category: 'display',
  tags: ['hero', 'header', 'title', 'intro', 'prominent'],
  slots: [
    { name: 'title', type: 'string', required: true, description: 'Main title' },
    { name: 'subtitle', type: 'string', description: 'Supporting text' },
    { name: 'context', type: 'string', description: 'Small context text above title' },
  ],
  template: {
    componentIds: ['{{id}}-hero', '{{id}}-hero-context', '{{id}}-hero-title', '{{id}}-hero-subtitle'],
    components: [
      {
        id: '{{id}}-hero',
        type: 'Column',
        props: {
          children: ['{{id}}-hero-context', '{{id}}-hero-title', '{{id}}-hero-subtitle'],
          gap: { literalString: 'xs' },
        },
      },
      {
        id: '{{id}}-hero-context',
        type: 'Text',
        props: {
          text: { literalString: '{{context}}' },
          usageHint: { literalString: 'caption' },
        },
      },
      {
        id: '{{id}}-hero-title',
        type: 'Text',
        props: {
          text: { literalString: '{{title}}' },
          usageHint: { literalString: 'h1' },
        },
      },
      {
        id: '{{id}}-hero-subtitle',
        type: 'Text',
        props: {
          text: { literalString: '{{subtitle}}' },
          usageHint: { literalString: 'body' },
        },
      },
    ],
  },
};

export const contactHeaderSnippet: Snippet = {
  id: 'contact-header',
  name: 'Contact Header',
  description: 'A user/contact display with avatar and name. Great for recipient selection.',
  category: 'display',
  tags: ['contact', 'user', 'person', 'recipient', 'profile'],
  slots: [
    { name: 'name', type: 'string', required: true, description: 'Person name' },
    { name: 'subtitle', type: 'string', description: 'Subtitle like email or phone' },
  ],
  template: {
    componentIds: ['{{id}}-contact', '{{id}}-contact-avatar', '{{id}}-contact-info', '{{id}}-contact-name', '{{id}}-contact-subtitle'],
    components: [
      {
        id: '{{id}}-contact',
        type: 'Row',
        props: {
          children: ['{{id}}-contact-avatar', '{{id}}-contact-info'],
          gap: { literalString: 'md' },
          align: { literalString: 'center' },
        },
      },
      {
        id: '{{id}}-contact-avatar',
        type: 'Image',
        props: {
          usageHint: { literalString: 'avatar' },
        },
      },
      {
        id: '{{id}}-contact-info',
        type: 'Column',
        props: {
          children: ['{{id}}-contact-name', '{{id}}-contact-subtitle'],
          gap: { literalString: 'xs' },
        },
      },
      {
        id: '{{id}}-contact-name',
        type: 'Text',
        props: {
          text: { literalString: '{{name}}' },
          usageHint: { literalString: 'h3' },
        },
      },
      {
        id: '{{id}}-contact-subtitle',
        type: 'Text',
        props: {
          text: { literalString: '{{subtitle}}' },
          usageHint: { literalString: 'caption' },
        },
      },
    ],
  },
};

export const infoRowSnippet: Snippet = {
  id: 'info-row',
  name: 'Info Row',
  description: 'A horizontal row with icon-like indicator and text. Good for feature lists, benefits.',
  category: 'display',
  tags: ['feature', 'benefit', 'info', 'list-item', 'icon-text'],
  slots: [
    { name: 'icon', type: 'string', default: '•', description: 'Icon/bullet character' },
    { name: 'text', type: 'string', required: true, description: 'The information text' },
  ],
  template: {
    componentIds: ['{{id}}-info-row', '{{id}}-info-icon', '{{id}}-info-text'],
    components: [
      {
        id: '{{id}}-info-row',
        type: 'Row',
        props: {
          children: ['{{id}}-info-icon', '{{id}}-info-text'],
          gap: { literalString: 'sm' },
          align: { literalString: 'start' },
        },
      },
      {
        id: '{{id}}-info-icon',
        type: 'Text',
        props: {
          text: { literalString: '{{icon}}' },
          usageHint: { literalString: 'body' },
        },
      },
      {
        id: '{{id}}-info-text',
        type: 'Text',
        props: {
          text: { literalString: '{{text}}' },
          usageHint: { literalString: 'body' },
        },
      },
    ],
  },
};

export const displaySnippets: Snippet[] = [
  headingSnippet,
  sectionHeadingSnippet,
  bodyTextSnippet,
  captionTextSnippet,
  badgeSnippet,
  avatarSnippet,
  labelValueSnippet,
  amountDisplaySnippet,
  alertSnippet,
  statCardSnippet,
  heroHeaderSnippet,
  contactHeaderSnippet,
  infoRowSnippet,
];
