// 1st step :- you are adding providers 
// 2nd step :- authorize and do hashing of password 
// 3rd step :- after hashing find if the user already exists in the db 
// 4th step :- check if the password that is been sent is matching with credentials.password(stored during 1st signup)
// 5th step :- return id, name, email (depends on the schema.prisma file)
// 6th step :- create the user in the db and return number and the hashedpassword
// 7th step :- return the id, name and email
// 8th step :- Check whether the JWT_SECRET sent is correct or not and probably extract it from process.env.JWT_SECRET
// (One should never "hard code" their password in the db directly, it should always be extracted)
// 9th step :- make the callback call to get the user id back

import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },

          async authorize(credentials: any) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }
            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
  }
