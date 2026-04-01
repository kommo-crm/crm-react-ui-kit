import { ComponentTokens } from '@/types/component';

const componentTokens: ComponentTokens = {
  palette: {
    'triggers': {
      plug: {
        lead: {
          background: 'color.dark.green.500',
        },
      },
    },
    'trigger': {
      plug: {
        item: {
          background: 'color.dark.blue.600',
        },
      },
    },
    'button': {
      classic: {
        background: 'color.dark.azure.50',
        hover: {
          background: 'color.dark.azure.700',
        },
      },
    },
    'highlight': {
      mark: {
        background: 'color.light.orange.100',
      },
    },
    'left-menu': {
      border: 'color.dark.azure.600',
      background: {
        primary: 'color.light.azure.900',
        secondary: 'color.light.azure.900',
      },
      text: {
        primary: 'color.dark.azure.300',
      },
    },
    'table': {
      hover: {
        background: 'color.dark.blue.700',
        selected: {
          background: 'color.dark.blue.700',
        },
      },
      multiaction: {
        background: 'color.dark.azure.700',
      },
    },
    'search': {
      breadcrumbs: {
        background: 'color.dark.azure.600',
        border: 'color.dark.azure.600',
      },
    },
    'notification': {
      favorite: {
        background: 'color.dark.orange.800',
      },
    },
    'pipeline': {
      item: {
        'drag': {
          placeholder: 'color.dark.azure.800',
        },
        'message': {
          background: 'color.dark.blue.600',
        },
        'not-purchase': {
          background: 'color.dark.pink.900',
        },
        'actions': {
          background: 'rgba(55, 80, 98, 0.9)',
        },
      },
    },
    'card': {
      top: {
        background: '#03242f',
      },
    },
    'digital-pipeline': {
      item: {
        recently: 'color.dark.azure.900',
      },
      trigger: {
        'default': 'color.dark.orange.700',
        'widget': 'color.dark.azure.900',
        'calendly': 'color.dark.azure.900',
        'webhook': 'color.dark.purple.800',
        'adwords': 'color.light.green.100',
        'mandrill': 'color.dark.orange.700',
        'twilio': 'color.dark.red.800',
        'mailchimp': 'color.dark.orange.700',
        'facebook': 'color.dark.blue.700',
        'stripe': 'color.dark.purple.800',
        'task': 'color.dark.green.800',
        'form': 'color.dark.pink.900',
        'email': 'color.dark.blue.700',
        'generate-store-card': 'color.dark.blue.700',
        'analytics': 'color.dark.orange.700',
        'vk': 'color.dark.blue.700',
        'store-card': 'color.dark.blue.700',
        'delete-files': 'color.dark.red.800',
        'default-widget': 'color.dark.green.800',
      },
    },
    'salesbot': {
      list: {
        trigger: {
          background: 'color.dark.blue.600',
        },
      },
      block: {
        background: 'rgba(0, 0, 0, 0.2)',
      },
      action: {
        show: {
          background: 'color.dark.blue.600',
          button: {
            background: 'color.dark.blue.600',
            border: 'color.dark.blue.400',
          },
        },
        exit: {
          background: 'color.dark.blue.700',
        },
      },
      validation: {
        border: 'color.dark.blue.400',
        background: 'color.dark.blue.700',
      },
    },
    'external-message': {
      background: 'color.dark.blue.600',
      reply: {
        background: 'color.dark.blue.700',
      },
    },
    'mail': {
      error: {
        background: 'color.dark.red.900',
        border: 'color.dark.red.400',
      },
    },
    'kalendae': {
      active: {
        element: 'color.dark.azure.700',
      },
      range: {
        element: 'color.dark.azure.900',
      },
      hover: {
        background: 'color.dark.azure.900',
      },
    },
    'tasks': {
      date: {
        active: {
          element: 'color.dark.azure.900',
        },
        today: {
          element: 'color.dark.blue.800',
        },
        draggable: {
          element: 'color.dark.blue.800',
        },
      },
    },
    'amomarket': {
      statuses: {
        installed: {
          background: 'color.dark.green.500',
        },
      },
    },
    'info': {
      bubble: {
        error: {
          background: 'color.dark.red.900',
          border: 'color.dark.red.400',
        },
      },
    },
    'transaction': {
      background: 'color.dark.green.900',
      border: 'color.dark.green.400',
    },
    'payment': {
      status: {
        paid: {
          background: 'color.dark.green.500',
        },
      },
    },
    'global': {
      onboarding: {
        'light-blue': 'color.dark.azure.700',
        'blue-purple': 'color.dark.blue.400',
      },
    },
    'help-center': {
      tip: {
        background: 'color.dark.green.900',
      },
    },
    'list': {
      hover: {
        default: {
          transparent: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
  },
};

export default componentTokens;
