import { useEffect, useState } from 'react'

const GithubOAuthPage = () => {
  const [code, setCode] = useState<string>()
  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes('?code=')

    if (hasCode) {
      setCode(url.split('?code=')[1])

      // todo

      // request code to backend
    }
  }, [])
  return <div>Github auth success will, code {code}</div>
}

export default GithubOAuthPage
