export default function Profile({name}){
    return <div className="rounded-full bg-slate-200 text-gray-800 h-10 w-10 flex items-center justify-center mt-1 mr-2">
        <div className="flex items-center text-xl">
     {name[0]}
        </div>
    </div>
}