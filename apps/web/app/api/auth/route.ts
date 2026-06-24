import { CreateUserSchema } from "@repo/validation"
import { Signup, Login } from "@repo/db";


export async function POST(req: Request) {
  const body = await req.json();

  try {

    const validData = CreateUserSchema.safeParse(body)
    if (!validData.success) {
      return Response.json({ errors: "validData.error" }, { status: 400 });
    }

    const userExists = await Login(body.email)

    if(!userExists || userExists.length === 0){
      await Signup(body)
    }

    return Response.json({
      success: true,
      user: userExists
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}