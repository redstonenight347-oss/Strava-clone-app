import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../schema";

export async function Signup(user: {
  name: string,
  email: string
}) {
  try {
    
    await db
    .insert(users)
    .values(user)
  
  }
  catch(err) {
    console.log(err)
  }
}

export async function Login(email: string) {
  try {
    
    const user = await db
    .select({
      name: users.name, 
      email: users.email})
    .from(users)
    .where(eq(users.email, email))
    
    return user
  }
  catch (err) {
    console.log(err)
    return null
  }
}