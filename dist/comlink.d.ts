/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface Endpoint {
  postMessage(message: any, transfer?: any[]): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {}
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {}
  ): void;
}
declare type ProxiedObject<T> = {
  [P in keyof T]: T[P] extends (...args: infer Arguments) => infer R
    ? (...args: Arguments) => Promise<R>
    : Promise<T[P]>
};
export declare type ProxyResult<T> = ProxiedObject<T> &
  (T extends (...args: infer Arguments) => infer R
    ? (...args: Arguments) => Promise<R>
    : unknown) &
  (T extends {
    new (...args: infer ArgumentsType): infer InstanceType;
  }
    ? {
        new (...args: ArgumentsType): Promise<ProxiedObject<InstanceType>>;
      }
    : unknown);
export declare type Proxy = Function;
export declare type Exposable = Function | Object;
export interface TransferHandler {
  canHandle: (obj: {}) => Boolean;
  serialize: (obj: {}) => {};
  deserialize: (obj: {}) => {};
}
export declare const transferHandlers: Map<string, TransferHandler>;
export declare function proxy<T = any>(
  endpoint: Endpoint | Window,
  target?: any
): ProxyResult<T>;
export declare function proxyValue<T>(obj: T): T;
export declare function expose(
  rootObj: Exposable,
  endpoint: Endpoint | Window
): void;
export {};
