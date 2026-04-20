export type TupleToNestedObject<T extends unknown[], Value> = T extends [
  infer Head extends string,
  ...infer Tail extends unknown[],
]
  ? {
      [K in Head]: TupleToNestedObject<Tail, Value>;
    }
  : Value;
