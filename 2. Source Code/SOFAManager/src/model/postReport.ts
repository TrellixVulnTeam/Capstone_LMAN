import { ReportReason } from "./reportReason";

export class PostReport {
    id: number;
    fromAccount: number;
    fromAccountName: string;
    toAccount: number;
    toAccountname: string;
    toPost: number;
    reasons: Array<ReportReason> = new Array<ReportReason>();
    content: string;

    constructor(id: number,fromAccount: number, fromAccountName: string, toAccount: number, toAccountName: string, toPost: number, reasons: Array<ReportReason>, content: string) {
     this.id = id;
     this.fromAccount;
     this.fromAccountName = fromAccountName;
     this.toPost = toPost;
     this.reasons = reasons;
     this.content = content;
    }
}