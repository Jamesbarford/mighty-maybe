export type Maybe<T> = T | null | undefined;
export type OperatorMaybeFunction<T, V> = (val: NonNullable<T>) => V;

export function isMaybe(arg: any): arg is null | undefined {
  return arg === undefined || arg === null;
}

export function maybeFirst<T, V>(
  maybes: Maybe<T>[],
  cb: (val: T) => V
): Maybe<V> {
  const len = maybes ? maybes.length : 0
  let maybe = null;
  for (let i = 0; i < len; ++i) {
    maybe = maybes[i];

    if (!isMaybe(maybe)) {
      return cb(maybe);
    }
  }
  return null;
}

export function maybeMap<T, V>(maybe: Maybe<T>, cb: (val: T) => V): Maybe<V> {
  if (!isMaybe(maybe)) {
    return cb(maybe);
  }
  return null;
}

export function maybeOpFilter<T>(predicate: (val: T) => boolean) {
  return (val: T): Maybe<T> => {
    if (!isMaybe(val) && predicate(val)) {
      return val;
    }
    return null;
  };
}

export function maybeOpMap<T, V>(cb: OperatorMaybeFunction<T, V>) {
  return (val: NonNullable<T>): Maybe<V> => {
    if (!isMaybe(val)) {
      return cb(val);
    }
    return null;
  };
}

export function maybeMapOrElse<T, V>(
  maybe: Maybe<T>,
  cb: (val: T) => V,
  fallback: () => V
): V {
  if (!isMaybe(maybe)) {
    return cb(maybe);
  }
  return fallback();
}

function __maybePipe<T, V>(
  maybe: Maybe<T>,
  cbs: OperatorMaybeFunction<T, V>[]
): Maybe<V> {
  let next: Maybe<any> = maybe;
  let cb: OperatorMaybeFunction<any, any>;
  const len = cbs.length;

  for (let i = 0; i < len; ++i) {
    cb = cbs[i];
    if (!isMaybe(next)) {
      next = cb(next);
    }
  }

  return next;
}

export function maybePipe<T, V>(
  maybe: Maybe<T>,
  ...cb: ((val: T) => V)[]
): Maybe<V> {
  return __maybePipe(maybe, cb);
}

export function maybeMapAll<V>(
  maybes: Maybe<any>[],
  cb: (val: any) => V
): Maybe<V> {
  if (isMaybe(maybes)) {
    return null;
  }

  let i = 0;
  const len = maybes.length;
  let maybe = maybes[i];

  for (; i < len; ++i) {
    if (isMaybe(maybe)) {
      return null;
    }
    maybe = maybes[i++];
  }

  return cb(maybes);
}
