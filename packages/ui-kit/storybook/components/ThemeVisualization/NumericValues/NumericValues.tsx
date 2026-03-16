import React, { type FC } from 'react';

import { i18n } from '@i18n';

import { Props } from './NumericValues.props';

export const NumericValues: FC<Props> = ({ numericValues }) => {
  return (
    <>
      <h2>{i18n.t('Numeric values')}</h2>

      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            {[i18n.t('Name'), i18n.t('Value')].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {numericValues.map((item) => (
            <tr key={item.key}>
              <td>
                <b>{item.key}</b>
              </td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
