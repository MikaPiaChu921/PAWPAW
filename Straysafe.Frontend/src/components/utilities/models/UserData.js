import { AuthConstants } from "../../../contants/ApplicationConstants";

export class UserData{
    constructor({uid, lastName, firstName, email, password, contactNumber, address, role = AuthConstants.ROLE_STRAYVER}){
        this.id = uid;
        this.lastName = lastName,
        this.firstName = firstName,
        this.email = email,
        this.password = password,
        this.contactNumber = contactNumber,
        this.address = address,
        this.role = role,
        this.locked = false;
    }
}