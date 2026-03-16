import React from 'react';

type TestProps<Props> = Array<Props>;
type PropDesc<Props> = { [K in keyof Props]?: Array<Props[K]> };

export function cartesian<Props>(propDesc: PropDesc<Props>): TestProps<Props> {
  return Object.entries(propDesc).reduce<TestProps<Props>>(
    (acc, [prop, values]: [string, any]) => {
      const res: any[] = [];

      acc.forEach((props) => {
        values.forEach((value: any) => {
          res.push({ ...props, [prop]: value });
        });
      });

      return res;
    },
    [{}] as TestProps<Props>
  );
}

export function multiCartesian<Props>(
  propSets: Array<PropDesc<Props>>
): TestProps<Props> {
  if (propSets.length === 0) {
    return [{} as any];
  }

  return propSets.reduce(
    (acc, ortho) => acc.concat(cartesian(ortho) as any),
    []
  );
}

export function prettyProps(props: any) {
  return Object.entries(props)
    .sort(([key1], [key2]) => Number(key1 > key2))
    .map(([prop, value]: [string, any]) => {
      if (value === undefined) {
        return `${prop}=undefined`;
      }

      if (value === true) {
        return prop;
      }

      if (
        React.isValidElement(value) ||
        (Array.isArray(value) &&
          value.every((node: any) => React.isValidElement(node)))
      ) {
        return `${prop}=<jsx>`;
      }

      if (prop === 'style' || prop === 'src' || prop === 'photos') {
        const _value = JSON.stringify(value);

        return `${prop}=${_value.replace(/"\\?data:.+?"+?/gi, '{base64}')}`;
      }

      return `${prop}=${JSON.stringify(value)}`;
    })
    .join(' ');
}
