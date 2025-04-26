import { Policy } from '@/features/Policies';

import { Badge } from '../Badge';
import { Checkbox } from '@/components/Checkbox';
import { Link } from 'wouter';

interface TableRowProps {
  row: Policy;
  checked?: boolean;
}

export const TableRow = ({ row, checked }: TableRowProps) => (
  <tr className="border-b">
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    <Checkbox id={row.id} checked={checked} />
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hover:underline">
        {row.customer.firstName} {row.customer.lastName}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {row.customer?.email}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {row.provider}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {row.insuranceType}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {row?.price}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <Badge status={row.status} />
    </td>
    <td className="text-xs text-gray-900 font-light px-6 py-4 flex whitespace-nowrap">
      <Link to={`/policies/${row.id}`} className="cursor-pointer flex text-sm text-gray-900 font-base mr-2 whitespace-nowrap hover:underline">
        Policy
      </Link>
      <Link to={`/customers/${row.customer.id}`} className="cursor-pointer flex text-sm text-gray-900 font-base mr-2 whitespace-nowrap hover:underline">
        Account
      </Link>
    </td>
  </tr>
);
