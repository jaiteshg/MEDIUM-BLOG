interface BlogCardPops {
    authorName: string;
    title: string;
    content: string;
    publishedDate : string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardPops)=>{
return <>
    <div className="font-semibold">
        <Avtar name= {authorName}/> {authorName}  {publishedDate}
    </div>
    <div>
        {title}
    </div>
    <div>
        {content.slice(0, 100) + "....."}
    </div>
    <div>
        {`${Math.ceil(content.length / 100)} minutes`}
    </div>
    <div className="bg-slate-200 h-1 w-full">

    </div>
</>
}

function Avtar( {name} : {name: string}){
    return <>      
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
        <span className="font-medium text-base text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

    </>
}