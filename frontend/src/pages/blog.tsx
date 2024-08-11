import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/AppBar";
import Spinner from "../components/Spinner";


export const Blog = ( ) => {
    const {id} = useParams();
   const {loading , blog}  = useBlog({
    id: id || "",
   });
   
 
   if (loading || !blog) {
     return (
       <>
          <Appbar /> 
        <div className="h-screen flex justify-center items-center">
           {" "}
           <Spinner />{" "}
        </div>
       </>
     );
   }
 
   return (
     <>
       <FullBlog blog={blog}/>
     </>
   );
 };
