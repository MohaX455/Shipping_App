import User from "@/models/User"

export async function findUserByEmail(email: string) {
  return User.findOne({ email })
}

export async function findMobile(mobile: string) {
  return User.findOne({ mobile })
}

export async function createUser(data: any) {
  const user = new User(data)
  return user.save()
}

export async function findUserById(id: string) {
  return User.findById(id)
}