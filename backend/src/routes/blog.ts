import { createBlogInput, updateBlogInput } from "@jaitesh/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId : string ;
    }
}>(); 



blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');	
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const payload = await verify(jwt, c.env.JWT_SECRET);
	if(payload){
		// @ts-ignore
		c.set("userId", payload.id);
		await next()
	}
	else {
		c.status(401);
		return c.json({ error: "you r not logged in" });
	}
	
})



blogRouter.post('/', async(c) => {
        const authorId = c.get("userId");
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
		const { success } = createBlogInput.safeParse(body);
		if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
		}
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        });
        return c.json({
            id: post.id
        });
    })
    

blogRouter.put('/', async(c) => {
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
})

blogRouter.get('/bulk' , async(c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({});

	return c.json(posts);
})
blogRouter.get('/get/:id', async(c) => {
    const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})

