import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/spider-web.png"
            width={50}
            height={50}
            alt="TeeBug Logo"
          />
          <p className="nav-logo">
            <span className="text-primary">Uzuri</span>
          </p>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar