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
    'O Button trata `data-highlighted` como um contrato público para controle externo de destaque. Quando este atributo está presente no elemento `<button>`, o botão é exibido em seu **estado hover** (usando as variáveis de tema `--crm-ui-kit-button-hover-*`), independentemente de o cursor estar realmente sobre ele.',
  'button-data-highlighted-usage':
    'Isso é útil quando o botão está incorporado em um componente composto (por exemplo, um gatilho de menu suspenso) que precisa manter o botão visualmente destacado enquanto seu painel associado está aberto.',

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
    'ContextMenu expõe vários atributos `data-*` em elementos DOM renderizados. Estes atributos servem como um contrato público: código externo pode confiar neles para estilização, testes e integração com outros componentes.',
  'contextmenu-trigger-highlighted-presence':
    'Quando o menu está **aberto** ou o gatilho está **destacado**',
  'contextmenu-trigger-highlighted-desc':
    'Indica que o gatilho está em um estado ativo. Útil para manter o gatilho visualmente destacado enquanto o menu está aberto. Quando um `Button` é usado como filho com `asChild`, os próprios estilos `:hover / [data-highlighted]` do botão se aplicam automaticamente.',
  'contextmenu-presence-always': '**Sempre**',
  'contextmenu-item-data-item-desc':
    'Atributo marcador presente em cada item. Usado internamente para navegação por teclado e lógica de auto-posicionamento. Também pode ser usado em testes e seletores para direcionar itens do menu.',
  'contextmenu-presence-focused-or-submenu':
    'Quando o item está **focado/destacado** ou seu **submenu está aberto**',
  'contextmenu-item-highlighted-desc':
    'Atributo de destaque padrão do Radix. Indica que o item está atualmente ativo — seja por hover do mouse, foco do teclado, ou porque um submenu filho (`SubRoot`) está aberto.',
  'contextmenu-presence-non-selectable': 'Quando `isSelectable={false}`',
  'contextmenu-item-non-selectable-desc':
    'Presente em itens não selecionáveis. Estes itens são excluídos do ciclo de navegação por teclado e dos cálculos de auto-posicionamento. Não fecham o menu ao clicar.',
  'contextmenu-checkbox-data-item-desc':
    'Mesmo marcador que `Item`. Presente em cada item checkbox para navegação por teclado e posicionamento.',
  'contextmenu-checkbox-highlighted-desc':
    'Mesmo comportamento que `Item`. Ativo quando destacado ou quando um `SubRoot` filho está aberto dentro deste item checkbox.',
  'contextmenu-radio-data-item-desc':
    'Mesmo marcador que `Item`. Presente em cada item radio para navegação por teclado e posicionamento.',
  'contextmenu-radio-highlighted-desc':
    'Mesmo comportamento que `Item`. Ativo quando destacado ou quando um `SubRoot` filho está aberto dentro deste item radio.',
  'contextmenu-subtrigger-data-item-desc':
    'Atributo marcador, igual ao `Item`. Permite que SubTrigger participe do ciclo de navegação por teclado.',
  'contextmenu-subtrigger-highlighted-presence':
    'Quando o **sub está aberto** ou o item está **destacado**',
  'contextmenu-subtrigger-highlighted-desc':
    'Mantém o gatilho visualmente ativo enquanto seu submenu é exibido, ou quando destacado/focado.',
  'contextmenu-subtrigger-submenu-trigger-desc':
    'Marcador interno que identifica este elemento como um gatilho de submenu. Usado por `ItemRightSlot` e `useSubMenu` para detectar submenus aninhados.',
  'contextmenu-subroot-highlighted-presence':
    'Quando o **SubRoot está aberto** ou o item está **destacado**',
  'contextmenu-subroot-highlighted-desc':
    'Mantém o gatilho visualmente ativo enquanto seu menu SubRoot é exibido.',
  'contextmenu-subroot-submenu-trigger-desc':
    'Mesmo marcador que `SubTrigger`. Identifica este elemento como um gatilho de submenu para detecção interna por `ItemRightSlot` e `useSubMenu`.',
  'contextmenu-content-menu-level-value':
    'Número (`1` para raiz, `2+` para aninhado)',
  'contextmenu-content-menu-level-desc':
    'Indica a profundidade de aninhamento do menu. O conteúdo raiz é nível `1`, cada `SubContent` ou `SubRoot.Content` incrementa em um. Usado internamente para detecção de perda de foco para determinar quais menus estão abertos.',
  'contextmenu-focusblocker-blocker-desc':
    'Marcador interno na sobreposição que bloqueia eventos de ponteiro/foco no menu pai enquanto um submenu `SubRoot` está aberto. Usado principalmente internamente; raramente necessário para consumidores.',
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
