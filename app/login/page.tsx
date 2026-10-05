import Link from "next/link"

const page = () => {
  return (
    <main className="h-dvh flex items-center justify-center">
      <form className="flex flex-col gap-2 w-full max-w-76 py-5 px-7 pb-6 bg-white rounded-md shadow-md">
        <div className="flex flex-col gap-0.75">
          <div className="flex flex-col gap-0.5">
            <label htmlFor="email">Email</label>
            <input className="bg-white px-2 py-1 outline-none border border-neutral-300 focus:border-emerald-300 transition-all duration-300 rounded" type="email" id="email" />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="password">Password</label>
            <input className="bg-white px-2 py-1 outline-none border border-neutral-300 focus:border-emerald-300 transition-all duration-300 rounded" type="password" id="password" />
          </div>
        </div>
        <button className="px-2 py-1 rounded cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 w-full mt-1 outline-none" type="submit">Login</button>
        <p className="text-sm">Dont have an account <Link className="text-emerald-600 hover:text-emerald-700 transition-all outline-none focus:text-emerald-700" href="/register">Register</Link></p>
      </form>
    </main>
  )
}

export default page