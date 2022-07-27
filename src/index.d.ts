/**
 * Either `T` or `null` or `undefined`
 */
export type Maybe<T> = T | null | undefined;

/**
 * Interface for functions passed to `maybePipe`
 */
export type OperatorMaybeFunction<T, V> = (val: NonNullable<T>) => V;

/**
 * Returns ture if value is null or undefined
 *
 * @param {any} arg - Argument to check if `null` or `undefined`
 * @return {boolean}
 */
export function isMaybe(arg: any): arg is null | undefined;

/**
 * Calls callback `cb` on first non `Maybe<T>` value from an array of maybes.
 *
 * @param {Maybe<T>[]} maybes - Array of maybes
 * @param {(val: T) => V} cb - Function to call on first non `Maybe` entity
 * @return {Maybe<V>}
 */
export function maybeFirst<T, V>(
  maybes: Maybe<T>[],
  cb: (val: T) => V
): Maybe<V>;

/**
 * Invoke callback on `Maybe` returning the value or null
 *
 * @param {Maybe<T>} maybe - Nullable value
 * @param {(val: T) => V} cb - Function to call if the maybe is not Nullable
 * @return {Maybe<V>}
 */
export function maybeMap<T, V>(maybe: Maybe<T>, cb: (val: T) => V): Maybe<V>;

/**
 * For use with `maybePipe`, operation that will end the pipeline if predicate resolves to false
 * else returns the value
 *
 * Usage:
 *
 * ```ts
 * maybePipe(value,
 * 	maybeOpFilter(x => x != 10),
 *  // ... more functions
 * )
 * ```
 *
 * @param {((val: T) => boolean)} predicate - Function that evaluates to a boolean
 * @return {(val: T) => T} identity function
 */
export function maybeOpFilter<T>(predicate: (val: T) => boolean): (val: T) => T;

/**
 * For use with `maybePipe`, operation that will end the pipeline if predicate resolves to false
 * else returns the value
 *
 * Usage:
 *
 * ```ts
 * maybePipe(value,
 * 	maybeOpFilter(x => x != 10),
 *  // ... more functions
 * )
 * ```
 *
 * @param {((val: T) => boolean)} cb - Function to call if val is not a `Maybe`
 * @return {(val: T) => T} identity function
 */
export function maybeOpMap<T, V>(
  cb: OperatorMaybeFunction<T, V>
): (val: NonNullable<T>) => V;

/**
 * Call function on maybe or fallback to a defined callback
 *
 * Usage:
 * ```ts
 * const value: Maybe<number> = 2
 *
 * maybeMapOrElse(value, val => val * 22, () => 42);
 * ```
 * @param {Maybe<T>} maybe - Nullable value
 * @param {((val: NonNullable<T>) => V)} cb - Function to call if maybe is not a `Maybe`
 * @param {(() => V)} fallback - function to call if maybe is a `Maybe` and not of type `T`
 * @return {V}
 */
export function maybeMapOrElse<T, V>(
  maybe: Maybe<T>,
  cb: (val: NonNullable<T>) => V,
  fallback: () => V
): V;

/**
 * Chain a series of callbacks on a `Maybe<T>`
 *
 * ```ts
 * const someUntypedObject: Record<string, number> = {};
 *
 * maybePipe<number>(someObject,
 * 		x => x.foo,
 * 		y => y != 42 ? y : null,
 * 		z => z + 2
 * );
 *
 * // Or with the pre-defined operations
 *
 * const someUntypedObject: Record<string, number> = {};
 *
 * maybePipe<number>(someObject,
 * 		maybeOpMap(x => x.foo),
 * 		maybeOpFilter(y => y != 42)
 * 		maybeOpMap(z => z + 2)
 * );
 *
 *
 * ```
 * @param {Maybe<T>} maybe - Nullable value
 * @param {...OperatorMaybeFunction<any, any>[]} operations - array of callback functions to sequentially call
 */
