import { ApplicationConstants, AuthConstants } from "../../../contants/ApplicationConstants"
import { UserData } from "../models/UserData"
import { RedirectTo } from "../PageUtils"
import { DeleteLocalData, GetLocalData, SaveLocalData } from "./LocalDataHandler"
import { AccountRepository } from "./repositories/AccountRepository"

/**
 * 
 * @returns {UserData}
 */
export const GetProfileInformation = () => {
    return GetLocalData("loggedInAccount");
}

export const DisplayName = ({msg_before = "", msg_after = ""}) => {
    return `${msg_before} ${GetProfileInformation().firstName} ${msg_after}`;
}

export const LoginAccount = async ({username, password}) => {
    // initialize repository
    var accountRespository = new AccountRepository();

    // retrieve account
    const loginResponse = await accountRespository.Login(username, password);

    // handle data
    if(loginResponse.data){
        const foundAccount = loginResponse.data;

        if(foundAccount.locked && foundAccount.role === AuthConstants.ROLE_ORGANIZATION){
            alert("You're account is locked and under review by admins");
            return;
        }
        // hide some information in the view
        const minifiedAccount = {
            email: foundAccount.email,
            firstName: foundAccount.firstName,
            lastName: foundAccount.lastName,
            role: foundAccount.role,
            id: foundAccount.id
        }
        SaveLocalData("loggedInAccount", minifiedAccount);

        if(foundAccount.role === AuthConstants.ROLE_ADMIN) {
            RedirectTo(ApplicationConstants.ROUTE_ADMIN_DASHBOARD);
            return;
        }

        RedirectTo(ApplicationConstants.ROUTE_LANDING);
    }else{
        alert("Invalid Credentials")
    }
}

export const LogoutAccount = () => {
    DeleteLocalData("loggedInAccount");
    RedirectTo(ApplicationConstants.ROUTE_LANDING);
}

/**
 * 
 * @param {UserData} user 
 * @returns {Promise<string>} msg
 */
export const RegisterStraver = async (user) => {
    // initialize repository
    var accountRespository = new AccountRepository();
    var msg = "User has been registered";

    var result = await accountRespository.SaveAccount(user);
    
    if(!result)
        msg = "Failed to register user, a duplicate email has found";

    return msg;
}

/**
 * 
 * @param {UserData} user 
 * @returns {Promise<string>} msg
 */
export const RegisterOrganization = async (user) => {
    // initialize repository
    var accountRespository = new AccountRepository();
    var msg = "Your account is currently under review and will be verified by an admin shortly. You will receive a confirmation once the process is complete.";

    user.locked = true;
    user.role = AuthConstants.ROLE_ORGANIZATION;
    var result = await accountRespository.SaveAccount(user);
    
    if(!result)
        msg = "Failed to register user, a duplicate email has found";

    return msg;
}