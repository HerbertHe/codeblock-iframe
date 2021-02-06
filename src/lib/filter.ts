import transformer, { domain } from "./transformer"

/**
 * iframe标签合法域名过滤器
 * @param content TOML iframe内容
 * @param filters 合法域名数组
 */
const filter = (
    content: string,
    filters: Array<string>
): Array<string | boolean> => {
    const [, , src] = transformer(content)
    if (
        filters.length !== 0 &&
        !!domain(src[1]) &&
        !filters.includes(domain(src[1]))
    ) {
        return [false, src[1]]
    } else if (!domain(src[1])) {
        return [false, src[1]]
    }

    return [true, domain(src[1])]
}

export default filter
