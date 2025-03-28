import { i18n } from '@i18n';

export const SPINNER_WITH_CUSTOM_THEME = `
import { Spinner } from '@kommo-crm/crm-react-ui-kit/Spinner';
import { MySpinnerTheme } from './my-theme';

function App() {
  /* ...${i18n.t('Component logic')} */
  return (
    <div>
      {/* ${i18n.t('Page markup')}... */}
      <Spinner theme={MySpinnerTheme} />
    </div>
  );
}
`;
