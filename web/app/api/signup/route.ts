import { db, users } from "@repo/db";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await db.insert(users).values({
      name: body.name,
      email: body.email,
      password: body.password
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