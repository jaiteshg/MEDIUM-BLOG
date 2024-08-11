import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import Skeleton from "../components/Skeleton";
import { useBlogs } from "../hooks"

export const  Blogs = () => {

const {loading , blogs} = useBlogs();

if (loading ) {
    return (
      <>
         <Appbar /> 
       <div className="h-screen flex justify-center items-center">
          {" "}
          <Skeleton />
       </div>
      </>
    );
  }


return <div >
    <Appbar />
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