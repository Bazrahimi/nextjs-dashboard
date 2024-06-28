'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

// NOTE: it is good if we validate the data from form before saving it in database.
export const createInvoice = async (formData: FormData) => {
  // pass the rawFormData to CreateInvoice to validate the type
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  // once the invoices created fresh data will be fetched for the below route, 
  revalidatePath('/dashboard/invoices')

  // re-direct us back to "/dashboard/invoices"
  redirect('/dashboard/invoices')

};

// NOTE: if we are working forms that many field,I should consider using the entries() method or Object.fromEntries(); for example

// export const createInvoice = async(formData: FormData) => {
//   const rawFormData = Object.fromEntries(formData.entries());
//   console.log('raFormData', rawFormData);
// }


// Updating an invoice:
// updating invoices similar to creating invoice form, except I need to pass invoice id to update the record in the database. 
  // we can create a Dynamic route segment by wrapping a folder's name in square brackets. for example [id], [post], [slug]. in case of capturing the invoice id i need i create a dynamic route segment in invoice [id], then a new route called edit and page.tsx
//1.  create a new dynamic route segment with the invoice id. Dynamic route segment is used to capture the invoice id from the url.
//2.  Read the invoice id from the page params.
//3.  fetch the specific invoice from the database
//4.  pre-populate the form with invoice data.
//5.  update the invoice data in database.


