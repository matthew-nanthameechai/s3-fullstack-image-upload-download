'use client'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { StorageManager, StorageImage } from '@aws-amplify/ui-react-storage'
import { fetchAuthSession } from 'aws-amplify/auth'
import { useEffect, useState } from 'react'

function Home() {
  const [fileName, setFilename] = useState('')
  const [identityId, setIdentityId] = useState('')
  useEffect(() => {
    fetchAuthSession().then((res) => {
      console.log('user', res)
      setIdentityId(res.identityId!)
    })
  }, [])
  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="protected"
        maxFileCount={1}
        onUploadSuccess={({ key }) => {
          setFilename(key as string)
        }}
      />
      {fileName && (
        <StorageImage
          alt={fileName}
          imgKey={fileName}
          accessLevel="protected"
        />
      )}
    </>
  )
}
export default withAuthenticator(Home, { signUpAttributes: ['email'] })
