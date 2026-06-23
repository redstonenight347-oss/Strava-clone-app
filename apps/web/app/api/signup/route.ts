import { CreateUserSchema } from "@repo/validation"
import { db } from "@repo/db";
import { users } from "@repo/db";

export async function POST(req: Request) {
  const body = await req.json();

  try {

    const validData = CreateUserSchema.safeParse(body)
    if (!validData.success) {
      return Response.json({ errors: validData.error.flatten() }, { status: 400 });
    }

    await db.insert(users).values({
      name: validData.data.name,
      email: validData.data.email,
      password: validData.data.password
    });

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}