import { Link } from "react-router-dom";

interface BlogCardPops {
    authorName: string;
    title: string;
    content: string;
    publishedDate : string;
    id : number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardPops)=>{
return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
          <div className="flex">
        <div className="flex justify-center flex-col">
        <Avtar name= {authorName}/>
        </div>
        <div className="font-extralight pl-2">{authorName}</div>
        <div className="pl-2 flex justify-center flex-col">
            <Circle />
        </div>
        <div className="pl-2 text-slate-500 font-thin">
          {publishedDate}
        </div> 
    </div>
    <div className="text-xl font-bold">
        {title}
    </div>
    <div className="text-base font-extralight">
        {content.slice(0, 200) + "....."}
    </div>
    <div className="w-full text-slate-500 font-extralight text-sm">
        {`${Math.ceil(content.length / 100)} minutes(s) reads`}
    </div>
    </div>
</Link>
}

function Circle(){
    return<div className="h-1 w-1 rounded-full bg-slate-500" ></div>
}
export function Avtar( {name} : {name: string}){
    return <>      
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
        <span className="font-medium text-base text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

    </>
}