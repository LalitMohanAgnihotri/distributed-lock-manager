import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getPolicy, savePolicy } from "../api/policies.api";

export default function Policies() {
  const [form, setForm] = useState({
    ttlSeconds: 30,
    retryCount: 3,
    deadlockStrategy: "manual",
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getPolicy();

      setForm({
        ttlSeconds: data?.ttlSeconds ?? 30,
        retryCount: data?.retryCount ?? 3,
        deadlockStrategy: data?.deadlockStrategy ?? "manual",
      });
    } catch (err) {
      console.error("Failed to load policy", err);
    }
  };

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = async () => {
    try {
      const saved = await savePolicy({
        ttlSeconds: Number(form.ttlSeconds),
        retryCount: Number(form.retryCount),
        deadlockStrategy: form.deadlockStrategy,
      });

      setForm({
        ttlSeconds: saved.ttlSeconds,
        retryCount: saved.retryCount,
        deadlockStrategy: saved.deadlockStrategy,
      });

      setMsg("Policy saved successfully");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      console.error("Save failed", err);
      setMsg("Failed to save policy");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  return (
    <div>
      <div className="page-title">Policies</div>

      <Card>
        <div className="form-grid">
          <label>
            TTL Seconds
            <input
              type="number"
              min="1"
              value={form.ttlSeconds}
              onChange={(e) => update("ttlSeconds", e.target.value)}
            />
          </label>

          <label>
            Retry Count
            <input
              type="number"
              min="0"
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