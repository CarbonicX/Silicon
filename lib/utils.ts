// 自动跳过 undefined 的 push 函数
export function push<T>(list: T[], element: T | undefined) {
    if (element != undefined) list.push(element);
}
