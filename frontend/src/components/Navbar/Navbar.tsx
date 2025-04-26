import { Link } from "wouter"
import logo from '@/assets/logo.jpg';

export const Navbar = ({ children }: { children?: React.ReactElement }) => (
  <div className="relative bg-white">
    <div className="w-full px-4 sm:px-6">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/">
            <img className="h-6 w-auto sm:h-16" src={logo} alt="logo" />
          </Link>
          {children}
        </div>
      </div>
    </div>
  </div>
);
