import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { singinInput, singupInput } from "@jaitesh/medium-common";



export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} = singupInput.safeParse(body);
    if(!success) {
      c.status(400);
      return c.json({ error: "Invalid input" });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    
  
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name : body.name
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.text(token)
})
  
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = singinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" })
  };  
  
  const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

  
    const user = await prisma.user.findUnique({
        where: {
            email: body.username,
            password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text( jwt );
})
