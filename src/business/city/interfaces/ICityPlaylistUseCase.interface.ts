export interface ICityPlaylistUseCase {
    getCityPlaylistByCityName(cityName: string): Promise<any>
}