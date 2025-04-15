import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="sticky bottom-0 flex flex-col items-center justify-between px-6 py-4 bg-white dark:bg-boxdark-2 md:flex-row">
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 md:mb-0">
        © {new Date().getFullYear()} PlutusMind. Todos os direitos reservados.
      </p>
      
      <div className="flex items-center space-x-4">
        <Link 
          href="/termos"
          className="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
        >
          Termos de Uso
        </Link>
        <Link 
          href="/privacidade"
          className="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
        >
          Política de Privacidade
        </Link>
        <Link 
          href="/suporte"
          className="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
        >
          Suporte
        </Link>
      </div>
    </footer>
  );
};

export default Footer; 