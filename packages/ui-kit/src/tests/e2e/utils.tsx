import { isValidElement } from 'react';

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

function isPlaywrightWrappedComponent(object: Record<string, any>) {
  return (
    typeof object === 'object' &&
    object !== null &&
    Object.hasOwn(object, '__pw_type')
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
        isValidElement(value) ||
        (Array.isArray(value) && value.every(isValidElement))
      ) {
        return `${prop}=<jsx>`;
      }

      /**
       * In Playwright CT, the test runner compiles JSX via a Vite plugin that
       * transforms React elements into a serializable `{ __pw_type }` format so
       * they can be transferred from the Node.js test context to the browser.
       * This means that when `prettyProps` is called at test-name generation time
       * (before `mount()`), JSX props are already wrapped objects rather than
       * valid React elements — so `isValidElement` returns false for them.
       * We handle both representations here to produce a consistent label
       * regardless of which context `prettyProps` is running in.
       */
      if (
        isPlaywrightWrappedComponent(value) ||
        (Array.isArray(value) && value.every(isPlaywrightWrappedComponent))
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
