import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import IPlaylistService from "src/business/playlist/interfaces/IPlaylistsService";
import { CityPlaylistOutput } from "src/domain/city/CityPlaylistOutput";
import { OpenWheaterService } from "src/framework/services/OpenWheater.service";
import SpotifyService from "src/framework/services/Spotify.service";
import CityMusicGenres from "../cityMusicGenres";
import { IWheaterService } from "../interfaces/IWheaterService";
import { ICityPlaylistUseCase } from "../interfaces/ICityPlaylistUseCase.interface";
import ErrorList from "src/domain/errors/errorList";
import RedisRepository from "src/framework/repositories/redis.repository";
import { ICacheRepository } from "src/business/cache/interfaces/cache.repository";
import CityStat from "src/domain/city/CityStat";

@Injectable()
export class CityPlaylistUseCase implements ICityPlaylistUseCase {
    
    constructor(
        @Inject(OpenWheaterService)
        private readonly wheaterService: IWheaterService,

        @Inject(SpotifyService)
        private readonly playlistsService: IPlaylistService,

        @Inject(RedisRepository)
        private readonly cacheService: ICacheRepository
    ){}

    private _getCityGenreByTemperature(currentTemperature: number): string {
        switch (true) {
            case (currentTemperature < 10):
                return CityMusicGenres.CLASSIC
                break;
            case (currentTemperature >= 10 && currentTemperature <= 25):
                return CityMusicGenres.ROCK
                break;
            case (currentTemperature > 25):
                return CityMusicGenres.POP
                break;
            default:
                throw new Error('CityPlaylistUseCase :: _getCityGenreByTemperature :: Unexpected Temperature')
                break;
        }
    }

    private async _handleCityStats(city: string): Promise<void> {

        city = city.toUpperCase()

        const cityStats = await this.cacheService.getValue('cities')

        if(!cityStats) {
            const newCityStats = [
                {
                    name: city,
                    count: 1
                }
            ]
            this.cacheService.insertValue('cities', JSON.stringify(newCityStats))
            return
        }

        const cityStatsObject: {name: string, count: number}[] = JSON.parse(cityStats)
        const cityExists = cityStatsObject.find(c => c.name === city)
        
        if(cityExists){
            cityStatsObject.map(c => {
                if(c.name === city) c.count++
            })
            this.cacheService.insertValue('cities', JSON.stringify(cityStatsObject))
            return
        }

        cityStatsObject.push({ name: city, count: 1 })
        this.cacheService.insertValue('cities', JSON.stringify(cityStatsObject))
        return

    } 

    async getCityPlaylistByCityName(cityName: string): Promise<CityPlaylistOutput> {
       try {
           const cityTemperature: number = await this.wheaterService.getCityTemperatureByCityName(cityName);
           const cityGenre = this._getCityGenreByTemperature(cityTemperature);
           const cityMusisc = await this.playlistsService.getPlaylistByGenre(cityGenre);
           this._handleCityStats(cityName)
           return new CityPlaylistOutput(cityName, cityTemperature, cityGenre, cityMusisc)
           
       } catch (error) {
           console.log(`CityPlaylistUseCase :: getCityPlaylistByCityName :: ${error}`)
           throw new BadRequestException(ErrorList.ErrorInGetPlaylist.toString())
       }
    }

    async getCityStats(): Promise<CityStat[]> {
        const cities = JSON.parse(await this.cacheService.getValue('cities'))
        return (cities) ? cities : null
    }

}