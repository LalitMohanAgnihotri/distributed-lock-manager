import { useEffect, useState } from "react";
import { getLocks, releaseLock } from "../api/locks.api";
import Table from "../components/Table";

export default function Locks() {
  const [locks, setLocks] = useState([]);

  const load = async () => {
    try {
      const res = await getLocks();

      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.locks)
          ? res.locks
          : [];

      setLocks(list);
    } catch {
      setLocks([]);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 3000);
    return () => clearInterval(id);
  }, []);

  const handleRelease = async (resource, owner) => {
    await releaseLock(resource, owner);
    load();
  };

  const rows = locks.map((l) => [
    l.resource ?? "-",
    l.owner ?? "-",
    l.waiting?.length ? l.waiting.join(", ") : "-",
    l.expiresAt ? new Date(l.expiresAt).toLocaleTimeString() : "-",
    <button onClick={() => handleRelease(l.resource, l.owner)}>Release</button>,
  ]);

  return (
    <div>
      <div className="page-title">Locks</div>

      {locks.length ? (
        <Table
          columns={["Resource", "Owner", "Waiting", "Expires", "Action"]}
          rows={rows}
        />
      ) : (
        <div className="card">No active locks</div>
      )}
    </div>
  );
}
