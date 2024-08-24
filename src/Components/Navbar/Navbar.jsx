import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import logo from '../../../public/shopping-cart.svg'
import { CartContext } from '../../Contexts/NumberOfCartItems';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const { userToken, setUserToken } = useContext(AuthContext);
  const {numberOfCartItems} = useContext(CartContext);

  const navigate = useNavigate();
  function signOut() {
    setUserToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
      <header className="bg-gray-800 fixed w-full z-50">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center w-full">
              <div className="text-white font-bold text-xl me-5">
                <Link to={"/"} className='flex me-5'>
                  <img className='w-8' src={logo} alt="FreshCart logo"/>
                  <span className='ms-2'>FreshCart</span>
                </Link>
              </div>
              {/* show nav links if the user is logged in "user have the token" */}
              {userToken && <div className="hidden md:block">
                <ul className="flex items-center space-x-6 mx-10">
                  <li><NavLink to={"/"} className="block px-1 py-2 text-white transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 hover:text-blue-500">Home</NavLink></li>
                  <li><NavLink to={"/products"} className="block px-1 py-2 text-white transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 hover:text-blue-500">Products</NavLink></li>
                  <li><NavLink to={"/categories"} className="block px-1 py-2 text-white transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 hover:text-blue-500">Categories</NavLink></li>
                  <li><NavLink to={"/brands"} className="block px-1 py-2 text-white transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 hover:text-blue-500">Brands</NavLink></li>
                  <li><NavLink to={"/wishlist"} className="block px-1 py-2 text-white transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 hover:text-blue-500">Wishlist</NavLink></li>
                  <li><NavLink to={"/cart"} className="block px-1 py-2 text-white transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 hover:text-blue-500">Cart</NavLink></li>
                </ul>
              </div>}
              <div className="links flex items-center gap-9">
                <ul className="flex gap-2">
                  {/* add login and register if the user is not logged in "user don't have the token" */}
                  {!userToken && <>
                    <li><Link to={"/login"} className="block py-1 px-2 border border-transparent text-white bg-blue-600 rounded hover:bg-transparent hover:text-blue-600 hover:border-blue-600 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">Login</Link></li>
                    <li><Link to={"/register"} className="block py-1 px-2 border border-transparent text-white  cursor-pointer bg-blue-600 rounded hover:bg-transparent hover:text-blue-600 hover:border-blue-600 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">Register</Link></li>
                  </>}
                  
                  {userToken && <div className='flex items-center'>
                    <Link to={"/cart"}>
                      <div className="hidden md:flex justify-center items-center cursor-pointer">
                        <div className="relative py-2">
                          <div className="t-0 absolute left-3">
                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{numberOfCartItems}</p>
                          </div>
                          <svg
                          className="file: mt-4 h-8 w-8 text-white size-10 mb-2"
                          version="1.1" 
                          xmlns="http://www.w3.org/2000/svg" 
                          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          viewBox="0 0 216.1 208.3" 
                          style={{enableBackground: 'new 0 0 216.1 208.3'}} 
                          xml:space="preserve"
                          >
                          <style>
                            {`
                              .st0{display:none;}
                              .st1{display:inline;}
                              .st2{fill:#F9F1E1;}
                              .st3{fill:#EAF4FE;}
                              .st4{fill:none;stroke:#0561FC;stroke-width:6.8376;stroke-miterlimit:10;}
                              .st5{fill:#0561FC;}
                              .st6{fill:#C5E1F9;}
                              .st7{fill:#7EB3FF;}
                              .st8{fill:#B5D5EA;}
                              .st9{fill:#E1EBF4;}
                              .st10{fill:#9AC7F7;}
                              .st11{fill:none;stroke:#0561FC;stroke-width:6.8376;}
                              .st12{fill:none;stroke:#7EB3FF;stroke-width:6.8376;}
                              .st13{fill:none;stroke:#0561FC;stroke-width:6.8376;stroke-linecap:round;}
                              .st14{fill:none;stroke:#0561FC;stroke-width:7.1001;}
                              .st15{fill:#B6D9EF;}
                              .st16{fill:none;stroke:#9AC7F7;stroke-width:6.8376;}
                              .st17{fill:none;stroke:#0561FC;stroke-width:6.8376;stroke-linejoin:bevel;}
                              .st18{fill:none;stroke:#0561FC;stroke-width:6.8376;stroke-linecap:round;stroke-linejoin:round;}
                              .st19{fill:none;stroke:#0561FC;stroke-width:5.0237;}
                              .st20{fill:none;stroke:#0450CF;stroke-width:6.8376;}
                              .st21{fill:none;stroke:#C5E1F9;stroke-width:6.8376;}
                              .st22{fill:#FFBF0D;}
                              .st23{fill:#B2D2EA;}
                              .st24{fill:none;stroke:#0561FC;stroke-width:6.9311;}
                              .st25{fill:none;stroke:#0561FC;stroke-width:6.8376;stroke-linecap:round;stroke-miterlimit:10;}
                              .st26{fill:#FFFFFF;}
                              .st27{fill:#FFFFFF;stroke:#0561FC;stroke-width:6.8376;}
                            `}
                          </style>
                        <g id="Layer_2">
                          <g class="st0">
                            <g class="st1">
                              <rect x="2.2" y="-3.3" class="st2" width="218.8" height="218.8"/>
                            </g>
                          </g>
                        </g>
                        <g id="Layer_3">
                        </g>
                        <g id="Layer_4">
                          <g>
                            <g>
                              
                                <rect x="53.6" y="73.3" transform="matrix(1 -4.826213e-03 4.826213e-03 1 -0.522 0.4364)" class="st6" width="73.2" height="70.1"/>
                              <polygon class="st15" points="126.7,96.5 53.4,73.5 126.6,73.1 			"/>
                              
                                <rect x="126.7" y="73" transform="matrix(-1 4.826707e-03 -4.826707e-03 -1 305.2754 215.4268)" class="st10" width="51.3" height="70.1"/>
                              
                                <rect x="47.6" y="50" transform="matrix(1 -4.827623e-03 4.827623e-03 1 -0.2966 0.4234)" class="st6" width="80" height="23.4"/>
                              
                                <rect x="127.5" y="49.6" transform="matrix(-1 4.825215e-03 -4.825215e-03 -1 311.3922 121.8908)" class="st10" width="56" height="23.4"/>
                            </g>
                            <g>
                              
                                <rect x="66.5" y="12.6" transform="matrix(1 -4.831162e-03 4.831162e-03 1 -0.1489 0.4146)" class="st6" width="38.6" height="37"/>
                              <polygon class="st15" points="105,24.8 66.4,12.6 104.9,12.5 			"/>
                              
                                <rect x="105" y="12.4" transform="matrix(-1 4.832273e-03 -4.832273e-03 -1 237.2021 61.1805)" class="st10" width="27" height="37"/>
                              
                                <rect x="63.3" y="0.2" transform="matrix(1 -4.826448e-03 4.826448e-03 1 -2.992408e-02 0.4072)" class="st6" width="42.1" height="12.3"/>
                              
                                <rect x="105.4" y="0.1" transform="matrix(-1 4.827950e-03 -4.827950e-03 -1 240.4255 11.8809)" class="st10" width="29.5" height="12.3"/>
                            </g>
                            <g>
                              <polyline class="st11" points="0,51.1 27.4,51.1 44.4,146.8 201.7,146.8 			"/>
                              <polyline class="st11" points="30.8,75 212,75 198.3,146.8 			"/>
                              <path class="st11" d="M201.7,170.7H46.2c-6.6,0-12-5.4-12-12l0,0c0-6.6,5.4-12,12-12h15.4"/>
                              <circle class="st11" cx="61.5" cy="194.6" r="10.3"/>
                              <circle class="st11" cx="188" cy="194.6" r="10.3"/>
                            </g>
                          </g>
                        </g>
                        </svg>
                        </div>
                      </div>
                    </Link>
                    <li><button onClick={signOut} className="py-[2px] md:ms-4 ms-2 md:px-2 px-1 md:me-6 me-3 border border-transparent text-white font-semibold bg-blue-600 rounded hover:bg-transparent hover:text-blue-600 hover:border-blue-600 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">SignOut</button></li>
                  </div>
                  }
                </ul>
              </div>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={isOpen ? "mobile-menu md:hidden": "mobile-menu md:hidden hidden"}>
            <ul className="mt-4 space-y-4">
              <li onClick={() => setIsOpen(false)}><NavLink to={"/"} className="block px-2 py-2 text-white bg-gray-900 rounded transition ease-in duration-200 hover:text-blue-500">Home</NavLink></li>
              <li onClick={() => setIsOpen(false)}><NavLink to={"/products"} className="block px-2 py-2 text-white bg-gray-900 rounded transition ease-in duration-200 hover:text-blue-500">Products</NavLink></li>
              <li onClick={() => setIsOpen(false)}><NavLink to={"/categories"} className="block px-2 py-2 text-white bg-gray-900 rounded transition ease-in duration-200 hover:text-blue-500">Categories</NavLink></li>
              <li onClick={() => setIsOpen(false)}><NavLink to={"/brands"} className="block px-2 py-2 text-white bg-gray-900 rounded transition ease-in duration-200 hover:text-blue-500">Brands</NavLink></li>
              <li onClick={() => setIsOpen(false)}><NavLink to={"/wishlist"} className="block px-2 py-2 text-white bg-gray-900 rounded transition ease-in duration-200 hover:text-blue-500">Wishlist</NavLink></li>
              <li onClick={() => setIsOpen(false)}><NavLink to={"/cart"} className="block px-2 py-2 text-white bg-gray-900 rounded transition ease-in duration-200 hover:text-blue-500">Cart</NavLink></li>
            </ul>
          </div>
          
        </nav>
      </header>
  )
}
