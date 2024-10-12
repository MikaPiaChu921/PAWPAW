export class AnnouncementData{
    /**
     * 
     * @param {{title: String, imageSrc: URL, postDate: Date, postedBy: String, content: String }} param0 
     */
    constructor({title, imageSrc, postDate = new Date(), postedBy, content}) {
        this.id = "00000000-0000-0000-0000-000000000000";
        this.title = title;
        this.attachment = imageSrc;
        this.date = postDate;
        this.postedBy = postedBy;
        this.content = content;
    }
}