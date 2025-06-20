import React, { Suspense } from 'react'
import NewPasswordPage from './_components/confirm-component'

export default function page() {
  return (
   
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordPage/>
    </Suspense>
  )
}