export function maybePipe<T, A>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>
): OperatorMaybeFunction<T, A>;
export function maybePipe<T, A, B>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>
): Maybe<B>;
export function maybePipe<T, A, B, C>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>,
  op3: OperatorMaybeFunction<B, C>
): Maybe<C>;
export function maybePipe<T, A, B, C, D>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>,
  op3: OperatorMaybeFunction<B, C>,
  op4: OperatorMaybeFunction<C, D>
): Maybe<D>;
export function maybePipe<T, A, B, C, D, E>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>,
  op3: OperatorMaybeFunction<B, C>,
  op4: OperatorMaybeFunction<C, D>,
  op5: OperatorMaybeFunction<D, E>
): Maybe<E>;
export function maybePipe<T, A, B, C, D, E, F>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>,
  op3: OperatorMaybeFunction<B, C>,
  op4: OperatorMaybeFunction<C, D>,
  op5: OperatorMaybeFunction<D, E>,
  op6: OperatorMaybeFunction<E, F>
): Maybe<F>;
export function maybePipe<T, A, B, C, D, E, F, G>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>,
  op3: OperatorMaybeFunction<B, C>,
  op4: OperatorMaybeFunction<C, D>,
  op5: OperatorMaybeFunction<D, E>,
  op6: OperatorMaybeFunction<E, F>,
  op7: OperatorMaybeFunction<F, G>
): Maybe<G>;
export function maybePipe<T, A, B, C, D, E, F, G, H>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>,
  op3: OperatorMaybeFunction<B, C>,
  op4: OperatorMaybeFunction<C, D>,
  op5: OperatorMaybeFunction<D, E>,
  op6: OperatorMaybeFunction<E, F>,
  op7: OperatorMaybeFunction<F, G>,
  op8: OperatorMaybeFunction<G, H>
): Maybe<H>;
export function maybePipe<T, A, B, C, D, E, F, G, H, I>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>,
  op3: OperatorMaybeFunction<B, C>,
  op4: OperatorMaybeFunction<C, D>,
  op5: OperatorMaybeFunction<D, E>,
  op6: OperatorMaybeFunction<E, F>,
  op7: OperatorMaybeFunction<F, G>,
  op8: OperatorMaybeFunction<G, H>,
  op9: OperatorMaybeFunction<H, I>
): Maybe<I>;
export function maybePipe<T, A, B, C, D, E, F, G, H, I>(
  maybe: Maybe<T>,
  op1: OperatorMaybeFunction<T, A>,
  op2: OperatorMaybeFunction<A, B>,
  op3: OperatorMaybeFunction<B, C>,
  op4: OperatorMaybeFunction<C, D>,
  op5: OperatorMaybeFunction<D, E>,
  op6: OperatorMaybeFunction<E, F>,
  op7: OperatorMaybeFunction<F, G>,
  op8: OperatorMaybeFunction<G, H>,
  op9: OperatorMaybeFunction<H, I>,
  ...operations: OperatorMaybeFunction<any, any>[]
): Maybe<{}>;

/**
 * Invoke callback on array of maybes only if _all_ of the maybes are NonNullable
 *
 * Usage:
 * ```ts
 * type Circle = {
 *   x: number;
 *   y: number;
 * };
 * const list: Circle[] = [{ x:10, y:2 }, null, {x:20, y: 69}];
 * maybeMapAll(list, [circle1, circle2, circle3] => {
 *   // logic...
 * });
 * ```
 * The callback function would not get invoked as `circle2` is null
 *
 * @param {Maybe<any>[]} maybes - Array of maybes
 * @param {((val: any[]))} cb - Function to call with array if all value are non Nullable
 * @return {Maybe<V>}
 */
export function maybeMapAll<S1, V>(
  maybes: [Maybe<S1>],
  cb: (val: [S1]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, V>(
  maybes: [Maybe<S1>, Maybe<S2>],
  cb: (val: [S1, S2]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, S3, V>(
  maybes: [Maybe<S1>, Maybe<S2>, Maybe<S3>],
  cb: (val: [S1, S2, S3]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, S3, S4, V>(
  maybes: [Maybe<S1>, Maybe<S2>, Maybe<S3>, Maybe<S4>],
  cb: (val: [S1, S2, S3, S4]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, S3, S4, S5, V>(
  maybes: [Maybe<S1>, Maybe<S2>, Maybe<S3>, Maybe<S4>, Maybe<S5>],
  cb: (val: [S1, S2, S3, S4, S5]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, S3, S4, S5, S6, V>(
  maybes: [Maybe<S1>, Maybe<S2>, Maybe<S3>, Maybe<S4>, Maybe<S5>, Maybe<S6>],
  cb: (val: [S1, S2, S3, S4, S5, S6]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, S3, S4, S5, S6, S7, V>(
  maybes: [
    Maybe<S1>,
    Maybe<S2>,
    Maybe<S3>,
    Maybe<S4>,
    Maybe<S5>,
    Maybe<S6>,
    Maybe<S7>
  ],
  cb: (val: [S1, S2, S3, S4, S5, S6, S7]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, S3, S4, S5, S6, S7, S8, V>(
  maybes: [
    Maybe<S1>,
    Maybe<S2>,
    Maybe<S3>,
    Maybe<S4>,
    Maybe<S5>,
    Maybe<S6>,
    Maybe<S7>,
    Maybe<S8>
  ],
  cb: (val: [S1, S2, S3, S4, S5, S6, S7, S8]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, S3, S4, S5, S6, S7, S8, S9, V>(
  maybes: [
    Maybe<S1>,
    Maybe<S2>,
    Maybe<S3>,
    Maybe<S4>,
    Maybe<S5>,
    Maybe<S6>,
    Maybe<S7>,
    Maybe<S8>,
    Maybe<S9>
  ],
  cb: (val: [S1, S2, S3, S4, S5, S6, S7, S8, S9]) => V
): Maybe<V>;
export function maybeMapAll<S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, V>(
  maybes: [
    Maybe<S1>,
    Maybe<S2>,
    Maybe<S3>,
    Maybe<S4>,
    Maybe<S5>,
    Maybe<S6>,
    Maybe<S7>,
    Maybe<S8>,
    Maybe<S9>,
    Maybe<S10>
  ],
  cb: (val: [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10]) => V
): Maybe<V>;
export function maybeMapAll<V>(
  maybes: Maybe<any>[],
  cb: (val: any) => V
): Maybe<V>;
