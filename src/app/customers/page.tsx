import CustomerCard from '@/components/ui/CustomerCard'

interface Customer {
  login: {
    uuid: string
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  email: string,
  phone: string,
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch("https://randomuser.me/api/?results=50", {
      cache: 'no-store' 
  }) // no cache for SSR, always fetch fresh data

  const data = await res.json();

  return data.results;
}

export default async function CustomersPage() {
  const customers = await fetchCustomers();

  return (
    <CustomerCard customers={customers} />
  );
}
