import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import avatarImg from '../../../../assets/images/placeholder.jpg'
import toast from 'react-hot-toast';
import { getToken, saveUser } from '../../../../api/auth';

const MenuDropdown = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, signInWithGoogle, loading, setLoading } = useAuth();
    const from = location?.state?.pathname || '/'
    const [isOpen, setIsOpen] = useState(false)
    const { user, logOut } = useAuth()
    //handle google sign
    const handelGoogleSignin = async () => {
        try {
            const result = await signInWithGoogle()
            const dbResponse = await saveUser(result?.user)
            console.log(dbResponse)

            await getToken(result?.user?.email)
            toast.success("SignUp is successful");
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error)
            toast.error(error?.message);

        }
    }
    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                {/* Become A Host btn */}
                <div className='hidden md:block'>
                    <Link to="/">
                        <button className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'>
                            Home
                        </button>
                    </Link>
                    <Link to="/meals">
                        <button className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'>
                            Recipes
                        </button>
                    </Link>
                    {user ? <> </> : <>

                        <button onClick={handelGoogleSignin} className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'>
                            Continue with Google
                        </button>
                    </>}

                </div>
                {/* Dropdown btn */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                    
                    <div className=''>
                        {/* Avatar */}
                        <img
                            className='rounded-full'
                            referrerPolicy='no-referrer'
                            src={user && user.photoURL ? user.photoURL : avatarImg}
                            alt='profile'
                            height='30'
                            width='30'
                        />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        <Link
                            to='/'
                            className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                            Home
                        </Link>
                        <Link
                            to='/'
                            className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                            Recipes
                        </Link>
                        <Link
                            to='/'
                            className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                            Add-recipes
                        </Link>
                        {user ? <>
                            <h1 className='text-2xl p-2'>{user.displayName}</h1>
                            <Link
                                to='/dashboard'
                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                            >
                                Dashboard
                            </Link>
                            <div
                                onClick={logOut}
                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                            >
                                LogOut
                            </div></> : <>
                            {user ? <> </> : <>

                                <button onClick={handelGoogleSignin} className=' block md:hidden disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'>
                                    Google Login
                                </button>
                            </>}
                        </>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MenuDropdown