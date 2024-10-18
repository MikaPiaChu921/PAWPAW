import { API_LINKS } from "../../../contants/ApplicationConstants"
import { AnnouncementData } from "../models/AnnouncementData";
import { ChatData } from "../models/chatUtility/ChatData";
import Donation from "../models/Donation";
import { PetData } from "../models/PetData"
import { UserData } from "../models/UserData";

/**
 * 
 * @param {PetData} petData 
 * @returns {any} JSON response
 */
export const SubmitReportStray = async (petData) => {
    const content = {
        method: "POST",
        headers: { "content-type": "application/json"},
        body: JSON.stringify(petData)
    }
    const response = await fetch(API_LINKS.REPORT_STRAY_ADD, content);
    return await response.json();
}


/**
 * 
 * @param {PetData} petData 
 * @returns {any} JSON response
 */
export const UpdateReportStray = async (petData) => {
    const content = {
        method: "PATCH",
        headers: { "content-type": "application/json"},
        body: JSON.stringify(petData)
    }
    const response = await fetch(API_LINKS.REPORT_STRAY_UPDATE, content);
    return await response.json();
}


/**
 * 
 * @param {Object} param0 
 * @param {string} param0.reporter
 * @param {string} param0.organization
 * @returns {Promise<Array<PetData>>} JSON response
 */
export const RetrieveReports = async (reporter = "", organization = "") => {
    const content = {
        method: "GET",
        headers: { "content-type": "application/json"},
    }

    const response = await fetch(API_LINKS.REPORT_STRAY_GETALL + `?reporter=${reporter}&organization=${organization}`, content);
    const data = await response.json();
    return data.data;
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<PetData>} JSON response
 */
export const RetrieveSingleReport = async (id) => {
    const content = {
        method: "GET",
        headers: { "content-type": "application/json"},
    }

    const response = await fetch(API_LINKS.REPORT_STRAY_GET(id) , content);
    const data = await response.json();
    return data.data;
}

/**
 * 
 * @param {String} id 
 * @returns {Promise<UserData?>}
 */
export const RetrieveSingleAccount = async (id) => {
    if(!id) return null
    const content = {
        method: "GET",
        headers: { "content-type": "application/json"},
    }

    const response = await fetch(API_LINKS.USER_GET(id) , content);
    const data = await response.json();
    return data.data;
}

/**
 * 
 * @param {ChatData} chatData 
 * @returns 
 */
export const SubmitChat = async (chatData) => {
    const content = {
        method: "POST",
        headers: { "content-type": "application/json"},
        body: JSON.stringify(chatData)
    }
    const response = await fetch(API_LINKS.CHAT_SUBMIT, content);
    return await response.json();
}

export const GetLatestChat = async (chatInfo) => {
    const response = await fetch(API_LINKS.CHAT_GET_LATEST(chatInfo));
    return await response.json();
}

export const GetFirstChat = async (chatInfo) => {
    const response = await fetch(API_LINKS.CHAT_GET_FIRST(chatInfo));
    return await response.json();
}

/**
 * 
 * @returns {Promise<Array<AnnouncementData>>}
 */
export const GetAllAnnouncements = async () => {
    const response = await fetch(API_LINKS.ANNOUNCEMENT_GETALL_URL);
    const data = await response.json();
    return data.data;
}

/**
 * 
 * @param {AnnouncementData} announcement 
 * @returns {Promise<string> | null} attachment Id
 */
export const PostAnnouncement = async (announcement) => {
    const content = {
        method: "POST",
        headers: { "content-type": "application/json"},
        body: JSON.stringify(announcement)
    }
    const response = await fetch(API_LINKS.ANNOUNCEMENT_ADD_URL, content);
    const data = await response.json();
    return data.attachment;
}

/**
 * 
 * @param {AnnouncementData} announcement 
 * @returns {Promise<bool>}
 */
export const UpdateAnnouncement = async (announcement) => {
    const content = {
        method: "PATCH",
        headers: { "content-type": "application/json"},
        body: JSON.stringify(announcement)
    }
    const response = await fetch(API_LINKS.ANNOUNCEMENT_UPDATE_URL, content);
    const success = (await response.json()).success;
    return success;
}

export const DeleteAnnouncement = async (id) => {
    const content = {
        method: "DELETE"
    }
    const response = await fetch(API_LINKS.ANNOUNCEMENT_DELETE_URL(id), content);
    const success = (await response.json()).success;
    return success;
}

/**
 * 
 * @param {string} fileName 
 * @returns {Promise<bool>}  
 */
export const HasFile = async (fileName) => {
    const response = await fetch(API_LINKS.MEDIA_HAS(fileName));
    const data = await response.json();
    return data.success;
}

/**
 * 
 * @returns {Promise<Array<Notification>>}
 */
export const GetNotifications = async () => {
    const response = await fetch(API_LINKS.NOTIFICATION_GETALL);
    const data = await response.json();
    return data.data;
}


/**
 * 
 * @returns {Promise<Array<Donation>>}
 */
export const GetDonations = async () => {
    const response = await fetch(API_LINKS.DONATIONS_GETALL);
    const data = await response.json();
    return data.data;
}

/**
 * @param {Donation} donation
 * @returns {Promise<any>}
 */
export const SubmitDonation = async (donation) => {
    const content = {
        method: "POST",
        headers: { "content-type": "application/json"},
        body: JSON.stringify(donation)
    }
    const response = await fetch(API_LINKS.DONATIONS_ADD, content);
    const data = await response.json();
    return data;
}