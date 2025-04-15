import React from 'react';

const Footer = () => {
  return (
    <footer className="sticky bottom-0 flex h-16 items-center justify-between border-t border-stroke bg-white px-8 dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center gap-3">
        <p className="text-sm text-gray-500">
          &copy; 2024 PlutusMind. Todos os direitos reservados.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="text-sm text-gray-500 hover:text-primary"
        >
          Termos de Uso
        </a>
        <a
          href="#"
          className="text-sm text-gray-500 hover:text-primary"
        >
          Política de Privacidade
        </a>
        <a
          href="#"
          className="text-sm text-gray-500 hover:text-primary"
        >
          Suporte
        </a>
      </div>
    </footer>
  );
};

export default Footer; 