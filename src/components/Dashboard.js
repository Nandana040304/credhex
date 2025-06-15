import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Dashboard({ user }) {
  const [certs, setCerts] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .storage
      .from('certificates')
      .list(user.id + '/', { limit: 100 })

    if (!error) setCerts(data)
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const filePath = `${user.id}/${Date.now()}-${file.name}`
    setUploading(true)

    const { error } = await supabase
      .storage
      .from('certificates')
      .upload(filePath, file)

    setUploading(false)
    if (!error) fetchCertificates()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <div className="dashboard">
      <h2>Welcome to CredHex</h2>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {uploading && <p>Uploading...</p>}

      <h3>Your Certificates:</h3>
      <ul>
        {certs.map(file => (
          <li key={file.name}>
            <a href={supabase.storage.from('certificates').getPublicUrl(`${user.id}/${file.name}`).data.publicUrl} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>

      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  )
}
