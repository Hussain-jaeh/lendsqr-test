export interface UserModel {
    accountBalance: String,
    accountNumber: String,
    createdAt: String,
    education: Object,
    email: String,
    guarantor: Object,
    id: String,
    lastActiveDate: String,
    orgName: String,
    phoneNumber: String,
    profile: String,
    socials: Object,
    userName: String,
}
export interface FilterValues {
    organization?: string;
    username?: string;
    email?: string;
    date?: string;
    phone?: string;
    status?: string;
  }