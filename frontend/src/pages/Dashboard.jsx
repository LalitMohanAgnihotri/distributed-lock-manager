import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getMetrics } from "../api/metrics.api";

export default function Dashboard() {
  const [data, setData] = useState({
    activeLocks: 0,
    conflicts: 0,
    acquireRequests: 0,
    uptimeSec: 0,
  });

  const load = async () => {
    try {
      const res = await getMetrics();
      setData({
        activeLocks: res?.activeLocks ?? 0,
        conflicts: res?.conflicts ?? 0,
        acquireRequests: res?.acquireRequests ?? 0,
        uptimeSec: res?.uptimeSec ?? 0,
      });
    } catch {}
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 3000);
    return () => clearInterval(id);
  }, []);

  const cards = [
    ["Active Locks", data.activeLocks],
    ["Conflicts", data.conflicts],
    ["Requests", data.acquireRequests],
    ["Uptime", data.uptimeSec],
  ];

  return (
    <div>
      <div className="page-title">Dashboard</div>
      <div className="grid">
        {cards.map(([title, value]) => (
          <Card key={title} title={title}>
            <h2>{value}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
