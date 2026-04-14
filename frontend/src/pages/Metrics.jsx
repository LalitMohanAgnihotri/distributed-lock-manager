import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getMetrics } from "../api/metrics.api";

export default function Metrics() {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await getMetrics();
    setData(res);
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 3000);
    return () => clearInterval(id);
  }, []);

  if (!data) return <div className="page-title">Loading...</div>;

  return (
    <div>
      <div className="page-title">Metrics</div>

      <div className="grid">
        {Object.entries(data).map(([key, value]) => (
          <Card key={key} title={key}>
            <h3>{String(value)}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
}