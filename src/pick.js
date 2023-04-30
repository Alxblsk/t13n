export function pick(obj, keys = []) {
    if (!obj) return [];
    if (!keys || !keys.length) return [];

    return keys.reduce((sum, key) => {
        if (key in obj) {
            sum[key] = obj[key];
        }
        return sum;
    }, {});
}