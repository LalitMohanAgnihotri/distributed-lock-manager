import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getMetrics } from "../api/metrics.api";

export default function Metrics() {
  const [data, setData] = useState({});

  const load = async () =>{
    try {
      const res = await getMetrics();
      setData(res || {});
    } catch {
      setData({});
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load,3000);
    return () => clearInterval(id);
  }, []);

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