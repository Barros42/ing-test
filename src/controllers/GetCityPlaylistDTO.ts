import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class GetCityPlaylist {
    
    @ApiProperty({ 
        type: String, 
        description: 'The name of any City',
        minLength: 2,
        maxLength: 100
    })

    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    cityName: string

}