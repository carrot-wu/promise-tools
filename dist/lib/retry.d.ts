import { PromiseAsyncLike } from './types';
interface RetryOptions {
    time?: number;
}
export declare function retry<U>(task: PromiseAsyncLike<U>, options?: RetryOptions): Promise<U>;
export {};
