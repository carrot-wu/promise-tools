declare type PromiseAsyncLike<U> = (...args: any[]) => Promise<U>;
interface PromiseLimitWarmAllOptions {
    limit?: number;
    race?: number;
}
export declare function warmAll<U>(taskArray: PromiseAsyncLike<U>[], options?: PromiseLimitWarmAllOptions): Promise<(U | Error)[]>;
export {};
