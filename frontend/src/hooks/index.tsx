import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blog{
    "content": string,
        "title": string,
        "id": number,
        "author": {
            "name": string
        }
}

export const useBlogs = () => {
    const [loading , setLoading] = useState(true);
    const [blogs , setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        
        try {
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
            .then(response => {
                console.log(response)
                setBlogs(response.data.blogs);
                setLoading(false)
            })
        } catch (error) {
            console.log("Error fetching blogs", error);
        }
    } , [])

    return {
        loading,
        blogs
    }
}