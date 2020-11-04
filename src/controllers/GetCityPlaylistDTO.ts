import { IsNotEmpty, IsString, Length } from "class-validator";

export class GetCityPlaylist {
    
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    cityName: string

}