export class User {
  id: number;
  userName = '';
  firstname = '';
  lastname = '';
  roleName = '';
  email = '';
  phone = '';
  avatar = '';
  dateCreated: Date = new Date();
  isActive: boolean = false; 

  constructor(id?: number, firstname?: string, lastname?: string, roleName?: string, email?: string, phone?: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.roleName = roleName;
    this.email = email;
    this.phone = phone;
  }

}
