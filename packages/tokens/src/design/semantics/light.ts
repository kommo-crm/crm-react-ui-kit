import type { SemanticTokens } from '@/types/semantic';

const light: SemanticTokens = {
  palette: {
    background: {
      default: 'color.light.neutral.100',
      ['default-disabled']: 'color.light.azure.900',
      base: 'color.light.neutral.100',
      primary: 'color.light.neutral.50',
      ['primary-disabled']: 'color.light.neutral.100',
      secondary: 'color.light.neutral.50',
      ['secondary-100']: 'color.light.neutral.50',
      ['secondary-200']: 'color.light.neutral.100',
      ['secondary-300']: 'color.light.blue.50',
      ['secondary-500']: 'color.light.neutral.200',
      ['secondary-800']: 'color.light.neutral.200',
      ['secondary-900']: 'color.light.neutral.300',
      tour: 'color.light.neutral.900',
      qualification: 'color.light.blue.600',
      error: 'color.light.red.200',
    },
    foreground: {
      primary: 'color.light.neutral.800',
      inverted: 'color.light.neutral.50',
      secondary: 'color.light.neutral.600',
      tertiary: 'color.light.neutral.400',
      error: 'color.light.red.600',
      accent: 'color.light.blue.600',
    },
    border: {
      default: 'color.light.neutral.300',
      primary: 'color.light.neutral.200',
      medium: 'color.light.neutral.200',
      strong: 'color.light.neutral.300',
      error: 'color.light.red.500',
    },
    overlay: {
      disabled: 'rgba(255, 255, 255, 0.2)',
    },
    hover: {
      ['light-blue']: 'color.light.blue.100',
    }
    shadow:{
      default: 'color.light.neutral.100',
    },
    placeholder: {
      default: 'color.light.neutral.500',
      primary: 'color.light.neutral.400',
    },
    action: {
      droppable: 'color.light.blue.700',
    },
    active:{
      element: {
        900: 'color.light.blue.500',
        800: 'color.light.blue.600',
        700: 'color.light.blue.600',
      }
    },
    scrollbar: {
      track: {
        background: 'color.light.neutral.100',
      },
      thumb: {
        background: 'color.light.neutral.300',
      }
    },
    triggers: {
      plug: {
        lead: {
          background: 'color.light.green.300',
        }
      }
    },
    trigger: {
      plug: {
        item: {
          background: 'color.light.blue.200',
        }
      }
    },
    button: {
      classic: {
        background: 'color.light.neutral.100',
        hover: {
          background: 'color.light.neutral.100',
        }
      }
    },
    highlight: {
      mark: {
        background: 'color.light.orange.100'
      }
    },
    ['left-menu']: {
      border: 'color.light.blue.800',
      background: {
        primary: 'color.light.azure.800',
        secondary: 'color.light.azure.800',
      },
      text: {
        primary: 'color.light.azure.400',
      }
    },
    table: {
      hover:{
        selected: {
          background: 'color.light.blue.100',
        }
      },
      multiaction: {
        background: 'color.light.azure.50',
      }
    },
    search: {
      breadcrumbs: {
        background: 'color.light.blue.200',
        border: 'color.light.blue.300',
      }
    },
    notification: {
      favorite: {
        background: 'color.light.orange.50',
      }
    },
    pipeline: {
      item: {
        drag: {
          placeholder: 'color.light.neutral.100',
        },
        message: {
          background: 'color.light.blue.100',
        },
        ['not-purchase']: {
          background: 'color.light.pink.100',
        }
      }
    },
    card: {
      top: {
        background: 'color.light.azure.800',
      }
    },
    ['digital-pipeline']: {
      item: {
        recently: 'color.light.green.50',
      },
      trigger: {
        default: 'color.light.orange.400',
        widget: 'color.light.neutral.600',
        calendly: 'color.light.neutral.700',
        webhook: 'color.light.purple.50',
        adwords: 'color.light.green.100',
        mandrill: 'color.light.red.400',
        twilio: 'color.light.red.50',
        mailchimp: 'color.light.orange.100',
        facebook: 'color.light.blue.200',
        stripe: 'color.light.purple.100',
        task: 'color.light.green.50',
        form: 'color.light.pink.50',
        email: 'color.light.azure.100',
        ['generate-store-card']: 'color.light.blue.100',
        ['delete-files']: 'color.light.red.200',
        ['default-widget']: 'color.light.green.100',
      }
    },
    salesbot: {
      list: {
        trigger: {
          background: 'color.light.blue.200',
        }
      },
      action:{
        show: {
          background: 'color.light.blue.800',
          button: {
            background: 'color.light.blue.500',
            border: 'color.light.blue.400',
          }
        },
        exit: {
          background: 'color.light.neutral.200',
        },
      },
      validation: {
        background: 'color.light.neutral.100',
      }
    },
    ['external-message']: {
      background: 'color.light.blue.100',
      reply: {
        background: 'color.light.blue.200',
      }
    },
    mail: {
      error: {
        background: 'color.light.red.200',
        border: 'color.light.red.500',
      }
    },
    kalendae: {
      active: {
        element: 'color.light.neutral.200',
      },
      range: {
        element: 'color.light.neutral.100',
      },
      hover: {
        background: 'color.light.neutral.100',
      }
    },
    tasks: {
      date: {
        active: {
          element: 'color.light.neutral.100',
        },
        today: {
          element: 'color.light.blue.50',
        },
        draggable: {
          element: 'color.light.blue.100',
        }
      }
    },
    amomarket: {
      statuses: {
        installed: {
          background: 'color.light.green.300',
        }
      }
    },
    info: {
      bubble: {
        error: {
          background: 'color.light.red.200',
          border: 'color.light.red.500',
        }
      }
    },
    transaction: {
      background: 'color.light.green.100',
      border: 'color.light.green.400',
    },
    payment: {
      status: {
        paid: {
          background: 'color.light.green.300',
        }
      }
    },
    global: {
      onboarding: {
        ['light-blue']: 'color.light.azure.50',
        ['blue-purple']: 'color.light.blue.800',
      }
    },
    ['help-center']: {
      tip: {
        background: 'color.light.green.50',
      }
    },
    list: {
      hover: {
        default: {
          transparent: 'color.light.neutral.50',
        }
      }
    },
    text: {
      primary: 'color.light.neutral.800',
      ['primary-inverse']: 'color.light.neutral.50',
      ['secondary-light']: 'color.light.neutral.500',
      ['secondary-dark']: 'color.light.neutral.600',
      ['secondary-dark-green']: 'color.light.azure.600',
      ['secondary-disabled-light']: 'color.light.green.400',
      ['secondary-disabled-dark']: 'color.light.azure.500',
      success: {
        primary: 'color.light.green.600',
      },
      error: {
        primary: 'color.light.red.600',
      }
    },
    link: {
      primary: 'color.light.blue.600',
    },
  },
};

export default light;
