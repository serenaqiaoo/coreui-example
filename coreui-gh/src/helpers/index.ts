export const mockAsyncTimeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
