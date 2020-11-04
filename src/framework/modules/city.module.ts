import { Module } from '@nestjs/common';
import { CityPlaylistUseCase } from 'src/business/city/useCases/CityPlaylistUseCase';
import { CityController } from '../controllers/city/city.controller';
import RedisRepository from '../repositories/redis.repository';
import { OpenWheaterService } from '../services/OpenWheater.service';
import SpotifyService from '../services/Spotify.service';

@Module({
    controllers: [CityController],
    providers: [CityPlaylistUseCase, OpenWheaterService, SpotifyService, RedisRepository],
    imports: []
})
export class CityModule {}
