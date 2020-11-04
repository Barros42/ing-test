export interface ICacheRepository {
    insertValue(key: string, value: string): Promise<void>
    getValue(key: string): Promise<string>
}