import {http} from './httpServices'

export function httpGetAllCategoryArchiveService (){
    return http.get("/Category/GetAllContentVideoCategory")
}