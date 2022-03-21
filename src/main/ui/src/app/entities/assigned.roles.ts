import {Role} from "./role";

export class AssignedRoles {
  assignedRoleId: string | null;
  role: Role | null;

  constructor() {
    this.assignedRoleId = null;
    this.role = null;
  }
}
