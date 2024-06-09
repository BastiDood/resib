export class AssertionError extends Error {
    /** @param {string} msg */
    constructor(msg) {
        super(msg);
        this.name = 'AssertionError';
    }
}

/**
 * @param {unknown} condition
 * @param {string} message
 * @returns {asserts condition}
 */
export function assert(condition, message) {
    if (!condition) throw new AssertionError(message);
}
