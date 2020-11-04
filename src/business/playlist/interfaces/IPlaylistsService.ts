export default interface IPlaylistService {
    getPlaylistByGenre(musicGenre: string): Promise<any>
}