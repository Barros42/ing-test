export interface ICacheRepository {
    insertValue(key: string, value: string, seconds?: number): Promise<void>
    getValue(key: string): Promise<string>
}