import React from 'react'
import Image from 'next/image'

type CustomerCardProps = {
  customers: {
    login: { uuid: string };
    name: { first: string; last: string };
    email: string;
    location: { country: string };
    picture: { medium: string };
  }[];
}

function CustomerCard({ customers }: CustomerCardProps) {
  return (
    <div className="flex flex-col h-screen pt-25 px-5 lg:px-25">
      <h2 className="text-2xl mb-4">Clientes:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {customers.map((customer) => (
          <div
            key={customer.login.uuid} // Use uuid as key
            className="bg-background/30 backdrop-blur-3xl border border-gray-300 shadow-xl p-4 rounded-2xl flex flex-col items-center"
          >
            <Image
              src={customer.picture.medium}
              alt={`${customer.name.first} ${customer.name.last}`}
              width={80}
              height={80}
              className="rounded-full mb-4"
            />

            <div className="text-center">
              <h3 className="font-bold text-lg">
                {customer.name.first} {customer.name.last}
              </h3>
              <h4 className="text-gray-700">{customer.email}</h4>
              <h5 className="text-gray-700">{customer.location.country}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerCard