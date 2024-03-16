// eslint-disable-next-line no-unused-vars


const navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-500 text-white py-3'>
        <div className="font-bold text-xl mx-9" >
            <span>
                Itask
            </span>
        </div>
        <ul className="flex gap-8 mx-10 ">
            <li className="cursor-pointer hover:font-bold transition-all duration-200">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all duration-200">Your task</li>
        </ul>
    </nav>
  )
}

export default navbar