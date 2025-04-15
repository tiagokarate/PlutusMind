import React from 'react';
import { Menu, Bell, Sun, Moon, Search, ChevronDown, X } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  isDark,
  setIsDark,
}) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger Toggle BTN */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block lg:hidden"
          >
            <Menu className="h-6 w-6 text-black dark:text-white" />
          </button>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="inline-flex items-center justify-center rounded-full bg-gray-100 p-2 text-black hover:text-primary dark:bg-meta-4 dark:text-white dark:hover:bg-meta-3"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Search Modal */}
          {searchOpen && (
            <div className="fixed inset-0 z-9999 bg-black/50">
              <div className="w-full bg-white dark:bg-boxdark p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-black dark:text-white">
                    Search
                  </h3>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="hover:text-primary"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type to search..."
                    className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                  />
                  <Search className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Dark Mode Toggler */}
            <li>
              <button
                onClick={() => setIsDark(!isDark)}
                className="inline-flex items-center justify-center rounded-full bg-gray-100 p-2 text-black hover:text-primary dark:bg-meta-4 dark:text-white dark:hover:bg-meta-3"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </li>

            {/* Notification Menu Area */}
            <li className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full bg-gray-100 hover:text-primary dark:bg-meta-4 dark:text-white dark:hover:bg-meta-3"
              >
                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                </span>
                <Bell className="h-5 w-5 duration-300 ease-in-out" />
              </button>

              {/* Dropdown Start */}
              {notificationOpen && (
                <div className="absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80">
                  <div className="px-4.5 py-3">
                    <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
                  </div>

                  <ul className="flex h-auto flex-col overflow-y-auto">
                    <li>
                      <a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#">
                        <p className="text-sm">
                          <span className="text-black dark:text-white">Edit your information in a swipe</span>
                          {' '} Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                        </p>
                        <p className="text-xs text-bodydark2">12 May, 2025</p>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>

          {/* User Area */}
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-4"
            >
              <span className="h-12 w-12 rounded-full">
                <img src="https://i.pravatar.cc/48" alt="User" className="rounded-full" />
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm font-medium text-black dark:text-white">
                  Musharof Chy
                </span>
                <span className="block text-xs font-medium text-bodydark2">
                  [email protected]
                </span>
              </span>
              <ChevronDown className="hidden h-4 w-4 sm:block" />
            </button>

            {/* Dropdown Start */}
            {userOpen && (
              <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                  <li>
                    <a href="#" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                      Account Settings
                    </a>
                  </li>
                </ul>
                <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 