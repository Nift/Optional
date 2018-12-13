

export class Optional<T> {

  private readonly value : T;
  public readonly hasValue : boolean;

  constructor(value : T | undefined | null){
    if(value === undefined || value === null) 
      this.hasValue = false;
    else {
      this.hasValue = true;
      this.value = value as T;
    }
  }

  match<TResult>(some: (value: T) => TResult, none: () => TResult) : TResult {
    return this.hasValue ? some(this.value) : none();
  }

  matchAsync<TResult> (some: (value: T) => Promise<TResult>, none: () => Promise<TResult>) : Promise<TResult> {
    return this.hasValue ? some(this.value) : none();
  }

  equals(other: Optional<T>) : boolean {
    if(other.hasValue && this.hasValue)
      return other.valueOrFailure() === this.value;
    if(!other.hasValue && !this.hasValue) return true;
    return false;
  }

  contains(value: T) : boolean {
    if(this.hasValue) return this.value === value;
    return false;
  }

  map<TResult>(mapFunc : (value: T) => TResult) : Optional<TResult>{
    return this.match(
      (value : T) => new Optional<TResult>(mapFunc(value)),
      () => new Optional<TResult>(undefined) 
    );
  }

  mapAsync<TResult>(mapFunc : (value: T) => Promise<TResult>) : Promise<Optional<TResult>>{
    return this.matchAsync(
      async (value : T) => { var temp = await mapFunc(value); return new Optional<TResult>(temp)},
      async () => new Optional<TResult>(undefined)
    );
  }

  filter(predicate: (value: T) => boolean) : Optional<T> {
    if(this.hasValue && predicate(this.value) ) return new Optional(this.value);
    return new Optional<T>(undefined);
  }

  async filterAsync(predicate: (value: T) => Promise<boolean>) : Promise<Optional<T>>{
    if(this.hasValue && await predicate(this.value)) return new Optional(this.value);
    return new Optional<T>(undefined);
  }

  flatMap<TResult>(flatMapFunc: (value : T) => Optional<TResult>) : Optional<TResult> {
    return this.match(
      flatMapFunc,
      () => new Optional<TResult>(undefined)
    );
  }

  flatMapAsync<TResult>(flatMapFunc: (value : T) => Promise<Optional<TResult>>) : Promise<Optional<TResult>> {
    return this.match(
      flatMapFunc,
      async () => new Optional<TResult>(undefined)
    )
  }

  valueOr(alternative:  T | (() => T) | Error | (() => never) ): T {
    if(this.hasValue) return this.value;
    if(alternative instanceof Error) throw alternative;
    if(alternative instanceof Function) return alternative(); 
    return alternative;
  }

  valueOrAsync(alternative:  Promise<T> | (() => Promise<T>) | Error | (() => never) | (() => Promise<T>)): Promise<T> {
    if(this.hasValue) return new Promise((resolve) => {resolve(this.value)});
    if(alternative instanceof Error) throw alternative;
    if(alternative instanceof Function) return alternative(); 
    return alternative;
  }

  valueOrFailure(message?: string) : T {
    if(this.hasValue) return this.value;
    throw new Error(message ? message : "There exists no value");
  }

  valueOrUndefined() : T | undefined {
    if(this.hasValue) return this.value;
    return undefined;
  }

  valueOrNull() : T | null {
    if(this.hasValue) return this.value;
    return null;
  }

  toJSON() : T | null {
    if(this.hasValue) return this.value;
    return null;
  }

}

export function Some<T>(value: T | undefined | null) : Optional<T> { 
  return new Optional<T>(value); 
}

export function None<T>() : Optional<T> {
  return new Optional<T>(undefined);
}

export function GetValues<T>(values : Optional<T>[]) : T[] {
  let storage : T[] = [];
  values.forEach(val  => {
    if(val.hasValue) storage.push(val.valueOrFailure());
  });
  return storage;
}

export function ConvertAndGetValues<A,B>(values : B[], mapFunc: (value: Optional<B>) => Optional<A> ) : A[] {
  return GetValues(values.map((value: B) => mapFunc(Some(value))));
}

export async function ConvertAndGetValuesAsync<A,B>(values : B[], mapFuncAsync: (value: Optional<B>) => Promise<Optional<A>> ) : Promise<A[]> {
  const tmp = await Promise.all(values.map((value: B) => mapFuncAsync(Some(value))));
  return GetValues(tmp);
}

export function FirstOrNone<T>(values: T[]) : Optional<T> {
  return values.length > 0 ? Some(values[0]) : None();
}

export function LastOrNone<T>(values: T[]) : Optional<T> {
  return values.length > 0 ? Some(values[values.length-1]) : None();
}
