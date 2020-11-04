import { Injectable } from "@nestjs/common";
import IPlaylistService from "src/business/playlist/interfaces/IPlaylistsService";
import SpotifyWebApi from 'spotify-web-api-node'

@Injectable()
export default class SpotifyService implements IPlaylistService {

    // private readonly spotifyToken: string = 'BQBVEV4mGKRecKPOA9VG3wFvb9wcGq_QakOh4RTVQMEOTO_HC70m5cdgvGf7mz7NRlohOzn473xujeIhO-4aXsIIcw524bP8dw0PxCTG52CqJt6XXhmX_pnP8f3a-Om6JQe7LK6THLJErsQVND8mF6FXegsbQR4tiCZ3KNykmLk33qT6h4ryS2aL_i-78_D6r_HT0R4KDbS6HfdOv1fsyL7E0f-92LIZTPJWFIVCaQz-Klf12MnVjJ4YBHofHx_N5D0C1a9St0W2jh3IsHyj'
    private spotifyWebApi: SpotifyWebApi

    constructor(){
        this.spotifyWebApi = new SpotifyWebApi()
        this.spotifyWebApi.setAccessToken(this.spotifyToken)
    }

    async getPlaylistByGenre(musicGenre: string): Promise<string[]>{

        const playlist = await this.spotifyWebApi.searchPlaylists(musicGenre).then(data => {
            const playlistArray = data.body.playlists.items;
            const playlistLenght = playlistArray.length;
            const randomPlaylist = playlistArray[Math.floor(Math.random() * playlistLenght)]
            return randomPlaylist;
        }).catch(err => {
            console.log(`SpotifyService :: getPlaylistByGenre :: ${err}`)
        })

        const trackList = await this.spotifyWebApi.getPlaylistTracks(playlist.id).then(res => {
            return res.body.items.map(i => i.track.name)
        }).catch(err => {
            console.log(`SpotifyService :: getPlaylistByGenre :: ${err}`)
        })

        return trackList
    }
}