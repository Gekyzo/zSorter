/**
 * Signals the document is fully loaded.
 *
 * @param {object}
 */
export const whenDOMisLoaded = new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', event => resolve())
})
