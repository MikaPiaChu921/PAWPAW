import { getMonth } from "../PageUtils";
import { GetDonations, RetrieveReports, RetrieveSingleAccount } from "./DataHandler";
import { AccountRepository } from "./repositories/AccountRepository"

export const GetNumberOfUsersByRoles = async () => {
    var aR = new AccountRepository();
    var accounts = await aR.GetAccounts(); 

    var roles = {
        Strayver: 0,
        Organization: 0
    }

    for(let account of accounts){
        if(account.role.toLowerCase().includes("strayver")){
            roles.Strayver ++;
        }else if(account.role.toLowerCase().includes("organization")){
            roles.Organization ++;
        }
    }

    return roles;
}

export const GetNumberOfReportTypes = async () => {
    var reports = await RetrieveReports();

    var reportData = {
        stray: 0,
        lost: 0,
        found: 0
    }

    for(let report of reports){
        if(report.reportType.toLowerCase().includes("stray"))
            reportData.stray ++;
        else if(report.reportType.toLowerCase().includes("lost"))
            reportData.lost ++;
        else if(report.reportType.toLowerCase().includes("found")) 
            reportData.found ++;
    }

    return reportData;
}

export const GetTotalRevenue = async () => {
    var data = await GetDonations();

    const currentMonthIndex = new Date().getMonth();
    const kv = {
      [`${getMonth(currentMonthIndex)}`]: 0,
      [`${getMonth(currentMonthIndex - 1)}`]: 0,
      [`${getMonth(currentMonthIndex - 2)}`]: 0,
      [`${getMonth(currentMonthIndex - 3)}`]: 0,
      [`${getMonth(currentMonthIndex - 4)}`]: 0,
    };
    let total = 0;
    for (let donation of data) {
        let existingMonth =
          kv[getMonth(new Date(donation.issueDate).getMonth())];

        if (existingMonth >= 0) {
          kv[getMonth(new Date(donation.issueDate).getMonth())] += donation.amount;
        }

        total += donation.amount;
      }
      let arrDt = [];

      for (let x in kv) {
        arrDt.push({ month: x, count: kv[x] });
      }

      return [arrDt, total];
}

export const GetMostReportOwnedByOrganization = async () => {
    var reports = await RetrieveReports();

    var orgs = []
    for(const report of reports){
        if(report.organization && !orgs.includes(report.organization)) orgs.push(report.organization)
    }

    var counts = [];
    var profile = [];
    for(let org of orgs){
        counts.push(reports.filter(d => d.organization === org).length);
        var p = await RetrieveSingleAccount(org);
        profile.push(p.firstName + " " + p.lastName)
    }


    return [profile, counts]
}