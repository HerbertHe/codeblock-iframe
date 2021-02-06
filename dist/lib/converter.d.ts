/**
 * iframe标签转化生成器
 * @param content TOML iframe内容
 * @param filters 合法域名数组
 */
declare const converter: (content: string, filters?: string[] | undefined) => Array<string | boolean | Array<string>>;
export default converter;
