import { resolve } from 'path'
import React from 'react'

const CustomerPages = async() => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return (
    <div>
      Customer page
    </div>
  )
}

export default CustomerPages
