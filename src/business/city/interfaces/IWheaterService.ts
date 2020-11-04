export interface IWheaterService{
    getCityTemperatureByCityName(cityName: string): Promise<number>
}