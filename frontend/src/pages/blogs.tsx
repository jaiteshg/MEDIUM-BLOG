import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const  Blogs = () => {

const {loading , blogs} = useBlogs();

if(loading) {
    return <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">loading...</span>
    </div>
        
}


return <div >
    <AppBar />
    <div className="flex  justify-center">
    <div className=" max-w-xl">
    {blogs.map(blog => <BlogCard
    id ={blog.id}
    authorName={blog.author.name  || "Anyonmus"}
    publishedDate="25-6-2015"
    title={blog.title}
    content= {blog.content}
     />)}
    
    </div>
    </div>
</div>
}