export const removeEndingSlash = (a: string) => (
    a.substring(a.length - 1) === '/' ? a.substring(0, a.length - 1) : a
);
