import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getPolicy, savePolicy } from "../api/policies.api";

export default function Policies() {
  const [form, setForm] = useState({
    ttlSeconds: 30,
    retryCount: 3,
    deadlockStrategy: "manual"
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    getPolicy().then(setForm);
  }, []);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    await savePolicy({
      ttlSeconds: Number(form.ttlSeconds),
      retryCount: Number(form.retryCount),
      deadlockStrategy: form.deadlockStrategy
    });

    setMsg("Saved successfully");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div>
      <div className="page-title">Policies</div>

      <Card>
        <div className="form-grid">
          <label>
            TTL Seconds
            <input
              value={form.ttlSeconds}
              onChange={(e) => update("ttlSeconds", e.target.value)}
            />
          </label>

          <label>
            Retry Count
            <input
              value={form.retryCount}
              onChange={(e) => update("retryCount", e.target.value)}
            />
          </label>

          <label>
            Deadlock Strategy
            <select
              value={form.deadlockStrategy}
              onChange={(e) =>
                update("deadlockStrategy", e.target.value)
              }
            >
              <option value="manual">Manual</option>
              <option value="auto">Automatic</option>
            </select>
          </label>

          <button onClick={submit}>Save Policy</button>

          {msg && <div className="success">{msg}</div>}
        </div>
      </Card>
    </div>
  );
}