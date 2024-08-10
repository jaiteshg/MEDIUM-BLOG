import { Avtar } from "./BlogCard"

export const AppBar = ()=> {
    return <div className="flex justify-between border-b px-10 py-4">
        <div>
            Medium
        </div>
        <div>
            <Avtar name ="jaitesh"/>
        </div>
    </div>
}