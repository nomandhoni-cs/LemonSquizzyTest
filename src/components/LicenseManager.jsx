// src/components/LicenseManager.jsx
import React, { useState } from "react";
import { licenseApi } from "../utils/licenseApi";

export default function LicenseManager() {
  const [licenseKey, setLicenseKey] = useState("");
  const [instanceName, setInstanceName] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleActivate = async (e) => {
    e.preventDefault();
    try {
      const result = await licenseApi.activate(licenseKey, instanceName);
      setResponse(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleActivate}>
        <div className="space-y-4">
          <input
            type="text"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            placeholder="License Key"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={instanceName}
            onChange={(e) => setInstanceName(e.target.value)}
            placeholder="Instance Name"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Activate License
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {response && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
