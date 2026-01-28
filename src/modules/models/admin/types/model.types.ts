export interface IAdmin {
    user_name: string;
    password: string;
    status?: "active" | "inactive";
}