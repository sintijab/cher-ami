interface HeaderProps {
  children: string;
}

export const Header = ({ children }: HeaderProps) => {
  return <h1 className="text-3xl font-bold text-gray-900 mb-2">{children}</h1>;
};

export const HeaderH3 = ({ children }: HeaderProps) => {
  return <h3 className="text-2xl font-bold text-gray-900 mb-2">{children}</h3>;
};


export const HeaderH4 = ({ children }: HeaderProps) => {
  return <h4 className="text-l font-bold text-gray-900 mb-2 mt-4">{children}</h4>;
};