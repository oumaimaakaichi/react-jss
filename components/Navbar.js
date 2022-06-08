import Link from "next/link";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router';


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {

    const [open, setOpen] = useState(true);

    const [user, setUser] = useState()
    const [token, setToken] = useState()

    const router = useRouter()


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUser(JSON.parse(localStorage.getItem('user')))
            setToken(JSON.parse(localStorage.getItem('token')))
        } else {
            router.push("/auth/login")
        }
        if (user) {
            if(user.role != "admin")
                router.push("/auth/login#admin-role")
        }
    }, [])

   async function logout() {
    if(window.confirm("êtes-vous sûr de vous déconnecter")){
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(token)
        let result = await fetch('http://192.168.43.230:3001/utilisateur/logout', {
          method: 'GET',
          headers: { "Authorization": `Bearer ${token}` },
        });
        result = await result.json();
        if(result.status == true) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            router.push("/auth/login")
        }
      }
}



    return (
        <>
            <nav className="bg-black text-white fixed z-30 w-full" >
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start ">
                            
                            <Link href="/" >
                                <li className="text-4xl font-bold flex items-center lg:ml-2.5 cursor-pointer">
                                    <span className="flex item-center">
                                        Aghsalni
                                        <div className="ml-1 w-3 h-3 rounded-full bg-green-500">
                                        </div> 
                                    </span>
                                </li>
                            </Link>
                            <form action="#" method="GET" className="hidden lg:block lg:pl-32">
                                </form>
                        </div>
                        <div className="flex items-center">
                            <button id="toggleSidebarMobileSearch" type="button" className="lg:hidden text-black hover:text-gray-900  p-2 rounded-lg">
                                <span className="sr-only">Search</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <div className="flex items-center gap-x-3">
                                    <div className="flex gap-x-3 items-center cursor-pointer">
                                        <p className="font-medium"><b>{user?.nom} {user?.prenom}</b></p>
                                        <figure className="w-10 h-10 sha">
                                            <img src="https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01-300x250.png" className="w-full h-full object-cover rounded-full shadow-sm bg-blue-500"/>
                                        </figure>
                                    </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex overflow-hidden bg-blue-500  text-black pt-16">
                {
                open ? (
                    <aside id="sidebar" className=" fixed  z-20 h-screen top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
                        <div className="relative flex-1 flex flex-col min-h-0 shadow-xl bg-gray-150 pt-0">
                            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                                <div className="flex-1 px-3 bg-gray-80 divide-y space-y-1">
                                    <ul className="space-y-2 pb-2">
                                        <li> 
                                            <form action="#" method="GET" className="lg:hidden">
                                                <label htmlFor="mobile-search" className="sr-only">
                                                    Search
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                                        </svg>
                                                    </div>
                                                    <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search"/>
                                                </div>
                                            </form>
                                        </li>
                                        <img src="/ff.png" width="200px" height="200px"/>
                                        
                                        <br/>
                                        
                                        <li>
                                            <Link href="/">
                                                <li className="text-base text-black font-normal rounded-lg flex items-center p-2  group cursor-pointer">
                                                    <span className="flex item-center">
                                                        <figure className="w-5 h-5">
                                                            <img src="/voiture.png" className="w-full"/>
                                                        </figure>

                                                        <span className="ml-3 text-gray-900 text-xxxl font-semibold">Les station lavages</span>
                                                    </span>
                            
                                                </li>
                                            </Link>
                                       
                                                <br/>
                                       
                                            <Link href="/client">
                                                <li className="text-base text-black  font-normal rounded-lg flex items-center p-2  group cursor-pointer">
                                                    <span className="flex item-center">
                                                        <figure className="w-5 h-5">
                                                            <img src="/listec1.png" className="w-full"/>
                                                        </figure>

                                                        <span className="ml-3 text-gray-900 text-xxxl font-semibold">Liste des clients</span>
                                                    </span>
                            
                                                </li>
                                            </Link>
                                            <br />
                                            
                                          
                                            <Link href="/formm">
                                                <li className="text-base text-gray-100 font-normal rounded-lg flex items-center p-2  group cursor-pointer">
                                                    <span className="flex item-center">
                                                        <figure className="w-5 h-5">
                                                            <img src="/admin.png" className="w-full" />
                                                        </figure>

                                                        <span className="ml-3 text-gray-900 text-xxxl font-semibold">Ajouter un admin</span>
                                                    </span>
                            
                                                </li>
                                            </Link>
                                            <br/>
                                            <Link href="/ListeAdmin">
                                                <li className="text-base text-black  font-normal rounded-lg flex items-center p-2  group cursor-pointer">
                                                    <span className="flex item-center">
                                                        <figure className="w-5 h-5">
                                                            <img src="/listec1.png" className="w-full"/>
                                                        </figure>

                                                        <span className="ml-3 text-xxxl text-gray-900 font-semibold">Liste des Admins</span>
                                                    </span>
                            
                                                </li>
                                            </Link>

                                            
                                        </li>
                                    </ul>
                                    <br /> <br/><br/>
                                    <div className="space-y-2 pt-2">
                                        <li className="list-none">
                                            <Link href="" >
                                                <li className="text-base text-gray-900 font-normal rounded-lg  flex items-center p-2 group cursor-pointer ">
                                                    <span className="flex item-center">
                                                        <svg className="w-6 h-6 text-black flex-shrink-0 group-hover:text-white transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
                                                        </svg>

                                                        <span className="ml-3 text-black font-semibold flex-1 whitespace-nowrap" onClick={() =>logout()} >
                                                            Déconnexion
                                                        </span>
                                                    </span>
                                                </li>
                                            </Link>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                ) : ("")
            } </div>
        </>
    );
}
