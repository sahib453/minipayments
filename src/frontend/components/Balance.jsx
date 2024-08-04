export default function Balance({balance}){
    const formattedBalance = balance.toFixed(2);
    return <div className="flex flex-col">

<div className="text-xl font-semibold">Your balance ₹ {formattedBalance}</div>



    </div>

}