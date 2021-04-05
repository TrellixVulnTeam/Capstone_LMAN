export class Report {
    id: number;
    content = '';
    type = '';
    reason = '';
    reportBy = '';
    dateReported: Date = new Date();
    status: boolean = false; 
  }