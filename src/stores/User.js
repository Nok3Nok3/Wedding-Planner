import { observable, action } from 'mobx'
import Axios from 'axios'
import { useObserver } from 'mobx-react'
let API_URL = `http://localhost:4200/api`

class User {

    @observable userInfo = { id: 1 }
    @observable _userFavorites = []

    @observable bookedAttractions = []
    @action login = async (email, password) => {
        try {
            let user = await Axios.post(`${API_URL}/login`, { email, password })
            this.getUserInfo(user.data.id)
        } catch (err) {
            console.log(err)
        }
    }

    @action getWeddingDetails = async userId => {
        try {
            let userInfo = await Axios.get(`${API_URL}/wedding-details/${userId}`)
            this.userInfo = userInfo.data
        } catch (err) {
            console.log(err)
        }
    }
    @action getUserFavorites = async userId => {
        try {
            let userFavorites = await Axios.get(`${API_URL}/favorites/${userId}`)
            this._userFavorites = userFavorites.data
        } catch (err) {
            console.log(err)
        }
    }
    @action removeFavorite = async (userId, attractionId)=>{
        try{
            let removalFavorite = await Axios.delete(`${API_URL}/favorite/`, { data: { userId, attractionId }})
            let index=this._userFavorites.findIndex(uf => uf.id===attractionId)
            this._userFavorites.splice(index,1)
        }
         catch(err) {
        console.log(err)
    }
    }

    @action bookAttraction = async (userId, attractionId, price) => {
        try {
            await Axios.post(`${API_URL}/attractions/book`, { userId, attractionId, price })
        } catch (err) {
            console.log(err)
        }
    }
    @action getBookedAttractions = async () => {
        try {
            let bookedAttractions = await Axios.get(`${API_URL}/bookedAttractions/${this.userInfo.id}`)
            this.bookedAttractions = bookedAttractions.data
            console.log(bookedAttractions)
        } catch (err) {
            console.log(err)
        }
    }
    @action addToFavorites = async (userId, attractionId) => {
        try {
            await Axios.post(`${API_URL}/attractions/favorite`, { userId, attractionId })
        } catch (err) {
            console.log(err)
        }
    }
    @action register = () => {

    }
}

export const user = new User()