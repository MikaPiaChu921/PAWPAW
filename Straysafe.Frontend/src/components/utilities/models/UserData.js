export class UserData{
    constructor({uid, lastName, firstName, email, password, contactNumber, address}){
        this.ID = uid;
        this.LastName = lastName,
        this.FirstName = firstName,
        this.Email = email,
        this.Password = password,
        this.ContactNumber = contactNumber,
        this.Address = address;
    }
}