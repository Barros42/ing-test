import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import IPlaylistService from "src/business/playlist/interfaces/IPlaylistsService";
import { CityPlaylistOutput } from "src/domain/city/CityPlaylistOutput";
import { OpenWheaterService } from "src/framework/services/OpenWheater.service";
import SpotifyService from "src/framework/services/Spotify.service";
import CityMusicGenres from "../cityMusicGenres";
import { IWheaterService } from "../interfaces/IWheaterService";
import { ICityPlaylistUseCase } from "../interfaces/ICityPlaylistUseCase.interface";
import ErrorList from "src/domain/errors/errorList";

@Injectable()
export class CityPlaylistUseCase implements ICityPlaylistUseCase {
    
    constructor(
        @Inject(OpenWheaterService)
        private readonly wheaterService: IWheaterService,

        @Inject(SpotifyService)
        private readonly playlistsService: IPlaylistService
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

    async getCityPlaylistByCityName(cityName: string): Promise<CityPlaylistOutput> {
       try {
           const cityTemperature: number = await this.wheaterService.getCityTemperatureByCityName(cityName);
           const cityGenre = this._getCityGenreByTemperature(cityTemperature);
           const cityMusisc = await this.playlistsService.getPlaylistByGenre(cityGenre);

           return new CityPlaylistOutput(cityName, cityTemperature, cityGenre, cityMusisc)
           
       } catch (error) {
           console.log(`CityPlaylistUseCase :: getCityPlaylistByCityName :: ${error}`)
           throw new BadRequestException(ErrorList.ErrorInGetPlaylist.toString())
       }
    }

}