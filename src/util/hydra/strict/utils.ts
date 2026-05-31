
export function deal<T>(res: T | boolean, remove: () => void, set: (t: T) => void) {
    if (typeof res == 'boolean') {
        if (res)
            remove()
    } else {
        set(res)
    }
}
