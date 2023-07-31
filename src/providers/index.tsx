import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/utils';

type Props = {
  children: JSX.Element;
};

const AllProviders = ({ children }: Props): JSX.Element => (
  <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
);

export default AllProviders;
