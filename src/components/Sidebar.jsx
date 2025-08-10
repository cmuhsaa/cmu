"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronUp, FiChevronDown, FiMenu, FiLink } from "react-icons/fi";
import {
  FiHome,
  FiInfo,
  FiClock,
  FiStar,
  FiAward,
  FiSettings,
  FiImage,
  FiCalendar,
  FiBell,
  FiFileText,
  FiUsers,
  FiMessageSquare,
} from "react-icons/fi";
import Edit from "./Edit";

const SidebarData = {
  sidebarItems: [
    { href: "/", label: "Home", icon: <FiHome className="w-5 h-5 mr-3" /> },
    {
      href: "/introduction",
      label: "পরিচিতি",
      icon: <FiInfo className="w-5 h-5 mr-3" />,
    },
    {
      href: "/background",
      label: "প্রেক্ষাপট",
      icon: <FiClock className="w-5 h-5 mr-3" />,
    },
    {
      href: "/messageFromChiefPatron",
      label: "প্রধান পৃষ্ঠপোষক",
      icon: <FiStar className="w-5 h-5 mr-3" />,
    },
    {
      href: "/messageFromPresident",
      label: "সভাপতি",
      icon: <FiAward className="w-5 h-5 mr-3" />,
    },
    {
      href: "/messageFromSecretary",
      label: "সাধারণ সম্পাদক",
      icon: <FiSettings className="w-5 h-5 mr-3" />,
    },
  ],
  quickLinks: [
    {
      href: "/gallery",
      label: "ফটো গ্যালারি",
      icon: <FiImage className="w-4 h-4 mr-2" />,
    },
    {
      href: "/event",
      label: "আসন্ন অনুষ্ঠান",
      icon: <FiCalendar className="w-4 h-4 mr-2" />,
    },
    {
      href: "/notice",
      label: "নোটিশ",
      icon: <FiBell className="w-4 h-4 mr-2" />,
    },
    {
      href: "/post",
      label: "পোস্ট",
      icon: <FiFileText className="w-4 h-4 mr-2" />,
    },
    {
      href: "/student",
      label: "শিক্ষার্থীদের তালিকা",
      icon: <FiUsers className="w-4 h-4 mr-2" />,
    },
    {
      href: "/teacher",
      label: "শিক্ষকমণ্ডলী",
      icon: <FiUsers className="w-4 h-4 mr-2" />,
    },
    {
      href: "/feedback",
      label: "Contact",
      icon: <FiMessageSquare className="w-4 h-4 mr-2" />,
    },
  ],
};

export default function Sidebar() {
  const { sidebarItems, quickLinks } = SidebarData;
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for mobile sidebar toggle
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Toggle Button only on small screens */}
      <button
        onClick={toggleSidebar}
        className="xl:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
      >
        <FiMenu />
      </button>

      <div className="inline-block xl:hidden">
        <div
          className={`z-40 xl:sticky xl:top-8 transition-all duration-300 bg-white shadow-xl overflow-y-auto h-screen xl:h-auto`}
          style={{
            position: "fixed",
            top: 0,
            left: isSidebarOpen ? "0" : "-100%",
            width: "80%", // control width in mobile
            maxWidth: "320px",
          }}
        >
          <div className="p-6 mb-6">
            {/* Main Menu */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
            >
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <FiMenu className="w-5 h-5 mr-2 text-blue-600" />
                প্রধান মেনু
              </h3>
              {isMainMenuOpen ? (
                <FiChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <nav
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMainMenuOpen ? "max-h-110 mt-4" : "max-h-0"
              }`}
            >
              <div className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                      item.href === pathname
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <Edit model={"dashboard"} id={`/dashboard`} />
              </div>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="p-6 mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
            >
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <FiLink className="w-5 h-5 mr-2 text-green-600" />
                দ্রুত লিঙ্ক
              </h3>
              {isQuickLinksOpen ? (
                <FiChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isQuickLinksOpen ? "max-h-110 mt-4" : "max-h-0"
              }`}
            >
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                      link.href === pathname
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {link.icon}
                    <span className="text-sm">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-8 xl:col-span-1 overflow-auto max-h-[calc(100dvh-32px)] hide-scrollbar">
        <div className="w-full xl:inline-block hidden">
          {/* Navigation Menu - Collapsible with smooth transition */}
          <div className="bg-white/40 backdrop-blur-[2px] rounded-2xl shadow-xl p-6 mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
            >
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <FiMenu className="w-5 h-5 mr-2 text-blue-600" />
                প্রধান মেনু
              </h3>
              {isMainMenuOpen ? (
                <FiChevronUp className="w-5 h-5 text-gray-500 transition-transform duration-200" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
              )}
            </div>

            <nav
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMainMenuOpen ? "max-h-110 mt-4" : "max-h-0"
              }`}
            >
              <div className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                      item.href === pathname
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <Edit model={"dashboard"} id={`/dashboard`} />
              </div>
            </nav>
          </div>

          {/* Quick Links - Collapsible with smooth transition */}
          <div className="bg-white/40 backdrop-blur-[2px] rounded-2xl shadow-xl p-6 mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
            >
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <FiLink className="w-5 h-5 mr-2 text-green-600" />
                দ্রুত লিঙ্ক
              </h3>
              {isQuickLinksOpen ? (
                <FiChevronUp className="w-5 h-5 text-gray-500 transition-transform duration-200" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isQuickLinksOpen ? "max-h-110 mt-4" : "max-h-0"
              }`}
            >
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                      link.href === pathname
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {link.icon}
                    <span className="text-sm">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="h-full w-full fixed left-0 top-0 bg-[#ff117710] z-10"
          style={{ backdropFilter: "blur(3px)" }}
        ></div>
      )}
    </>
  );
}
