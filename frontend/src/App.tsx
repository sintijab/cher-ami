import { Navigation } from '@/components/Navigation';
import { Navbar } from '@/components/Navbar';
import { Policies, Policy } from '@/features/Policies';

import './index.css';
import { PolicyContext, PoliciesContext } from './features/Policies/PoliciesContext';
import { useEffect, useMemo, useState } from 'react';
import { Route, useRoute } from 'wouter';
import { PolicyDetails } from './features/PolicyDetails/PolicyDetails';
import { CustomerDetails } from './features/PolicyDetails/CustomerDetails';

const App = () => {
  const [activePolicy, setActivePolicy] = useState<Policy | null>(null)
  const [allPolicies, setPolicies] = useState<Policy[] | null>(null)
  const contextPolicyDetails = useMemo(() => (activePolicy), [activePolicy]);
  const contextPolicies = useMemo(() => (allPolicies), [allPolicies]);
  const [matchPolicy, paramsPolicy] = useRoute<{ id: string }>("/policies/:id");
  const [matchCustomer, paramsCustomer] = useRoute<{ id: string }>("/customers/:id");

  useEffect(() => {
    if (matchPolicy && paramsPolicy?.id) {
      const activePolicy = allPolicies?.find((policy) => policy.id === paramsPolicy?.id) || null;
      setActivePolicy(activePolicy)
    }
  }, [paramsPolicy?.id])

  useEffect(() => {
    if (matchCustomer && paramsCustomer?.id) {
      const activePolicy = allPolicies?.find((policy) => policy.customer.id === paramsCustomer?.id) || null;
      setActivePolicy(activePolicy)
    }
  }, [paramsCustomer?.id])

  return (
    <div>
      <PolicyContext.Provider value={contextPolicyDetails}>
        <Navbar>
          <Navigation title={'Policy Center'} tabs={[{ title: 'Dashboard', link: '/'}, { title: 'Event Logs', link: '/events'}, { title: 'AI Actions', link: '/actions'}, { title: 'Settings', link: '/settings'}]} />
        </Navbar>
        <div className="w-full p-8">
        <Route path="/policies/:id" component={PolicyDetails} />
        <Route path="/customers/:id" component={CustomerDetails} />
        <Route path="/">
          <PoliciesContext.Provider value={contextPolicies}>
            <Policies storePolicies={(policy) => setPolicies(policy)} />
          </PoliciesContext.Provider>
        </Route>
        </div>
      </PolicyContext.Provider>
    </div>
  )
};

export default App;
