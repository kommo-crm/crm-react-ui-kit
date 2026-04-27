export default {
  /* Used in sidebar */
  'Docs': 'Documentos',
  'Usage': 'Uso',
  'Themes': 'Temas',
  'Typography': 'Tipografia',
  'Components': 'Componentes',
  'Default': 'Padrão',
  'Sizes': 'Tamanhos',
  'Ellipsis': 'Reticências',
  'Loading': 'Carregando',
  'Icons': 'Ícones',
  'Refs': 'Referências',
  'Uncontrolled': 'Não controlado',
  'Checked Styles': 'Estilos verificados',
  'States': 'Estados',
  'Vertical': 'Vertical',
  'Multi Select': 'Seleção múltipla',
  'Invalid Placement': 'Posicionamento inválido',
  'Group': 'Grupo',
  'With Description': 'Com descrição',
  'With Icons': 'Com ícones',
  'Centered': 'Centralizado',
  'Custom Themes': 'Temas personalizados',
  'Autosize': 'Dimensionamento automático',
  'Directions': 'Direções',
  'Modes': 'Modos',
  'Vertical Menu': 'Menu vertical',

  /* Used in docs */
  'Design tokens': 'Tokens de design',
  'Numeric values': 'Valores numéricos',
  'Name': 'Nome',
  'Value': 'Valor',
  'Props': 'Propriedades',
  'Parameters': 'Parâmetros',
  'Component logic': 'Lógica do componente',
  'Page markup': 'Marcação da página',
  'Theme details': 'Detalhes do tema',

  /* Components */

  /* Text */
  'Plain text': 'Texto simples',
  'Long text that will be truncated.': 'Texto longo que será truncado.',

  /* Button */
  'Go to Dashboard': 'Ir para o painel',
  'Success Ref': 'Referência de sucesso',
  'Invalid Ref': 'Referência inválida',
  'Data Attributes (Public API)': 'Atributos de dados (API pública)',
  'button-data-highlighted-description':
    'O botão utiliza o atributo `data-highlighted` como uma API pública para controlar seu estado destacado externamente. Quando esse atributo é adicionado ao elemento `<button>`, o botão será exibido em seu **estado de hover** (aplicando as variáveis de tema `--crm-ui-kit-button-hover-*`), mesmo que o cursor não esteja sobre ele.',
  'button-data-highlighted-usage':
    'Isso é útil quando o botão faz parte de um componente composto (por exemplo, um gatilho de menu dropdown) e precisa permanecer visualmente destacado enquanto seu painel associado estiver aberto.',

  /* Checkbox */
  'Mark': 'Marcar',
  'Indeterminate': 'Indeterminado',
  'Disabled': 'Desabilitado',
  'Invalid': 'Inválido',
  'Check': 'Verificar',

  /* CheckboxGroup */
  'Select All': 'Selecionar tudo',
  'Left': 'Esquerda',
  'Top': 'Topo',
  'Right': 'Direita',

  /* FilterTabs */
  'One': 'Um',
  'Two': 'Dois',
  'Three': 'Três',
  'Four': 'Quatro',

  /* Label */
  'How can our partners help you?': 'Como nossos parceiros podem te ajudar?',
  'Tell us about yourself': 'Fale sobre você',
  'Provide more information': 'Forneça mais informações',
  'Label text': 'Texto do rótulo',
  'Minimize chat apps within a single button':
    'Minimize os aplicativos de chat com um único botão',

  /* Select */
  'Really very long option':
    'Uma opção muito looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooonga',
  'Custom items with icons': 'Itens personalizados com ícones',
  'With preselected item': 'Com item pré-selecionado',
  'With Placeholder': 'Com placeholder',
  'Option': 'Opção',

  /* Switcher */
  'Checked': 'Marcado',
  'Click me': 'Clique aqui',

  /* TextArea */
  'Required field': 'Campo obrigatório',

  /* ContextMenu */
  'contextmenu-data-attrs-intro':
    'O ContextMenu expõe diversos atributos `data-*` em seus elementos DOM renderizados. Esses atributos funcionam como uma API pública, permitindo que códigos externos os utilizem para estilização, testes e integração com outros componentes.',
  'contextmenu-trigger-highlighted-presence':
    'Quando o menu estiver **aberto** ou o gatilho estiver em **hover**',
  'contextmenu-trigger-highlighted-desc':
    'Indica que o gatilho está em um estado ativo, o que é útil para mantê-lo visualmente destacado enquanto o menu está aberto. Quando um `Button` é usado como filho com a prop `asChild`, os estilos de `:hover ou [data-highlighted]` do próprio botão são aplicados automaticamente.',
  'contextmenu-presence-always': '**Sempre**',
  'contextmenu-item-data-item-desc':
    'Atributo marcador presente em todos os itens do menu. Ele é usado internamente para navegação via teclado e lógica de posicionamento automático. Também pode ser utilizado em testes e seletores para direcionar itens específicos do menu.',
  'contextmenu-presence-focused-or-submenu':
    'Quando o item estiver em **foco/hover** ou quando seu **submenu estiver aberto**',
  'contextmenu-item-highlighted-desc':
    'Atributo padrão de destaque do Radix. Indica que o item está atualmente ativo — acionado por hover do mouse, foco via teclado ou pela abertura de um submenu filho (`SubRoot`).',
  'contextmenu-presence-non-selectable': 'Quando `isSelectable={false}`',
  'contextmenu-item-non-selectable-desc':
    'Presente em itens não selecionáveis. Esses itens são excluídos do ciclo de navegação por teclado e dos cálculos de posicionamento automático, e não fecham o menu quando clicados.',
  'contextmenu-checkbox-data-item-desc':
    'Mesmo marcador de `Item`. Presente em todos os itens de checkbox para navegação por teclado e posicionamento.',
  'contextmenu-checkbox-highlighted-desc':
    'Mesmo comportamento de `Item`. Fica ativo quando está em destaque ou quando um `SubRoot` filho está aberto dentro deste item de checkbox.',
  'contextmenu-radio-data-item-desc':
    'Mesmo marcador de `Item`. Presente em todos os itens de rádio para navegação por teclado e posicionamento.',
  'contextmenu-radio-highlighted-desc':
    'Mesmo comportamento de `Item`. Fica ativo quando está em destaque ou quando um `SubRoot` filho está aberto dentro deste item de rádio.',
  'contextmenu-subtrigger-data-item-desc':
    'Atributo marcador, igual ao de `Item`. Permite que o SubTrigger participe do ciclo de navegação por teclado.',
  'contextmenu-subtrigger-highlighted-presence':
    'Quando o **submenu estiver aberto** ou o item estiver em **destaque**',
  'contextmenu-subtrigger-highlighted-desc':
    'Mantém o gatilho visualmente ativo enquanto seu submenu estiver aberto, ou quando estiver em hover ou com foco.',
  'contextmenu-subtrigger-submenu-trigger-desc':
    'Marcador interno que identifica este elemento como um gatilho de submenu. Usado por `ItemRightSlot` e `useSubMenu` para detectar submenus aninhados.',
  'contextmenu-subroot-highlighted-presence':
    'Quando o **SubRoot** estiver aberto ou o item estiver em **destaque**',
  'contextmenu-subroot-highlighted-desc':
    'Mantém o gatilho visualmente ativo enquanto o menu SubRoot estiver exibido.',
  'contextmenu-subroot-submenu-trigger-desc':
    'Mesmo marcador de `SubTrigger`. Identifica este elemento como um gatilho de submenu para detecção interna por `ItemRightSlot` e `useSubMenu`.',
  'contextmenu-content-menu-level-value':
    'Número (`1` para raiz, `2+` para níveis aninhados)',
  'contextmenu-content-menu-level-desc':
    'Indica a profundidade de aninhamento do menu. O conteúdo raiz é nível `1`, e cada `SubContent` ou `SubRoot.Content` incrementa esse valor em um. É usado internamente para detecção de perda de foco, a fim de determinar quais menus estão abertos.',
  'contextmenu-focusblocker-blocker-desc':
    'Marcador interno aplicado ao overlay que bloqueia eventos de ponteiro e foco no menu pai enquanto um submenu `SubRoot` está aberto. É usado principalmente internamente e raramente é necessário no código do usuário.',
  'Profile': 'Perfil',
  'User ID': 'ID do usuário',
  'Settings': 'Configurações',
  'Theme': 'Tema',
  'Light': 'Claro',
  'Dark': 'Escuro',
  'Lead': 'Lead',
  'Edit': 'Editar',
  'Delete': 'Excluir',
  'Export to PDF': 'Exportar para PDF',
  'Enable notifications': 'Ativar notificações',
  'Hover me': 'Passe o cursor',
};
