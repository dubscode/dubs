import { clsx } from 'clsx';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
}: ButtonProps) => {
  const mode = primary
    ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
  let btnSize = 'rounded px-2.5 py-1.5 text-xs';
  if (size === 'medium') {
    btnSize = 'rounded-md px-3 py-2 text-sm';
  }
  if (size === 'large') {
    btnSize = 'rounded-md px-4 py-2 text-base';
  }
  return (
    <button
      type="button"
      className={clsx(
        mode,
        btnSize,
        'inline-flex items-center border border-transparent font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
      )}
    >
      {label}
    </button>
  );
};
