import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import Form from '@/app/ui/invoices/edit-form';
import React from 'react';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

const EditInvoicePage = async({params}: {params: {id: string}}) => {
  const id = params.id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])
  
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

// Read the invoice id from the page params