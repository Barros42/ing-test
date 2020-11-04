import { Injectable } from "@nestjs/common";
import Axios from "axios";
import { IWheaterService } from "src/business/city/interfaces/IWheaterService";
import ErrorList from "src/domain/errors/errorList";

@Injectable()
export class OpenWheaterService implements IWheaterService {

    // private readonly xApiKey: string = 'e34010186cmshca43d4232127fa3p131664jsnd831f2ce7102'
    // private readonly xApiHost: string = 'community-open-weather-map.p.rapidapi.com'
    // private readonly apiEndPoint: string = 'https://rapidapi.p.rapidapi.com/weather'

    async getCityTemperatureByCityName(cityName: string): Promise<number> {
        try {
            
            const headers = {
                'x-rapidapi-key': this.xApiKey,
                'x-rapidapi-host': this.xApiHost,
                'useQueryString': true
            }

            const params = {
                q: cityName,
                mode: 'json',
                units: 'metric',
                lang: null
            }

            return Axios.get(this.apiEndPoint, { headers, params}).then(res => {
                return res.data.main.temp
            }).catch(err => {
               console.log(`CitiesService :: getCityTemperatureByCityName :: ${err}`)
               throw new Error(ErrorList.CityNotFound.toString())
            })

        
        } catch (error) {
            console.log(`CitiesService :: getCityTemperatureByCityName :: ${error}`)
            throw new Error(ErrorList.CityNotFound.toString())
        }
    }

}