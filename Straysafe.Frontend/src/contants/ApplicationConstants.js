import StraySafeLogo1 from "/logo/straysafe_logo_1.png";
import StraySafeLogo2 from "/logo/straysafe_logo_2.png";
import LandingPageImage from "../assets/images/landing/landingimg.png";
import SampleCardImg from "../assets/images/samples/catImg.png";
import LandingPageImage_Adopt from "../assets/images/landing/adoptimage.png"
import UserActivityCardImg from "../assets/images/admin/UserActivityCard.jfif";
import DonationQr from "../assets/images/samples/qr_code.png"

export const ApplicationConstants = {
    StraySafeLogo1,
    StraySafeLogo2,
    LandingPageImage,
    LandingPageImage_Adopt,
    UserActivityCardImg,
    DonationQr,
    SampleCardImg,
    ROUTE_LOGIN: "/login",
    ROUTE_LANDING: "/",
    ROUTE_SIGNUP_AS_STRAVER: "/sign-up-as-straver",
    ROUTE_SIGNUP_AS_ORGANIZATION: "/sign-up-as-organization",
    ROUTE_SIGNUP_AS: "/sign-up-as",
    ROUTE_ADOPT_PET: "/adopt-pet",
    ROUTE_ADMIN_DASHBOARD: "/admin",
    ROUTE_ANNOUNCEMENT: "/announcement",
    ROUTE_CHAT: "/chat",
    ROUTE_ORG_REPORTS: "/reports",
    ROUTE_CHAT_STRAYVER: "/chat-org",
    ROUTE_DONATION: "/donation",
    ROUTE_PET_REPORT_PAGE: (type, value)=> `/pet-reports/${type}${(value) ? `/${value}` : ""}`,
    ROUTE_VIEW_PET_PROFILE: (id) => `/adopt-pet/profile/${id}`,
    ROUTE_ADD_PET_FOR_ADOPTION: "/adopt-pet/add",
    ROUTE_PROFILE: "/profile",
    ROUTE_REPORT_STRAY: "/report_stray",
    ROUTE_REPORT_STRAY_HISTORY: "/report_stray_history",
    DEFAULT_PROFILE: "DEFAULT_PROFILE",
    LANDING_PAGE_ABOUT_1: `
        "StraySafe" is designed to address animal welfare by offering a
        comprehensive, community-based platform to streamline the processes
        of stray animal rescue, care, and adoption. StraySafe aspires to
        bridge the gap between animal rescue organizations and the public,
        creating a more efficient and responsive system.
    `,
    LANDING_PAGE_ABOUT_2: `Many of our adoptables from the streets of Cebu City need loving homes. By adopting, you give them a chance to find the love and security they deserve.`
}

export const AuthConstants = {
    ROLE_STRAYVER: "Strayver",
    ROLE_ORGANIZATION: "Organization",
    ROLE_ADMIN: "Admin"
}

export const APIUrl = `http://${import.meta.env.VITE_API_BASE_URL || "localhost"}:${import.meta.env.VITE_API_BASE_URL_PORT || "8080"}`;
export const ChatHubUrl = `http://${import.meta.env.VITE_API_BASE_URL || "localhost"}:${import.meta.env.VITE_API_BASE_URL_PORT || "8080"}/chathub`;

export const API_LINKS = {
    USER_GET: (id) => APIUrl + `/user/get?id=${id}`,
    USER_LOGIN_URL: APIUrl + "/user/login",
    USER_REGISTER_URL: APIUrl + "/user/register",
    USER_GET_ALL: APIUrl + "/user/getall",
    USER_DELETE: APIUrl + "/user/delete",
    USER_UPDATE: APIUrl + "/user/update",
    MEDIA_UPLOAD: APIUrl + "/media/upload",
    MEDIA_DOWNLOAD: (filename, isProfile = false) => APIUrl + `/media/download?fileName=${filename}&isProfile=${isProfile}`,
    MEDIA_HAS: (filename) => APIUrl + `/media/has?fileName=${filename}`,
    REPORT_STRAY_GET: (id) => APIUrl + `/reportstray/get?Id=${id}`,
    REPORT_STRAY_DELETE: (id) => APIUrl + `/reportstray/delete?Id=${id}`,
    REPORT_STRAY_GETALL: APIUrl + "/reportstray/getall",
    REPORT_STRAY_ADD: APIUrl + "/reportstray/add",
    REPORT_STRAY_UPDATE: APIUrl + "/reportstray/update",
    CHAT_SUBMIT: APIUrl + "/chat/submit",
    CHAT_GET_LATEST: (infoId) => APIUrl + `/chat/getlatest?chatInformation=${infoId}`,
    CHAT_GET_FIRST: (infoId) => APIUrl + `/chat/getfirst?chatInformation=${infoId}`,
    ANNOUNCEMENT_GETALL_URL: APIUrl + "/announcement/getall",
    ANNOUNCEMENT_ADD_URL: APIUrl + "/announcement/add",
    ANNOUNCEMENT_DELETE_URL: (id)=> APIUrl + `/announcement/delete?announcementId=${id}`,
    ANNOUNCEMENT_UPDATE_URL: APIUrl + "/announcement/update",
    NOTIFICATION_GETALL: APIUrl + "/notification/getall",
    DONATIONS_GETALL: APIUrl + "/donation/getall",
    DONATIONS_ADD: APIUrl + "/donation/add",
}