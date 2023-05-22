

export interface NestedObj {
    [key: string]: string | number | boolean | Date |NestedObj;
}