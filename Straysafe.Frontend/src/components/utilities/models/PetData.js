export class PetData{
    constructor({name, animalType, gender, weight, height, reportType, breed, address, remarks, reporter, organization, status}){
        this.name = name ?? "";
        this.animalType = animalType ?? "";
        this.gender = gender ?? "";
        this.weight = weight ?? 0;
        this.height = height ?? 0;
        this.reportType = reportType ?? "";
        this.breed = breed ?? "";
        this.address = address ?? "";
        this.remarks = remarks ?? "";
        this.reporter = reporter ?? "";
        this.organization = organization ?? "";
        this.status = status ?? "";
        this.reportDate = new Date().toISOString();
        this.metadata = "";
        this.owner = "";
    }
}