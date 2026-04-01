import { ComponentTokens } from '@/types/component';

const componentTokens: ComponentTokens = {
  palette: {
    'triggers': {
      plug: {
        lead: {
          background: 'color.light.green.300',
        },
      },
    },
    'trigger': {
      plug: {
        item: {
          background: 'color.light.blue.200',
        },
      },
    },
    'button': {
      classic: {
        background: 'color.light.neutral.100',
        hover: {
          background: 'color.light.neutral.100',
        },
      },
    },
    'highlight': {
      mark: {
        background: 'color.light.orange.100',
      },
    },
    'left-menu': {
      border: 'color.light.blue.800',
      background: {
        primary: 'color.light.azure.800',
        secondary: 'color.light.azure.800',
      },
      text: {
        primary: 'color.light.azure.400',
      },
    },
    'table': {
      hover: {
        background: 'color.light.blue.50',
        selected: {
          background: 'color.light.blue.100',
        },
      },
      multiaction: {
        background: 'color.light.azure.50',
      },
    },
    'search': {
      breadcrumbs: {
        background: 'color.light.blue.200',
        border: 'color.light.blue.300',
      },
    },
    'notification': {
      favorite: {
        background: 'color.light.orange.50',
      },
    },
    'pipeline': {
      item: {
        'drag': {
          placeholder: 'color.light.neutral.100',
        },
        'message': {
          background: 'color.light.blue.100',
        },
        'not-purchase': {
          background: 'color.light.pink.100',
        },
        'actions': {
          background: 'rgba(234, 234, 234, 0.9)',
        },
      },
    },
    'card': {
      top: {
        background: 'color.light.azure.800',
      },
    },
    'digital-pipeline': {
      item: {
        recently: 'color.light.green.50',
      },
      trigger: {
        'default': 'color.light.orange.400',
        'widget': 'color.light.neutral.600',
        'calendly': 'color.light.neutral.700',
        'webhook': 'color.light.purple.50',
        'adwords': 'color.light.green.100',
        'mandrill': 'color.light.red.400',
        'twilio': 'color.light.red.50',
        'mailchimp': 'color.light.orange.100',
        'facebook': 'color.light.blue.200',
        'stripe': 'color.light.purple.100',
        'task': 'color.light.green.50',
        'form': 'color.light.pink.50',
        'email': 'color.light.azure.100',
        'analytics': 'color.light.orange.100',
        'vk': 'color.light.blue.100',
        'store-card': 'color.light.blue.100',
        'generate-store-card': 'color.light.azure.200',
        'delete-files': 'color.light.red.200',
        'default-widget': 'color.light.green.100',
      },
    },
    'salesbot': {
      list: {
        trigger: {
          background: 'color.light.blue.200',
        },
      },
      block: {
        background: 'rgba(245, 245, 245, 0.8)',
      },
      action: {
        show: {
          background: 'color.light.blue.800',
          button: {
            background: 'color.light.blue.500',
            border: 'color.light.blue.400',
          },
        },
        exit: {
          background: 'color.light.neutral.200',
        },
      },
      validation: {
        border: 'color.light.blue.500',
        background: 'color.light.neutral.100',
      },
    },
    'external-message': {
      background: 'color.light.blue.100',
      reply: {
        background: 'color.light.blue.200',
      },
    },
    'mail': {
      error: {
        background: 'color.light.red.200',
        border: 'color.light.red.500',
      },
    },
    'kalendae': {
      active: {
        element: 'color.light.neutral.200',
      },
      range: {
        element: 'color.light.neutral.100',
      },
      hover: {
        background: 'color.light.neutral.100',
      },
    },
    'tasks': {
      date: {
        active: {
          element: 'color.light.neutral.100',
        },
        today: {
          element: 'color.light.blue.50',
        },
        draggable: {
          element: 'color.light.blue.100',
        },
      },
    },
    'amomarket': {
      statuses: {
        installed: {
          background: 'color.light.green.300',
        },
      },
    },
    'info': {
      bubble: {
        error: {
          background: 'color.light.red.200',
          border: 'color.light.red.500',
        },
      },
    },
    'transaction': {
      background: 'color.light.green.100',
      border: 'color.light.green.400',
    },
    'payment': {
      status: {
        paid: {
          background: 'color.light.green.300',
        },
      },
    },
    'global': {
      onboarding: {
        'light-blue': 'color.light.azure.50',
        'blue-purple': 'color.light.blue.800',
      },
    },
    'help-center': {
      tip: {
        background: 'color.light.green.50',
      },
    },
    'list': {
      hover: {
        default: {
          transparent: 'color.light.neutral.50',
        },
      },
    },
  },
};

export default componentTokens;
