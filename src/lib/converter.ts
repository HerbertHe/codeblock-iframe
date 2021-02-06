import transformer, { domain } from "./transformer"

/**
 * iframe标签转化生成器
 * @param content TOML iframe内容
 * @param filters 合法域名数组
 */
const converter = (
    content: string,
    filters?: Array<string>
): Array<string | boolean | Array<string>> => {
    filters = filters ?? []
    const [keys, attrs, src, textContent] = transformer(content)

    if (
        filters.length !== 0 &&
        !!domain(src[1]) &&
        !filters.includes(domain(src[1]))
    ) {
        return ["", false, keys]
    } else if (!domain(src[1])) {
        return ["", false, keys]
    }

    return [
        `<iframe ${attrs.join(" ")}>${textContent[1] ?? ""}</iframe>`,
        true,
        keys,
    ]
}

export default converter
