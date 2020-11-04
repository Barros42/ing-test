import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ICityPlaylistUseCase } from 'src/business/city/interfaces/ICityPlaylistUseCase.interface';
import { CityPlaylistUseCase } from 'src/business/city/useCases/CityPlaylistUseCase';
import { GetCityPlaylist } from 'src/controllers/GetCityPlaylistDTO';

@Controller('city')
export class CityController {

    constructor(
        @Inject(CityPlaylistUseCase)
        private readonly cityUseCase: ICityPlaylistUseCase
    ){}

    @Get(':cityName/playlist')
    async getCityPlaylist(@Param() params: GetCityPlaylist): Promise<any> {
        return await this.cityUseCase.getCityPlaylistByCityName(params.cityName)
    }

}
