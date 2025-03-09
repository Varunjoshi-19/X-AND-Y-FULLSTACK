import crypto from "node:crypto";
import primaClient from "../database/db";
import jwt from "jsonwebtoken";

export interface UserPayloadType {

    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface LoginPayloadType {
    email: string;
    password: string;
}

export class UserService {

    public static async CreateNewUser(payload: UserPayloadType) {

        const { firstName, lastName, email, password } = payload;

        let UserData: any = {
            firstName,
            lastName: lastName ?? "",
            email,
        }

        const salt = crypto.randomBytes(40).toString("hex");
        const hashPassword = crypto.createHmac("sha256", salt).update(password).digest("hex");

        UserData.salt = salt;
        UserData.password = hashPassword;


        const user = await primaClient.user.create({
            data: UserData
        });
        return user;
    }

    public static async LoginInAccount(payload: LoginPayloadType): Promise<string> {

        const { email, password } = payload;

        try {
            const entry: any = await primaClient.user.findUnique({
                where: { email: email },
                select: { id: true, email: true, password: true, salt: true }

            });

            const userSalt = entry.salt;
            const userPasscode = entry.password;

            if (!entry || entry == "") throw new Error("Invalid User or Email");

            const newHash = crypto.createHmac("sha256", userSalt).update(password).digest("hex");

            if (newHash != userPasscode) throw new Error("Incorrect Passcode!");

            const KEY = process.env.TOKEN_ACCESS_KEY;
            if (!KEY) throw new Error("key not avaliable");

            const token = jwt.sign({ id: entry.id, email: email }, KEY);
            return token;

        }
        catch (error) {
            throw new Error(`Internal Error : ${error}`);
        }



    }


    public static AuthorizationUser(token: string) {

        const KEY = process.env.TOKEN_ACCESS_KEY;
        if (!KEY) throw new Error("key not avaliable");

        try {
            const user = jwt.verify(token, KEY);
            return user;
        } catch (error) {
            return {};
        }

    }


    public static async getUserById(id: string) {
        const user = await primaClient.user.findUnique({
            where: { id: id },

            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileImageUrl: true
            }
        })

        return user;
    }

}

