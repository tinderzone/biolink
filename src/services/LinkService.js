import { baseService } from "./BaseService";


class LinkManagement extends baseService {

    getLinkData = () => {
        return this.Get('user/plugins')
    }

    addNewLink = (newLink) => {
        return this.Post(`user/createLinks`, newLink)
    }

    addNewHeader = (newHeader) => {
        return this.Post('user/createHeader', newHeader)
    }

    addNewPlugin = (newPlugin) => {
        return this.Post('user/createPlugins', newPlugin)
    }

    editLink = (linkEdit, id) => {
        console.log(id)
        return this.Put(`user/updateContent/${id}`, linkEdit)
    }

    deleteLink = (id) => {
        return this.Delete(`user/plugins/${id}`)
    }

    updatePosition = (list) => {
        return this.Put(`user/updateLocation`, list)
    }

}


export const linkManagement = new LinkManagement()