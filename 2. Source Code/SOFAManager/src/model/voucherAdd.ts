export class VoucherAdd{
    title: string;
    image: string;
    code: string;
    content: string;
    fromDate: Date;
    toDate: Date;
    quantity: number;
    description: string;

    /**
     *
     */
    constructor() {
        this.title = '';
        this.image = '';
        this.code = '';
        this.content = '';
        this.fromDate = new Date();
        this.toDate = new Date();
        this.quantity = 1;
        this.description = '';
    }
}