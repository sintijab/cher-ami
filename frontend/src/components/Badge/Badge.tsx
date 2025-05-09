import { PolicyStatus } from '@/features/Policies';

interface BadgeProps {
  status: PolicyStatus;
}

const getBadgeColors = (status: PolicyStatus) => {
  const badgeColors: {
    [k in PolicyStatus]: {
      textColor: string;
      backgroundColor: string;
    };
  } = {
    ACTIVE: { textColor: 'tc-green-100', backgroundColor: 'bg-green-100' },
    PENDING: { textColor: 'tc-yellow-600', backgroundColor: 'bg-yellow-100' },
    CANCELLED: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
    DROPPED_OUT: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
  };

  return badgeColors[status];
};

export const Badge = ({ status }: BadgeProps) => {
  const { textColor, backgroundColor } = getBadgeColors(status);
  const className = `inline-block rounded-full	py-1 px-4 font-semibold text-xs ${textColor} ${backgroundColor}`;

  return <p className={className}>{status}</p>;
};
