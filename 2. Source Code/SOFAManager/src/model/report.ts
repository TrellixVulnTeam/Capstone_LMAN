import { ReportReason } from "./reportReason";
import { ReportType } from "./reportType";

export class Report {
  id: number;
  fromAccount: number;
  fromAccountName: '';
  toAccount: number;
  toAccountName: '';
  toPost: number;
  toComment: number;
  typeReport: ReportType;
  listReason: Array<ReportReason> = new Array<ReportReason>();
  reportContent: '';
}