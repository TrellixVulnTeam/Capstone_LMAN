import { ReportReason } from "./reportReason";

export class UserReport {
    id: number;
    fromAccount: number;
    fromAccountName: string;
    toAccount: number;
    toAccountname: string;
    reasons: Array<ReportReason> = new Array<ReportReason>();
    content: string;

    constructor(id: number, fromAccount: number, fromAccountName: string, toAccount: number, toAccountName: string, reasons: Array<ReportReason>, content: string) {
        this.id = id;
        this.fromAccount = fromAccount;
        this.fromAccountName = fromAccountName;
        this.toAccount = toAccount;
        this.toAccountname = toAccountName;
        this.reasons = reasons;
        this.content = content;
    }
}