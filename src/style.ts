export const style = new Proxy(
    {} as Record<string, string>,
    {
        set(_target, prop, newValue, _receiver) {
            if (typeof prop == "string") {
                document.documentElement.style
                    .setProperty("--" + prop, newValue)
            }
            return true
        }
    }
)