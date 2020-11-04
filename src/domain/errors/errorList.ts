import IngError from "./IngError";

const ErrorList = {
    CityNotFound: new IngError('CityNotFound', 'This City Was Not Found', 'ING-001'),
    ErrorInGetPlaylist: new IngError('ErrorInGetPlaylist', 'Error in Get a Playlist', 'ING-002')
}

export default ErrorList
