import { useContext, useEffect, useState } from 'react';

import { Policy } from './Policies.model';
import { Table } from '@/components/Table';
import { Button } from '@/components/Button/Button';
import { HeaderH4 } from '@/components/Header/Header';
import { Search } from '@/components/Search/Search';
import { Chip } from '@/components/Chip/Chip';
import { PoliciesContext } from './PoliciesContext';
import { fetchData } from '../HttpClient/Requests';
import { Link } from 'wouter';

export const Policies = ({ storePolicies }: { storePolicies?: (data: Policy[]) => void }) => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[] | null>([]);
  const storedPolicies = useContext(PoliciesContext);

  const fetchPolicies = async () => {
    const data = await fetchData('https://cher-ami.onrender.com/policies');
    setPolicies(data);
    storePolicies?.(data);
  };
  

  useEffect(() => {
    if (!storedPolicies) {

      fetchPolicies();

      // Component clean-up
      return () => {
        setPolicies([]);
        setError('');
      };
    }
  }, []);


  if (!error && !policies) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  return (
    <div className="max-w-screen-xl m-auto">
      <Search categories={['All categories', 'Name', 'Email', 'Provider', 'Type', 'Price', 'Status']} />
      <div className="flex mt-1 ml-8">
        <a href="http://localhost:3000" target="_blank"><Chip>Active multi-policy holders</Chip></a>
        <Chip>Active single-policy holders</Chip>
        <Chip>Issued more than 2 weeks ago and not active</Chip>
        <Chip>Cancellations older than a year</Chip>
        <Chip>Low insurance risk groups</Chip>

      </div>
      <HeaderH4>Select policies for bulk actions</HeaderH4>
      <Button>Bulk upload</Button>
      <Button>Bulk edit</Button>
      <Button>Bulk delete</Button>
      <Table policies={policies?.length ? policies : storedPolicies} />
    </div>
  );
};
