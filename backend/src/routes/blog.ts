import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId : any ;
    }
}>(); 



blogRouter.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
})



blogRouter.post('/api/v1/blog', async(c) => {

        const userId = c.get('userId');
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        return c.json({
            id: post.id
        });
    })
    

blogRouter.put('/api/v1/blog', async(c) => {
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
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

blogRouter.get('/api/v1/blog/:id', async(c) => {
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

blogRouter.get('/api/v1/blog/bulk' , async(c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.find({});

	return c.json(posts);
})