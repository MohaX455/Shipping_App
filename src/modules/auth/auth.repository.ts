import User from "@/models/User"
import { RegisterUserInput } from "@/types/auth.type"

export async function findUserByEmail(email: string) {
    return User.findOne({ email })
}

export async function findMobile(mobile: string) {
    return User.findOne({ mobile })
}

export async function createUser(data: RegisterUserInput) {
    const user = new User(data)
    return user.save()
}

export async function findUserById(id: string) {
    return User.findById(id)
}