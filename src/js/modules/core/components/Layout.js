import Header from './Header'
import Footer from './Footer'
import React, {Component} from 'react'

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            	{children}
            <Footer />
        </div>
    )
}

export default Layout;