import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import Form from '@/app/ui/invoices/edit-form';
import React from 'react';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

const EditInvoicePage = async({params}: {params: {id: string}}) => {
  const id = params.id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs 
      breadcrumbs={[
        {label: 'Invoice', href: '/dashboard/invoices'},
        {
          label: 'Edit Invoice',
          href: `/dashboard/invoices/${id}/edit`,
          active: true,
        }
      ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}

export default EditInvoicePage

// Rendering 404 in case of no resources are found 
