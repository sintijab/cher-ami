
import { createContext } from 'react';
import { Policy } from './Policies.model';

export const PolicyContext = createContext<Policy | null>(null);

export const PoliciesContext = createContext<Policy[] | null>([]);

