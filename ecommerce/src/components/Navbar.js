import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default class Navbar extends Component {

    sayHello() {
        alert('Hello!');
    }

    render() {
        return (
            <div>
                <header className="header" id="header">
                    <div className="header-logo">
                        <Link to="/">
                            <a className="header-brand">
                            <img src="/logo.png" alt="logo" width="20px" height="auto" />
                            <pre>   </pre>
                            <span className="brand-text">E-commerce</span>
                            </a>
                        </Link>
                    </div>
                    <div className="header-nav">
                        <ul className="nav">
                            <li className="header-nav-item">
                                <Link to="/">
                                    <a className="header-nav-link active">Shirts</a>
                                </Link>
                            </li>
                            <li className="header-nav-item">
                                <Link to="/about">
                                    <a className="header-nav-link ripple ripple-dark">About</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <a className="header-back ripple-grow" id="back">
                        <span className="ripple-waves ripple ripple-dark">
                            <svg className="ripple-icon icon-back" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                            </svg>
                        </span>
                    </a>
                    <div className="header-search-content">
                        <div className="search-form">
                            <span className="search-icon">
                                <svg width="28px" height="28px" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path>
                                </svg>
                            </span>
                            <input className="header-search-input" id="header_search" type="text" placeholder="Search for products, shirts and more"/>
                        </div>
                    </div>
                    <div className="header-profile">
                        <a className="header-profile-links ripple-grow" onClick={this.sayHello}>
                            <span className="ripple-waves ripple ripple-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
                            </span>
                        </a>
                        {/* <a className="hader-profile-links ripple-grow">
                            <span className="ripple-waves ripple ripple-dark">
                                <svg className="ripple-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M10,12A2,2 0 0,0 8,14A2,2 0 0,0 10,16A2,2 0 0,0 12,14A2,2 0 0,0 10,12M6,8A2,2 0 0,0 4,10A2,2 0 0,0 6,12A2,2 0 0,0 8,10A2,2 0 0,0 6,8M6,16A2,2 0 0,0 4,18A2,2 0 0,0 6,20A2,2 0 0,0 8,18A2,2 0 0,0 6,16M18,8A2,2 0 0,0 20,6A2,2 0 0,0 18,4A2,2 0 0,0 16,6A2,2 0 0,0 18,8M14,16A2,2 0 0,0 12,18A2,2 0 0,0 14,20A2,2 0 0,0 16,18A2,2 0 0,0 14,16M18,12A2,2 0 0,0 16,14A2,2 0 0,0 18,16A2,2 0 0,0 20,14A2,2 0 0,0 18,12M14,8A2,2 0 0,0 12,10A2,2 0 0,0 14,12A2,2 0 0,0 16,10A2,2 0 0,0 14,8M10,4A2,2 0 0,0 8,6A2,2 0 0,0 10,8A2,2 0 0,0 12,6A2,2 0 0,0 10,4Z"></path>
                                </svg>
                            </span>
                        </a> */}
                        {/* <a className="hader-profile-links">
                            <svg className="avatar" width="35" height="35" xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                                <rect width="100%" height="100%" fill="#495057"></rect>
                            </svg>
                        </a> */}
                    </div>
                </header>
            </div>
        );
    }
}