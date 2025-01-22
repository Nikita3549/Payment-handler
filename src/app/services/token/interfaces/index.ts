export interface jwtPayload{
    guid: string
    email: string
    name: string | null
    birthday: number | null
    gender: "male" | "female" | null
}