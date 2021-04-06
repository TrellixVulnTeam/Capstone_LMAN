export class Post {
    id: number;
    content = '';
    postImageUri = '';
    postedBy = '';
    dateCreated: Date = new Date();
    isActive: boolean = false; 
  }