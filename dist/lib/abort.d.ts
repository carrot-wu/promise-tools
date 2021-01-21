import { PromiseAsyncLike } from './types';
interface RetryOptions {
    time?: number;
}
export declare class AbortError extends Error {
    originalError: Error;
    constructor(message: string | Error);
}
export declare function abort<U>(task: PromiseAsyncLike<U>, options?: RetryOptions): Promise<U>;
export {};
