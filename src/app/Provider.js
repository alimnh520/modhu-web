'use client'
import React, { createContext, useEffect, useState } from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';
import { usePathname } from 'next/navigation';
export const UserContext = createContext();

const Provider = ({ children }) => {
    const path = usePathname();
    const hiddenPath = ['/login', '/dashboard']
    const [scrollPath, setScrollPath] = useState('');

    return (
        <div className="">
            <UserContext.Provider value={{ setScrollPath, scrollPath }}>
                {path !== '/login' && <Header />}
                <div className='mt-16 sm:mt-20'>{children}</div>
                {!hiddenPath.includes(path) && <Footer />}
            </UserContext.Provider>
        </div>
    )
}

export default Provider