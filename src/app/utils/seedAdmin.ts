/* eslint-disable no-console */
import { envVars } from "../config/env"


import bcryptjs from 'bcryptjs';
import { IAuthProvider, IUser, Role } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";

export const seedAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({ email: envVars.ADMIN_EMAIL })
        if (isSuperAdminExist) {
            console.log("Admin Already Exists!")
            return
        }
        console.log("Trying To Create Admin")
        const hashedPassword = await bcryptjs.hash(envVars.ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))
        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.ADMIN_EMAIL
        }

        const payload: Partial<IUser> = {
            name: "Admin",
            role: Role.ADMIN,
            email: envVars.ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
            auths: [authProvider]

        }
        const admin = await User.create(payload)
        console.log("Admin Created Successfully \n")


        if (envVars.NODE_ENV === "development") {
            console.log(admin)
        }


    } catch (error) {


        if (envVars.NODE_ENV === "development") {
            console.log(error)
        }
    }
}