export default {
  /* Used in sidebar */
  'Docs': 'Documentos',
  'Usage': 'Uso',
  'Themes': 'Temas',
  'Typography': 'Tipografía',
  'Components': 'Componentes',
  'Default': 'Predeterminado',
  'Sizes': 'Tamaños',
  'Ellipsis': 'Elipsis',
  'Loading': 'Cargando',
  'Icons': 'Íconos',
  'Refs': 'Referencias',
  'Uncontrolled': 'No controlado',
  'Checked Styles': 'Estilos verificados',
  'States': 'Estados',
  'Vertical': 'Vertical',
  'Multi Select': 'Deshabilitado',
  'Invalid Placement': 'Selección múltiple',
  'Group': 'Grupo',
  'With Description': 'Con descripción',
  'With Icons': 'Con íconos',
  'Centered': 'Centrado',
  'Custom Themes': 'Temas personalizados',
  'Autosize': 'Ajuste automático',
  'Directions': 'Direcciones',
  'Modes': 'Modos',
  'Vertical Menu': 'Menú vertical',

  /* Used in docs */
  'Design tokens': 'Tokens de diseño',
  'Numeric values': 'Valores numéricos',
  'Name': 'Nombre',
  'Value': 'Valor',
  'Props': 'Propiedades',
  'Parameters': 'Parámetros',
  'Component logic': 'Lógica del componente',
  'Page markup': 'Marcador de página',
  'Theme details': 'Detalles del tema',

  /* Components */

  /* Text */
  'Plain text': 'Texto simple',
  'Long text that will be truncated.': 'Texto largo que será truncado.',

  /* Button */
  'Go to Dashboard': 'Ir al Panel',
  'Success Ref': 'Referencia de éxito',
  'Invalid Ref': 'Referencia no válida',
  'Data Attributes (Public API)': 'Atributos de datos (API pública)',
  'button-data-highlighted-description':
    'El Button trata `data-highlighted` como un contrato público para el control externo de resaltado. Cuando este atributo está presente en el elemento `<button>`, el botón se muestra en su **estado hover** (usando las variables de tema `--crm-ui-kit-button-hover-*`), independientemente de si el cursor está realmente sobre él.',
  'button-data-highlighted-usage':
    'Esto es útil cuando el botón está integrado en un componente compuesto (por ejemplo, un disparador de menú desplegable) que necesita mantener el botón visualmente resaltado mientras su panel asociado está abierto.',

  /* Checkbox */
  'Mark': 'Marcar',
  'Indeterminate': 'Indeterminado',
  'Disabled': 'Deshabilitado',
  'Invalid': 'No válido',
  'Check': 'Verificar',

  /* CheckboxGroup */
  'Select All': 'Seleccionar todo',
  'Left': 'Izquierda',
  'Top': 'Arriba',
  'Right': 'Derecha',

  /* FilterTabs */
  'One': 'Uno',
  'Two': 'Dos',
  'Three': 'Tres',
  'Four': 'Cuatro',

  /* Label */
  'How can our partners help you?': '¿Cómo pueden ayudarte nuestros socios?',
  'Tell us about yourself': 'Cuéntanos sobre ti',
  'Provide more information': 'Proporciona más información',
  'Label text': 'Texto de la etiqueta',
  'Minimize chat apps within a single button':
    'Minimiza las aplicaciones de chat con un solo botón',

  /* Select */
  'Really very long option':
    'Una opción muy laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarga opción',
  'Custom items with icons': 'Elementos personalizados con íconos',
  'With preselected item': 'Con ítem preseleccionado',
  'With Placeholder': 'Con placeholder',
  'Option': 'Opción',

  /* Switcher */
  'Checked': 'Marcado',
  'Click me': 'Haz clic aquí',

  /* TextArea */
  'Required field': 'Campo requerido',

  /* ContextMenu */
  'contextmenu-data-attrs-intro':
    'ContextMenu expone varios atributos `data-*` en los elementos DOM renderizados. Estos atributos sirven como un contrato público: el código externo puede confiar en ellos para estilos, pruebas e integración con otros componentes.',
  'contextmenu-trigger-highlighted-presence':
    'Cuando el menú está **abierto** o el disparador está **señalado**',
  'contextmenu-trigger-highlighted-desc':
    'Indica que el disparador está en un estado activo. Útil para mantener el disparador visualmente resaltado mientras el menú está abierto. Cuando se usa un `Button` como hijo con `asChild`, los propios estilos `:hover / [data-highlighted]` del botón se aplican automáticamente.',
  'contextmenu-presence-always': '**Siempre**',
  'contextmenu-item-data-item-desc':
    'Atributo marcador presente en cada elemento. Se usa internamente para la navegación por teclado y la lógica de auto-posicionamiento. También se puede usar en pruebas y selectores para apuntar a elementos del menú.',
  'contextmenu-presence-focused-or-submenu':
    'Cuando el elemento está **enfocado/señalado** o su **submenú está abierto**',
  'contextmenu-item-highlighted-desc':
    'Atributo de resaltado estándar de Radix. Indica que el elemento está actualmente activo — ya sea por hover del ratón, enfoque del teclado, o porque un submenú hijo (`SubRoot`) está abierto.',
  'contextmenu-presence-non-selectable': 'Cuando `isSelectable={false}`',
  'contextmenu-item-non-selectable-desc':
    'Presente en elementos no seleccionables. Estos elementos se excluyen del ciclo de navegación por teclado y de los cálculos de auto-posicionamiento. No cierran el menú al hacer clic.',
  'contextmenu-checkbox-data-item-desc':
    'Mismo marcador que `Item`. Presente en cada elemento checkbox para navegación por teclado y posicionamiento.',
  'contextmenu-checkbox-highlighted-desc':
    'Mismo comportamiento que `Item`. Activo cuando está resaltado o cuando un `SubRoot` hijo está abierto dentro de este elemento checkbox.',
  'contextmenu-radio-data-item-desc':
    'Mismo marcador que `Item`. Presente en cada elemento radio para navegación por teclado y posicionamiento.',
  'contextmenu-radio-highlighted-desc':
    'Mismo comportamiento que `Item`. Activo cuando está resaltado o cuando un `SubRoot` hijo está abierto dentro de este elemento radio.',
  'contextmenu-subtrigger-data-item-desc':
    'Atributo marcador, igual que `Item`. Permite a SubTrigger participar en el ciclo de navegación por teclado.',
  'contextmenu-subtrigger-highlighted-presence':
    'Cuando el **sub está abierto** o el elemento está **resaltado**',
  'contextmenu-subtrigger-highlighted-desc':
    'Mantiene el disparador visualmente activo mientras se muestra su submenú, o cuando está señalado/enfocado.',
  'contextmenu-subtrigger-submenu-trigger-desc':
    'Marcador interno que identifica este elemento como un disparador de submenú. Usado por `ItemRightSlot` y `useSubMenu` para detectar submenús anidados.',
  'contextmenu-subroot-highlighted-presence':
    'Cuando el **SubRoot está abierto** o el elemento está **resaltado**',
  'contextmenu-subroot-highlighted-desc':
    'Mantiene el disparador visualmente activo mientras se muestra su menú SubRoot.',
  'contextmenu-subroot-submenu-trigger-desc':
    'Mismo marcador que `SubTrigger`. Identifica este elemento como un disparador de submenú para detección interna por `ItemRightSlot` y `useSubMenu`.',
  'contextmenu-content-menu-level-value':
    'Número (`1` para raíz, `2+` para anidado)',
  'contextmenu-content-menu-level-desc':
    'Indica la profundidad de anidamiento del menú. El contenido raíz es nivel `1`, cada `SubContent` o `SubRoot.Content` incrementa en uno. Se usa internamente para la detección de pérdida de foco para determinar qué menús están abiertos.',
  'contextmenu-focusblocker-blocker-desc':
    'Marcador interno en la capa superpuesta que bloquea eventos de puntero/foco en el menú padre mientras un submenú `SubRoot` está abierto. Se usa principalmente internamente; raramente necesitado por los consumidores.',
  'Profile': 'Perfil',
  'User ID': 'ID de usuario',
  'Settings': 'Configuración',
  'Theme': 'Tema',
  'Light': 'Claro',
  'Dark': 'Oscuro',
  'Lead': 'Lead',
  'Edit': 'Editar',
  'Delete': 'Eliminar',
  'Export to PDF': 'Exportar a PDF',
  'Enable notifications': 'Activar notificaciones',
  'Hover me': 'Pasa el cursor',
};
