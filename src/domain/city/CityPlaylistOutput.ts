export class CityPlaylistOutput {

    private readonly city: string
    private readonly temperature: number
    private readonly genre: string
    private readonly musics: string[]

    constructor(city: string, temperature: number, genre: string, musics: string[]){
        this.city = city;
        this.temperature = temperature;
        this.genre = genre;
        this.musics = musics
    }

}