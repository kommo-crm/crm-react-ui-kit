export type StripPrefix<
  T extends string,
  Prefix extends string = '--crm-ui-kit',
> = T extends `${Prefix}-${infer Rest}` ? Rest : never;
