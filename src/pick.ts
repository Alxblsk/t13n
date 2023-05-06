type Records = Record<string, any>;

export function pick(obj: Records, keys: string[] = []) {
    if (!obj) return {};
    if (!keys || !keys.length) return {};

    const result: Records = {};

    return keys.reduce((sum, key) => {
        if (key in obj) {
            sum[key] = obj[key];
        }
        return sum;
    }, result);
}