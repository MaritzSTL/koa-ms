import { Logger } from "pino";
/**
 * PLEASE NOTE: this is an exceedingly simple implementation of a cache
 * because there weren't any clear best-in-class implementations, and the
 * dependency chain expansion for a lot of the options I reviewed weren't
 * worth it. This is intended to be a stable, minimal cache for app configuration
 * and middleware, but IS POC-ish, and not set in stone.
 *
 * This file is this adapted to ts and es modules: https://github.com/ptarjan/node-cache/blob/master/index.js
 *
 * If you need more functionality, feel completely free to enhance or eject from this.
 *
 * Thanks,
 * Chris Zempel
 */

type Record<V> = {
  value: V;
  expire?: number;
  timeout?: ReturnType<typeof setTimeout>;
};

type _Cache<K extends string, V> = {
  [key in K]?: Record<V>;
};

class Cache<K extends string, V> {
  private _cache: _Cache<K, V>;
  private _hitCount: number;
  private _missCount: number;
  private _size: number;
  private _debug: Boolean;
  private _logger: Logger;

  constructor(logger: Logger = null, debug?: Boolean) {
    this._logger = logger || null;
    this._debug = debug || process.env.NODE_ENV !== "production";

    this._cache = {};
    this._hitCount = 0;
    this._missCount = 0;
    this._size = 0;
  }

  public put(
    key: K,
    value: V,
    time?: number, // ms
    timeoutCallback?: (key: K, value: V) => void
  ): V {
    this.log(`Caching ${key} - ${value} ${time} ${timeoutCallback}`);

    if (typeof time !== "undefined" && time <= 0) {
      throw new Error("Cache timeout must be a positive number");
    }

    const oldRecord = this._cache[key];
    if (oldRecord) {
    } else {
      this._size++;
    }

    const record: Record<V> = {
      value,
      expire: time + Date.now() // will eval to NaN if time is undefined
    };

    // If time was supplied, set expiry logic to activate at specified time
    // call timeoutCallback method with key/value if provided
    if (!isNaN(record.expire)) {
      record.timeout = setTimeout(
        function() {
          this.delete(key);
          if (timeoutCallback) {
            timeoutCallback(key, value);
          }
        }.bind(this),
        time
      );
    }

    this._cache[key] = record;

    return value;
  }

  public get(key: K): V | null {
    const record = this._cache[key];

    if (typeof record === "undefined") {
      if (this._debug) this._missCount++;
      return null;
    }

    if (!this._hasExpiry(record)) {
      if (this._debug) this._hitCount++;
      return record.value;
    }

    // In case we somehow get a record that's expired, we handle that here.
    if (this._hasExpiry(record) && record.expire >= Date.now()) {
      if (this._debug) this._hitCount++;
      return record.value;
    } else {
      if (this._debug) this._missCount++;
      this.delete(key);
      return null;
    }
  }

  // Attempts to delete a record. Returns true if it does, false if it doesn't.
  public delete(key: K): boolean {
    const record = this._cache[key];

    if (!record) return false;

    if (record) {
      if (this._hasExpiry(record)) {
        clearTimeout(record.timeout);
      }
      this._del(key);
      return true;
    }

    return false;
  }

  protected _del(key: K) {
    this._size--;
    delete this._cache[key];
  }

  /**
   * expire is set via
   *  `expire: time + Date.now()`
   * which will evaluate to NaN if time is undefined.
   *
   * returns whether or not the given record has expiry set
   */
  private _hasExpiry(record: Record<V>): boolean {
    return !isNaN(record.expire);
  }

  // public delete(key) {}

  public clear() {
    for (let key in this._cache) {
      this.delete(key);
    }
  }

  public get hits(): Number {
    return this._hitCount;
  }

  public get misses(): Number {
    return this._missCount;
  }

  public get size(): Number {
    return this._size;
  }

  public get debug() {
    return this._debug;
  }

  private log(message: string) {
    if (this._debug && this._logger) this._logger.info(message);
  }
}

export { Cache };
