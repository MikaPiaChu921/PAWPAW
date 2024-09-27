export class PetData{
    constructor({name, animalType, gender, weight, height, breed, address, remarks}){
        this.Name = name ?? "";
        this.AnimalType = animalType ?? "";
        this.Gender = gender ?? "";
        this.Weight = weight ?? 0;
        this.Height = height ?? 0;
        this.Breed = breed ?? "";
        this.Address = address ?? "";
        this.Remarks = remarks ?? "";
    }
}