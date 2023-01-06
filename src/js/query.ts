
export function queryParam(key: string): string {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(key) || ""
}

export function setQueryParam(key: string, value: string) {
    const urlSearchParams = new URLSearchParams(window.location.search);

    if (value === "") {
        urlSearchParams.delete(key)
    } else {
        urlSearchParams.set(key, value)
    }

    history.pushState({}, "", `?${urlSearchParams.toString()}`)
}
