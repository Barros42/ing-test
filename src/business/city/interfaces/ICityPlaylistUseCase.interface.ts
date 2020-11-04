import CityStat from "src/domain/city/CityStat";

export interface ICityPlaylistUseCase {
    getCityPlaylistByCityName(cityName: string): Promise<any>
    getCityStats(): Promise<CityStat[]>
}