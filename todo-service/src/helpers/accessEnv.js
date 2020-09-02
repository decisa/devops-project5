const cache = {};

const accessEnv = (key, defaultValue) => {
    if (cache[key]) return cache[key];

    if (!(key in process.env)) {
        if (defaultValue) return defaultValue;
        throw new Error(`${key} was not found in `);
    }

    cache[key] = process.env[key];

    return cache[key];
}

export default accessEnv;