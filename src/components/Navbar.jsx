import React, { useState, useRef, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
    const [searchOpen, setSearchOpen] = useState(false)
    const inputRef = useRef(null)

    const toggleSearch = () => setSearchOpen(prev => !prev)

    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [searchOpen])

    return (
        <header className="navbar-wrapper">
            <nav className="navbar">
                <div className="navbar-left">
                    <a href="/" className="nav-link">Home</a>
                </div>

                <div className="navbar-center">
                    <h1 className="navbar-title">Movie Search</h1>
                </div>

                <div className="navbar-right">
                    <a href="#about" className="nav-link">About</a>
                    <button
                        className={`search-icon-btn ${searchOpen ? 'active' : ''}`}
                        aria-label="Search"
                        onClick={toggleSearch}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Slide-down search bar */}
            <div className={`search-bar-container ${searchOpen ? 'open' : ''}`}>
                <div className="search-bar-inner">
                    <svg
                        className="search-bar-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18" height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder="Search for a movie..."
                    />
                </div>
            </div>
        </header>
    )
}

export default Navbar