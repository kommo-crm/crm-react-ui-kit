import { ColorTokenValue } from '@/types/common';

export type ComponentTokens = {
  'triggers': {
    plug: {
      lead: {
        background: ColorTokenValue;
      };
    };
  };
  'trigger': {
    plug: {
      item: {
        background: ColorTokenValue;
      };
    };
  };
  'button': {
    classic: {
      background: ColorTokenValue;
      hover: {
        background: ColorTokenValue;
      };
    };
  };
  'highlight': {
    mark: {
      background: ColorTokenValue;
    };
  };
  'left-menu': {
    border: ColorTokenValue;
    background: {
      primary: ColorTokenValue;
      secondary: ColorTokenValue;
    };
    text: {
      primary: ColorTokenValue;
    };
  };
  'table': {
    hover: {
      background: ColorTokenValue;
      selected: {
        background: ColorTokenValue;
      };
    };
    multiaction: {
      background: ColorTokenValue;
    };
  };
  'search': {
    breadcrumbs: {
      background: ColorTokenValue;
      border: ColorTokenValue;
    };
  };
  'notification': {
    favorite: {
      background: ColorTokenValue;
    };
  };
  'pipeline': {
    item: {
      'drag': {
        placeholder: ColorTokenValue;
      };
      'message': {
        background: ColorTokenValue;
      };
      'not-purchase': {
        background: ColorTokenValue;
      };
    };
  };
  'card': {
    top: {
      background: ColorTokenValue;
    };
  };
  'digital-pipeline': {
    item: {
      recently: ColorTokenValue;
    };
    trigger: {
      'default': ColorTokenValue;
      'widget': ColorTokenValue;
      'calendly': ColorTokenValue;
      'webhook': ColorTokenValue;
      'adwords': ColorTokenValue;
      'mandrill': ColorTokenValue;
      'twilio': ColorTokenValue;
      'mailchimp': ColorTokenValue;
      'facebook': ColorTokenValue;
      'stripe': ColorTokenValue;
      'task': ColorTokenValue;
      'form': ColorTokenValue;
      'email': ColorTokenValue;
      'analytics': ColorTokenValue;
      'vk': ColorTokenValue;
      'store-card': ColorTokenValue;
      'generate-store-card': ColorTokenValue;
      'delete-files': ColorTokenValue;
      'default-widget': ColorTokenValue;
    };
  };
  'salesbot': {
    list: {
      trigger: {
        background: ColorTokenValue;
      };
    };
    action: {
      show: {
        background: ColorTokenValue;
        button: {
          background: ColorTokenValue;
          border: ColorTokenValue;
        };
      };
      exit: {
        background: ColorTokenValue;
      };
    };
    validation: {
      border: ColorTokenValue;
      background: ColorTokenValue;
    };
  };
  'external-message': {
    background: ColorTokenValue;
    reply: {
      background: ColorTokenValue;
    };
  };
  'mail': {
    error: {
      background: ColorTokenValue;
      border: ColorTokenValue;
    };
  };
  'kalendae': {
    active: {
      element: ColorTokenValue;
    };
    range: {
      element: ColorTokenValue;
    };
    hover: {
      background: ColorTokenValue;
    };
  };
  'tasks': {
    date: {
      active: {
        element: ColorTokenValue;
      };
      today: {
        element: ColorTokenValue;
      };
      draggable: {
        element: ColorTokenValue;
      };
    };
  };
  'amomarket': {
    statuses: {
      installed: {
        background: ColorTokenValue;
      };
    };
  };
  'info': {
    bubble: {
      error: {
        background: ColorTokenValue;
        border: ColorTokenValue;
      };
    };
  };
  'transaction': {
    background: ColorTokenValue;
    border: ColorTokenValue;
  };
  'payment': {
    status: {
      paid: {
        background: ColorTokenValue;
      };
    };
  };
  'global': {
    onboarding: {
      'light-blue': ColorTokenValue;
      'blue-purple': ColorTokenValue;
    };
  };
  'help-center': {
    tip: {
      background: ColorTokenValue;
    };
  };
  'list': {
    hover: {
      default: {
        transparent: ColorTokenValue;
      };
    };
  };
};
