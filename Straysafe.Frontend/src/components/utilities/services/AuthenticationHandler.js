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
    return `${msg_before} ${GetProfileInformation().FirstName} ${msg_after}`;
}

export const LoginAccount = ({username, password}) => {
    // initialize repository
    var accountRespository = new AccountRepository();

    // retrieve account
    const foundAccount = accountRespository.GetSingleAccount((account) => account.Email.toLowerCase() === username.toLowerCase() && account.Password === password);

    if(foundAccount){
        // handle locked account
        if(foundAccount.Locked && foundAccount.Role === AuthConstants.ROLE_ORGANIZATION){
            alert("You're account is locked and under review by admins");
            return;
        }
        // hide some information in the view
        const minifiedAccount = {
            Email: foundAccount.Email,
            FirstName: foundAccount.FirstName,
            LastName: foundAccount.LastName,
            Role: foundAccount.Role
        }
        SaveLocalData("loggedInAccount", minifiedAccount);

        if(foundAccount.Role === AuthConstants.ROLE_ADMIN) {
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
 * @returns {string} msg
 */
export const RegisterStraver = (user) => {
    // initialize repository
    var accountRespository = new AccountRepository();
    var msg = "User has been registered";

    // generate a random ID for new user
    user.ID = Math.floor(Math.max(Math.random() * 99999, Math.random() * 10000));
    var result = accountRespository.SaveAccount(user);
    
    if(!result)
        msg = "Failed to register user, a duplicate email has found";

    return msg;
}

/**
 * 
 * @param {UserData} user 
 * @returns {string} msg
 */
export const RegisterOrganization = (user) => {
    // initialize repository
    var accountRespository = new AccountRepository();
    var msg = "Your account is currently under review and will be verified by an admin shortly. You will receive a confirmation once the process is complete.";

    // generate a random ID for new user
    user.ID = Math.floor(Math.max(Math.random() * 99999, Math.random() * 10000));
    user.Locked = true;
    user.Role = AuthConstants.ROLE_ORGANIZATION;
    var result = accountRespository.SaveAccount(user);
    
    if(!result)
        msg = "Failed to register user, a duplicate email has found";

    return msg;
}