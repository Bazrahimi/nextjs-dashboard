import React from 'react'

const DashboardPage = () => {
  return (
    <p>
      Dashboard Page
    </p>
  )
}

export default DashboardPage

// NOTE: Next.js us file-system routing. Each folder represent a route segment that maps to a URL segment.
// app: is the Root Segemnt
// dashboard: is the segement
// invoices: is the leaf Segment

// we can create separate UIs for each routing using layout.tsx and page.tsx files.

// page.tsx is a special next.s file taht export a react component. all other files such lib and ui will be colocate inside the dashboard which will not be publicly assessable.