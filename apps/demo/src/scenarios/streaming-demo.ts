import type { DemoScenario } from './types';

/**
 * Streaming Demo
 * Demonstrates incremental UI updates simulating real-time LLM streaming
 */
export const streamingDemoScenario: DemoScenario = {
  id: 'streaming-demo',
  title: 'Streaming Updates',
  description: 'Simulates real-time LLM response with incremental UI updates',
  messages: [
    // Initial frame - set up root and empty card structure with thinking badge
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'response-card',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-card',
            component: {
              Card: {
                children: ['response-content'],
              },
            },
          },
          {
            id: 'response-content',
            component: {
              Column: {
                children: ['thinking-badge'],
              },
            },
          },
          {
            id: 'thinking-badge',
            component: {
              Badge: {
                text: { literalString: 'Thinking...' },
              },
            },
          },
        ],
      },
    },
    // Second frame - title appears
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-content',
            component: {
              Column: {
                children: ['response-title', 'thinking-badge'],
              },
            },
          },
          {
            id: 'response-title',
            component: {
              Text: {
                text: { literalString: 'Weather Report' },
                usageHint: { literalString: 'h2' },
              },
            },
          },
        ],
      },
    },
    // Third frame - location appears
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-content',
            component: {
              Column: {
                children: ['response-title', 'location-row', 'thinking-badge'],
              },
            },
          },
          {
            id: 'location-row',
            component: {
              Row: {
                alignment: { literalString: 'center' },
                children: ['location-badge', 'location-text'],
              },
            },
          },
          {
            id: 'location-badge',
            component: {
              Badge: {
                text: { literalString: 'San Francisco, CA' },
              },
            },
          },
          {
            id: 'location-text',
            component: {
              Text: {
                text: { literalString: 'Current conditions' },
                usageHint: { literalString: 'caption' },
              },
            },
          },
        ],
      },
    },
    // Fourth frame - weather details
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-content',
            component: {
              Column: {
                children: ['response-title', 'location-row', 'weather-details', 'thinking-badge'],
              },
            },
          },
          {
            id: 'weather-details',
            component: {
              Column: {
                children: ['temp-text', 'condition-text'],
              },
            },
          },
          {
            id: 'temp-text',
            component: {
              Text: {
                text: { literalString: '72°F (22°C)' },
                usageHint: { literalString: 'h3' },
              },
            },
          },
          {
            id: 'condition-text',
            component: {
              Text: {
                text: { literalString: 'Partly cloudy with mild temperatures. Perfect weather for outdoor activities.' },
                usageHint: { literalString: 'body' },
              },
            },
          },
        ],
      },
    },
    // Final frame - complete response with actions (remove thinking badge)
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-content',
            component: {
              Column: {
                children: ['response-title', 'location-row', 'weather-details', 'divider', 'actions'],
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
            id: 'actions',
            component: {
              Row: {
                alignment: { literalString: 'center' },
                children: ['refresh-btn', 'details-btn'],
              },
            },
          },
          {
            id: 'refresh-btn',
            component: {
              Button: {
                child: 'refresh-btn-text',
                action: { name: 'refresh-weather' },
              },
            },
          },
          {
            id: 'refresh-btn-text',
            component: {
              Text: {
                text: { literalString: 'Refresh' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'details-btn',
            component: {
              Button: {
                child: 'details-btn-text',
                action: { name: 'view-forecast' },
              },
            },
          },
          {
            id: 'details-btn-text',
            component: {
              Text: {
                text: { literalString: 'View Forecast' },
                usageHint: { literalString: 'body' },
              },
            },
          },
        ],
      },
    },
  ],
};
