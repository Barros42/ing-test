import { Inject, Injectable } from "@nestjs/common";
import IPlaylistService from "src/business/playlist/interfaces/IPlaylistsService";
import SpotifyWebApi from 'spotify-web-api-node'
import qs from 'querystring';
import Axios, { AxiosError } from "axios";
import ErrorList from "src/domain/errors/errorList";
import RedisRepository from "../repositories/redis.repository";
import { ICacheRepository } from "src/business/cache/interfaces/cache.repository";

@Injectable()
export default class SpotifyService implements IPlaylistService {

    private spotifyWebApi: SpotifyWebApi
    private readonly spotifyToken: string
    private spotifyAccessToken: string
    private readonly clientId: string = process.env.SPOTIFY_CLIENT_ID
    private readonly clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET
    private readonly spotifyTokenUrl: string = process.env.SPOTIFY_TOKEN_URL

    constructor(
        @Inject(RedisRepository)
        private readonly cacheRepository: ICacheRepository
    ){
        this.spotifyWebApi = new SpotifyWebApi()
        this.spotifyWebApi.setAccessToken(this.spotifyToken)
    }

    private async _getSpotifyToken(): Promise<void> {

       try {

        const savedToken = await this.cacheRepository.getValue('spotifyKey')

        if(savedToken){
            this.spotifyAccessToken = savedToken
            this.spotifyWebApi.setAccessToken(this.spotifyAccessToken)
            return
        }

        const authString = `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64")}`;

        const data = {
            grant_type: 'client_credentials'
        }

        const headers = {
            Authorization : authString,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const response = await Axios.post(this.spotifyTokenUrl, qs.stringify(data), { headers }).catch(err => {
            console.log(err)
            console.log(`SpotifyWebApi :: _getSpotifyToken :: ${err}`)
        })

        if (response) {
            const accessToken = response.data.access_token
            this.cacheRepository.insertValue('spotifyKey', accessToken, (response.data.expires_in - 10))
            this.spotifyAccessToken = accessToken
            this.spotifyWebApi.setAccessToken(this.spotifyAccessToken)
        } else {
            this.spotifyAccessToken = null
            throw new Error(ErrorList.ErrorInGetPlaylist.toString());
        }

        } catch (error) {
           throw new Error(ErrorList.ErrorInGetPlaylist.toString());
       }

 
    }

    async getPlaylistByGenre(musicGenre: string): Promise<string[]>{

        await this._getSpotifyToken();

        const playlist = await this.spotifyWebApi.searchPlaylists(musicGenre).then(data => {
            const playlistArray = data.body.playlists.items;
            const playlistLenght = playlistArray.length;
            const randomPlaylist = playlistArray[Math.floor(Math.random() * playlistLenght)]
            return randomPlaylist;
        }).catch((err: any) => {
            console.log(`SpotifyService :: getPlaylistByGenre :: ${err}`)
        })

        const trackList = await this.spotifyWebApi.getPlaylistTracks(playlist.id).then(res => {
            return res.body.items.map(i => i.track.name)
        }).catch((err: any) => {
            console.log(`SpotifyService :: getPlaylistByGenre :: ${err}`)
        })

        return trackList
    }
}