import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, BarChart2, Settings, ShoppingCart, ChartBar, LineChart, Users, Calendar, FileText, Table, Layout, X, MessageSquare, Mail, FileCheck } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const menuCategories = [
  {
    title: 'MENU',
    items: [
      {
        label: 'Dashboard',
        icon: <BarChart2 className="h-5 w-5" />,
        link: '/',
        submenu: [
          { label: 'eCommerce', link: '/ecommerce' },
          { label: 'Analytics', link: '/analytics', badge: 'Pro' },
          { label: 'Marketing', link: '/marketing', badge: 'Pro' },
          { label: 'CRM', link: '/crm', badge: 'Pro' },
          { label: 'Stocks', link: '/stocks', badge: 'New Pro' },
          { label: 'SaaS', link: '/saas', badge: 'New Pro' },
        ]
      },
      {
        label: 'Calendar',
        icon: <Calendar className="h-5 w-5" />,
        link: '/calendar'
      },
      {
        label: 'Task',
        icon: <FileCheck className="h-5 w-5" />,
        link: '/task',
        submenu: [
          { label: 'List', link: '/task/list', badge: 'Pro' },
          { label: 'Kanban', link: '/task/kanban', badge: 'Pro' }
        ]
      },
      {
        label: 'Forms',
        icon: <FileText className="h-5 w-5" />,
        link: '/forms',
        submenu: [
          { label: 'Form Elements', link: '/forms/elements' },
          { label: 'Form Layout', link: '/forms/layout' }
        ]
      },
      {
        label: 'Tables',
        icon: <Table className="h-5 w-5" />,
        link: '/tables',
        submenu: [
          { label: 'Basic Tables', link: '/tables/basic' },
          { label: 'Data Tables', link: '/tables/data', badge: 'Pro' }
        ]
      },
      {
        label: 'Pages',
        icon: <Layout className="h-5 w-5" />,
        link: '/pages',
        submenu: [
          { label: 'File Manager', link: '/pages/file-manager', badge: 'Pro' },
          { label: 'Blank Page', link: '/pages/blank', badge: 'Pro' },
          { label: '404 Error', link: '/pages/404', badge: 'Pro' }
        ]
      }
    ]
  },
  {
    title: 'SUPPORT',
    items: [
      {
        label: 'Chat',
        icon: <MessageSquare className="h-5 w-5" />,
        link: '/chat'
      },
      {
        label: 'Email',
        icon: <Mail className="h-5 w-5" />,
        link: '/email',
        submenu: [
          { label: 'Inbox', link: '/email/inbox', badge: 'Pro' },
          { label: 'Details', link: '/email/details', badge: 'Pro' }
        ]
      }
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-black dark:text-white">
              PlutusMind
            </span>
          </div>
        </Link>

        <button
          onClick={() => setSidebarOpen(false)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-black hover:text-primary"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {menuCategories.map((category, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">
                {category.title}
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                {category.items.map((item) => {
                  const isActive = pathname === item.link || 
                    (item.submenu && item.submenu.some(sub => pathname === sub.link));

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.link}
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-primary/10 ${
                          isActive ? 'text-primary bg-primary/10' : 'text-black dark:text-bodydark'
                        }`}
                      >
                        <span className={isActive ? 'text-primary' : 'text-current'}>
                          {item.icon}
                        </span>
                        {item.label}
                        {item.submenu && (
                          <svg className="absolute right-4 top-1/2 -translate-y-1/2 fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""/>
                          </svg>
                        )}
                      </Link>
                      
                      {item.submenu && (
                        <ul className={`mt-1 pl-[34px] ${isActive ? 'block' : 'hidden'}`}>
                          {item.submenu.map((subItem) => (
                            <li key={subItem.label}>
                              <Link
                                href={subItem.link}
                                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:text-primary ${
                                  pathname === subItem.link ? 'text-primary' : 'text-black/70 dark:text-bodydark'
                                }`}
                              >
                                {subItem.label}
                                {subItem.badge && (
                                  <span className={`absolute right-4 top-1/2 -translate-y-1/2 rounded ${
                                    subItem.badge.includes('Pro') ? 'bg-meta-3' : 'bg-primary'
                                  } px-2 py-0.5 text-xs font-medium text-white`}>
                                    {subItem.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 