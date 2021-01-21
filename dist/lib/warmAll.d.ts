import { PromiseAsyncLike } from './types';
interface PromiseLimitWarmAllOptions {
    limit?: number;
    race?: number;
}
export declare function warmAll<U>(taskArray: PromiseAsyncLike<U>[], options?: PromiseLimitWarmAllOptions): Promise<(U | Error)[]>;
export {};
