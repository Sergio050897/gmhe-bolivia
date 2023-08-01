
export class LoginPayload {
  username: string;
  password: string;
}

export class SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  cPassword: string;
}

export class Permission {
  display_name: string;
  name: string;
  id?: number;
}

export class RolAux {
  id?: number;
  name: string;
  display_name: string;
  permissions?: Permission[];
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  emailHash: string;
  passwordLastUpdated?: any;
  lastLogin: Date;
  phone?: any;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  roles?: RolAux[];
}

export class Credentials {
  user: User;
  username: string;
  token: string;
  session: string;
}
