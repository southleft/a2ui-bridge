import type { DemoScenario } from './types';

/**
 * List Demo
 * Demonstrates dynamic list rendering with cards
 */
export const listDemoScenario: DemoScenario = {
  id: 'list-demo',
  title: 'Task List',
  description: 'A task list with status badges and actions',
  messages: [
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'list-container',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'list-container',
            component: {
              Card: {
                children: ['list-content'],
              },
            },
          },
          {
            id: 'list-content',
            component: {
              Column: {
                children: ['list-header', 'task-list', 'add-task-row'],
              },
            },
          },
          {
            id: 'list-header',
            component: {
              Row: {
                alignment: { literalString: 'center' },
                children: ['list-title', 'task-count'],
              },
            },
          },
          {
            id: 'list-title',
            component: {
              Text: {
                text: { literalString: 'My Tasks' },
                usageHint: { literalString: 'h2' },
              },
            },
          },
          {
            id: 'task-count',
            component: {
              Badge: {
                text: { literalString: '3 items' },
              },
            },
          },
          {
            id: 'task-list',
            component: {
              List: {
                direction: { literalString: 'vertical' },
                children: ['task-1', 'task-2', 'task-3'],
              },
            },
          },
          {
            id: 'task-1',
            component: {
              Row: {
                alignment: { literalString: 'center' },
                children: ['task-1-badge', 'task-1-text', 'task-1-action'],
              },
            },
          },
          {
            id: 'task-1-badge',
            component: {
              Badge: {
                text: { literalString: 'Done' },
              },
            },
          },
          {
            id: 'task-1-text',
            component: {
              Text: {
                text: { literalString: 'Review pull request #42' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'task-1-action',
            component: {
              Button: {
                child: 'task-1-action-text',
                action: { name: 'view-task-1' },
              },
            },
          },
          {
            id: 'task-1-action-text',
            component: {
              Text: {
                text: { literalString: 'View' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'task-2',
            component: {
              Row: {
                alignment: { literalString: 'center' },
                children: ['task-2-badge', 'task-2-text', 'task-2-action'],
              },
            },
          },
          {
            id: 'task-2-badge',
            component: {
              Badge: {
                text: { literalString: 'In Progress' },
              },
            },
          },
          {
            id: 'task-2-text',
            component: {
              Text: {
                text: { literalString: 'Update documentation' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'task-2-action',
            component: {
              Button: {
                child: 'task-2-action-text',
                action: { name: 'view-task-2' },
              },
            },
          },
          {
            id: 'task-2-action-text',
            component: {
              Text: {
                text: { literalString: 'View' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'task-3',
            component: {
              Row: {
                alignment: { literalString: 'center' },
                children: ['task-3-badge', 'task-3-text', 'task-3-action'],
              },
            },
          },
          {
            id: 'task-3-badge',
            component: {
              Badge: {
                text: { literalString: 'Pending' },
              },
            },
          },
          {
            id: 'task-3-text',
            component: {
              Text: {
                text: { literalString: 'Deploy to production' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'task-3-action',
            component: {
              Button: {
                child: 'task-3-action-text',
                action: { name: 'view-task-3' },
              },
            },
          },
          {
            id: 'task-3-action-text',
            component: {
              Text: {
                text: { literalString: 'View' },
                usageHint: { literalString: 'body' },
              },
            },
          },
          {
            id: 'add-task-row',
            component: {
              Row: {
                alignment: { literalString: 'center' },
                children: ['add-task-btn'],
              },
            },
          },
          {
            id: 'add-task-btn',
            component: {
              Button: {
                child: 'add-task-btn-text',
                action: { name: 'add-task' },
              },
            },
          },
          {
            id: 'add-task-btn-text',
            component: {
              Text: {
                text: { literalString: 'Add Task' },
                usageHint: { literalString: 'body' },
              },
            },
          },
        ],
      },
    },
  ],
};
