import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'


const app = new Hono<{
  Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId : string,
  }
}>()

app.use('/api/v1/blog/*', async (c, next) => {
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

app.post('/api/v1/user/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  const Body = await c.req.json();
  const user = await prisma.user.create({
    data: {
      email: Body.email,
      password: Body.password,
    }
  });
  
  const jwt = await sign({ id:user.id}, c.env.JWT_SECRET )
  return c.text(jwt);
})


 
app.post('/api/v1/user/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})

app.post('/api/v1/blog', (c) => {
  return c.text('blog page')
})

app.put('/api/v1/blog', (c) => {
  return c.text('blog page')
})

app.get('/api/v1/blog/:id', (c) => {
 
  const id = c.req.param('id')
  console.log(`Blog id: ${id}`)
  return c.text('blog_id')
  
})

app.get('/api/v1/blog/bulk' , (c) => {
  return c.text('blog_bulk')
})


export default app
