import { Injectable } from "@nestjs/common";
import IPlaylistService from "src/business/playlist/interfaces/IPlaylistsService";
import SpotifyWebApi from 'spotify-web-api-node'

@Injectable()
export default class SpotifyService implements IPlaylistService {

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