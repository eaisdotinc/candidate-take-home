"use client"

import { useState } from "react"

export default function ApiTestPage() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/chat?q=hello")
      const data = await response.json()
      setResult(JSON.stringify({ status: response.status, data }, null, 2))
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>API Test Page</h1>
      <button
        onClick={testApi}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#8e2de2",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Testing..." : "Test API"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
          }}
        >
          <h3>API Response:</h3>
          {result}
        </div>
      )}
    </div>
  )
}
