/**
 * iframe标签合法域名过滤器
 * @param content TOML iframe内容
 * @param filters 合法域名数组
 */
declare const filter: (content: string, filters: Array<string>) => Array<string | boolean>;
export default filter;
