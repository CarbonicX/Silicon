// 自动跳过 undefined 的 push 函数
export function push<T>(list: T[], element: T | undefined) {
    if (element != undefined) list.push(element);
}

export function clear(element: HTMLElement) {
    const id = element.id;
    while (element.attributes.length > 0) {
        element.removeAttribute(element.attributes[0]!.name);
    }
    element.innerHTML = "";
    element.id = id;
}
