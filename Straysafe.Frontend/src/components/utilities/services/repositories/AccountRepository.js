import { API_LINKS } from "../../../../contants/ApplicationConstants";
import  {UserData}  from "../../models/UserData";

export class AccountRepository{
    constructor(){}
    /**
     * 
     * @returns {Promise<Array<UserData>>}
     */
    async GetAccounts(){
        const response = await fetch(API_LINKS.USER_GET_ALL, { method: "GET"});
        const data = await response.json();
        return data;
    }

    async Login(email, password){
        const response = await fetch(API_LINKS.USER_LOGIN_URL, { method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({email: email, password: password})});
        const data = await response.json();
        return data;
    }
    /**
     * @param {(a: UserData)=>{}} predicate 
     * @returns {UserData | undefined}
     */
    GetSingleAccount(predicate){
        return this.GetAccounts().filter(predicate)[0];
    }
    /**
     * 
     * @param {UserData} userAccount 
     */
    async SaveAccount(userAccount){
        const response = await fetch(API_LINKS.USER_REGISTER_URL, 
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userAccount)
            }
        )

        const result = await response.json();

        return result.success;
    }

    /**
     * 
     * @param {string} id 
     * @returns {Promise<boolean>}
     */
    async DeleteAccount(id){
        const response = await fetch(API_LINKS.USER_DELETE+`?Id=${id}`, 
            {
                method: "DELETE",
            }
        )

        const result = await response.json();

        return result.success;
    }

    /**
     * 
     * @param {UserData} userAccount 
     */
    async UpdateAccount(userAccount){
        const response = await fetch(API_LINKS.USER_UPDATE, 
            {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userAccount)
            }
        )
        console.log(JSON.stringify(userAccount))

        const result = await response.json();

        return result.success;
    }
}