import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Input } from '../index'
import { Logo } from '../index'


function UserHeader() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All creators", slug: "/allcreator", active: true },
    { name: "Course", slug: "/", active: true },
    { name: "Join as Creator", slug: "/creatorlogin", active: true },
  ];

  return (
    <>
      <header className="py-4 bg-white text-black border-b border-[#DEDEDE] sticky top-0 z-50">
        <Container>
          <nav className="flex items-center">
            {/* Left: Logo + Search */}
            <div className="flex items-center gap-3 mt-1">
              <Link to="/">
                <Logo width="65px" />
              </Link>
              <Input
                className="border rounded-2xl w-90 h-9 pl-5 placeholder:font-medium"
                placeholder="Search for course"
              />
            </div>

            {/* Right: Nav Links + Login */}
            <ul className="flex items-center ml-auto space-x-9 relative">
              {navItems.map((item) =>
                item.active ? (
                  <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() =>
                      item.name === "Course" && setShowDropdown(true)
                    }
                    onMouseLeave={() =>
                      item.name === "Course" && setShowDropdown(false)
                    }
                  >
                    <Button
                      bgColor=""
                      textColor=""
                      onClick={() => navigate(item.slug)}
                      className="text-gray-500 font-semibold hover:text-blue-500 transition"
                    >
                      {item.name}
                    </Button>

                    {/* Dropdown for "Course" */}
                    {item.name === "Course" && showDropdown && (
                      <div className="absolute bg-white -right-51 top-6 border border-gray-200 shadow-xl rounded-lg p-6 grid grid-cols-3 divide-x divide-gray-200 gap-8 min-w-[800px] z-50">
                        {/* Web Development */}
                        <div className="px-4">
                          <h3 className="text-[#172B6F] font-semibold mb-3">Web Development</h3>
                          <ul className="space-y-2 text-gray-800">
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>React.js</li>
                            <li>Next.js</li>
                          </ul>
                        </div>

                        {/* Programming Languages */}
                        <div className="px-4 w-119">
                          <h3 className="text-[#172B6F] font-semibold mb-3">Programming Languages</h3>
                          <ul className="space-y-2 text-gray-800">
                            <li>Python</li>
                            <li>Java</li>
                            <li>C / C++</li>
                            <li>C#</li>
                            <li>Go</li>
                            <li>Rust</li>
                          </ul>
                        </div>

                        {/* Databases */}
                        <div className="px-4">
                          <h3 className="text-[#172B6F] font-semibold mb-3">Databases</h3>
                          <ul className="space-y-2 text-gray-800">
                            <li>SQL</li>
                            <li>MySQL</li>
                            <li>PostgreSQL</li>
                            <li>MongoDB</li>
                            <li>Firebase</li>
                          </ul>
                        </div>
                      </div>
                    )}

                  </li>
                ) : null
              )}

              {/* Login Button */}
              <li>
                <Button
                  bgColor=""
                  textColor=""
                  className="text-gray-500 font-semibold border text-white bg-[#172B6F] rounded-full px-6 py-2 hover:bg-white hover:text-[#172B6F] transition"
                >
                  Login
                </Button>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}


export default UserHeader
