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
    'El botón utiliza el atributo `data-highlighted` como una API pública para controlar su estado resaltado de forma externa. Cuando se agrega este atributo al elemento `<button>`, el botón se mostrará en su **estado hover** (aplicando las variables de tema `--crm-ui-kit-button-hover-*`), incluso si el cursor no se encuentra sobre él.',
  'button-data-highlighted-usage':
    'Esto es útil cuando el botón forma parte de un componente compuesto (por ejemplo, un disparador de menú desplegable) y necesita permanecer visualmente resaltado mientras su panel asociado se encuentra abierto.',

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
    'El ContextMenu expone varios atributos `data-*` en los elementos DOM que renderiza. Estos atributos funcionan como una API pública, lo que permite que el código externo los utilice para estilos, pruebas e integración con otros componentes.',
  'contextmenu-trigger-highlighted-presence':
    'Cuando el menú está **abierto** o el disparador está en **hover**',
  'contextmenu-trigger-highlighted-desc':
    'Indica que el disparador está en estado activo, lo cual es útil para mantenerlo resaltado visualmente mientras el menú está abierto. Cuando se usa un `Button` como elemento secundario con la propiedad `asChild`, los estilos propios del botón `:hover o [data-highlighted]` se aplican automáticamente.',
  'contextmenu-presence-always': '**Siempre**',
  'contextmenu-item-data-item-desc':
    'Atributo marcador presente en cada ítem del menú. Se utiliza internamente para la navegación por teclado y la lógica de posicionamiento automático. También puede usarse en pruebas y selectores para apuntar a ítems específicos del menú.',
  'contextmenu-presence-focused-or-submenu':
    'Cuando el ítem está **enfocado/en hover** o su **submenú está abierto**',
  'contextmenu-item-highlighted-desc':
    'Atributo de resaltado estándar de Radix. Indica que el elemento está activo en ese momento; se activa al pasar el cursor por encima, al recibir el foco del teclado o cuando hay un submenú secundario abierto (`SubRoot`).',
  'contextmenu-presence-non-selectable': 'Cuando `isSelectable={false}`',
  'contextmenu-item-non-selectable-desc':
    'Presente en ítems no seleccionables. Estos ítems quedan excluidos del ciclo de navegación por teclado y de los cálculos de posicionamiento automático, y no cierran el menú al hacer clic en ellos.',
  'contextmenu-checkbox-data-item-desc':
    'Mismo marcador que `Item`. Presente en cada casilla de verificación para el posicionamiento y la navegación por teclado.',
  'contextmenu-checkbox-highlighted-desc':
    'Mismo comportamiento que `Item`. Activo cuando está resaltado o cuando un elemento secundario `SubRoot` está abierto dentro de este elemento de casilla de verificación.',
  'contextmenu-radio-data-item-desc':
    'Mismo marcador que `Item`. Presente en todos los elementos de radio para el posicionamiento y la navegación por teclado.',
  'contextmenu-radio-highlighted-desc':
    'Mismo comportamiento que `Item`. Activo cuando está resaltado o cuando un elemento secundario `SubRoot` está abierto dentro de este elemento de radio.',
  'contextmenu-subtrigger-data-item-desc':
    'Atributo marcador, igual que `Item`. Permite que el SubTrigger participe en el ciclo de navegación por teclado.',
  'contextmenu-subtrigger-highlighted-presence':
    'Cuando el submenú está **abierto** o el ítem está **resaltado**',
  'contextmenu-subtrigger-highlighted-desc':
    'Mantiene el disparador visualmente activo mientras su submenú está abierto, o cuando está en hover o enfocado.',
  'contextmenu-subtrigger-submenu-trigger-desc':
    'Atributo interno que identifica este elemento como un disparador de submenú. Es utilizado por `ItemRightSlot` y `useSubMenu` para detectar submenús anidados.',
  'contextmenu-subroot-highlighted-presence':
    'Cuando el **SubRoot está abierto** o el ítem está **resaltado**',
  'contextmenu-subroot-highlighted-desc':
    'Mantiene el disparador visualmente activo mientras el menú SubRoot está visible.',
  'contextmenu-subroot-submenu-trigger-desc':
    'Mismo marcador que `SubTrigger`. Identifica este elemento como un disparador de submenú para su detección interna por `ItemRightSlot` y `useSubMenu`.',
  'contextmenu-content-menu-level-value':
    'Número (`1` para raíz, `2+` para anidados)',
  'contextmenu-content-menu-level-desc':
    'Indica la profundidad de anidación del menú. El contenido raíz es nivel `1`, y cada `SubContent` o `SubRoot.Content` incrementa el nivel en uno. Se utiliza internamente para detectar la pérdida de foco y determinar qué menús están abiertos.',
  'contextmenu-focusblocker-blocker-desc':
    'Marcador interno en la superposición que bloquea los eventos de puntero y foco en el menú principal mientras un submenú `SubRoot` está abierto. Es principalmente interno y rara vez se necesita en el código del usuario.',
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
