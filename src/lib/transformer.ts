import TOML from "@iarna/toml"

const ValidAttributes = [
    "src",
    "height",
    "width",
    "textContent",
    "align",
    "frameborder",
    "longdesc",
    "marginheight",
    "marginwidth",
    "name",
    "sandbox",
    "scrolling",
    "seamless",
    "srcdoc",
]

const transformer = (content: string): Array<Array<string>> => {
    const afterParse = TOML.parse(content)
    let keys: Array<string> = []
    let src: Array<string> = []
    let ans: Array<string> = []
    let textContent: Array<string> = []
    for (let key in afterParse) {
        if (ValidAttributes.includes(key)) {
            if (key === "src") {
                src = ["src", afterParse[key].toString()]
            }
            if (key === "textContent") {
                textContent = ["textContent", afterParse[key].toString()]
            } else {
                ans.push(`${key}="${afterParse[key].toString()}"`)
            }
            keys.push(key)
        }
    }
    return [keys, ans, src, textContent]
}

const domainRegExp = /[https?:]?\/\/(\S[^\/]*)/
const twiceRegExp = /([^\/\?]*)/

export const domain = (raw: string): string => {
    const reg = domainRegExp.exec(raw)
    if (!reg) {
        const twiceDomain = twiceRegExp.exec(raw) ?? []
        const res = twiceDomain[1] ?? ""
        return res
    } else {
        return reg[1]
    }
}

export default transformer
