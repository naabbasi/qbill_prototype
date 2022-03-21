import {AssignedRoles} from "./assigned.roles";

export class User {
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  password: string | null;
  userStatus?: string | null;
  userRoles?: string[] | null;
  token?: string | null;
  assignedRoles?: AssignedRoles[] | null;

  constructor() {
    this.userId = null;
    this.firstName = null;
    this.lastName = null;
    this.username = null;
    this.password = null;
    this.userStatus = null;
    this.token = null;
  }
}
