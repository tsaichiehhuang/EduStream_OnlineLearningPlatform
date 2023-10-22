// custom.d.ts
declare module 'js-cookie' {
    function get(name: string): string | null
    function set(name: string, value: string, options?: any): void
    function remove(name: string, options?: any): void
}
