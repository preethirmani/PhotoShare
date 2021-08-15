import React from 'react';

export default function Footer() {
  return(
     <footer className="mt-5 p-4 text-center footer">
        Copyright &copy; {new Date().getFullYear()} Photoshare
      </footer>
  );
}
