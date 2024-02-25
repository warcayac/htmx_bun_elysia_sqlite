export type TJMap<T = unknown> = Record<string, T>;
export type TJMapList = Array<TJMap>;

/* ------------------------------------------------------------------------------------------ */
export abstract class Option<T> {
  abstract isSome(): this is Some<T>;
  abstract isNone(): this is None<T>;

  when<R>(onSome: (s: T) => R, onNone: () => R): R {
    return this.isSome() ? onSome(this.value) : onNone();
  }
}

export class Some<T> extends Option<T> {
  constructor(public readonly value: T) {
    super();
  }

  isSome(): this is Some<T> {
    return true;
  }

  isNone(): this is None<T> {
    return false;
  }
}

export class None<T> extends Option<T> {
  constructor() {
    super();
  }

  isSome(): this is Some<T> {
    return false;
  }

  isNone(): this is None<T> {
    return true;
  }
}

/* ------------------------------------------------------------------------------------------ */
export abstract class Result<T, E> {
  abstract isOk(): this is Ok<T, E>;
  abstract isErr(): this is Err<T, E>;

  when<R>(onOk: (o: T) => R, onErr: (e: E) => R): R {
    const response = this.isOk() ? onOk(this.value) : this.isErr() ? onErr(this.error) : null;
    return response!;
  }
}

export class Ok<T, E> extends Result<T, E> {
  constructor(public readonly value: T) {
    super();
  }

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }
}

export class Err<T, E> extends Result<T, E> {
  constructor(public readonly error: E) {
    super();
  }

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }
}
