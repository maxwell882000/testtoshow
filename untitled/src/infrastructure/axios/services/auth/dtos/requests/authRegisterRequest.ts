export interface AuthRegisterRequest {
  phone: string; // minLength: 1
  name: string; // minLength: 1
  password: string; // minLength: 1
  repeatPassword: string; // minLength: 1
}
