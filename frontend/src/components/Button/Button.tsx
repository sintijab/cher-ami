interface ButtonProps {
  children: string;
  variant?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const buttonsTheme = {
  light: "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 mr-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer",
};


export const Button = ({ variant = buttonsTheme.light, type, children }: ButtonProps) => {
  return <button className={variant} type={type || "button"}>{children}</button>;
};
