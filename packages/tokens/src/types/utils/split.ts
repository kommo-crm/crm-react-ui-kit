// Returns atoms from Atoms that S starts with (exact match or followed by '-')
type AtomHead<S extends string, Atoms extends string> = Atoms extends unknown
  ? S extends Atoms | `${Atoms}-${string}`
    ? Atoms
    : never
  : never;

// `S extends string` forces distribution over union S so AtomHead
// is evaluated per-member, not over the entire union at once
export type Split<
  S extends string,
  Atoms extends string = never,
> = S extends string
  ? [AtomHead<S, Atoms>] extends [never]
    ? S extends `${infer H}-${infer Tail}`
      ? [H, ...Split<Tail, Atoms>]
      : [S]
    : S extends `${AtomHead<S, Atoms>}-${infer Tail}`
      ? [AtomHead<S, Atoms>, ...Split<Tail, Atoms>]
      : [AtomHead<S, Atoms>]
  : never;
