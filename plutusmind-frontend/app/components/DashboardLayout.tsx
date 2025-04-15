'use client';

import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './Footer';
import { Brain, BarChart2, Settings, Menu, Sun, Moon, Bell, ShoppingCart, ChartBar, LineChart, Users, Calendar, FileText, Table, Layout } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menuCategories = [
    {
      title: "MENU",
      items: [
        { icon: <BarChart2 size={20} />, label: 'Painel', active: true },
        { icon: <ShoppingCart size={20} />, label: 'Comércio' },
        { icon: <ChartBar size={20} />, label: 'Análises', badge: 'PRO' },
        { icon: <LineChart size={20} />, label: 'Marketing', badge: 'PRO' },
      ]
    },
    {
      title: "APLICAÇÕES",
      items: [
        { icon: <Users size={20} />, label: 'CRM', badge: 'PRO' },
        { icon: <Calendar size={20} />, label: 'Calendário' },
        { icon: <FileText size={20} />, label: 'Tarefas' },
      ]
    },
    {
      title: "PÁGINAS",
      items: [
        { icon: <Table size={20} />, label: 'Tabelas' },
        { icon: <Layout size={20} />, label: 'Páginas' },
      ]
    }
  ];

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="relative flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col min-h-screen overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <main className="flex-grow p-4 md:p-6 overflow-y-auto">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-6">
              <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <a href="#" className="text-gray-700 hover:text-primary dark:text-gray-300">
                      Início
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="text-gray-400 mx-2">/</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        Painel
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
} 