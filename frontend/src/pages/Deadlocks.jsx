import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getDeadlocks, resolveDeadlock } from "../api/deadlock.api";

export default function Deadlocks() {
  const [data, setData] = useState({
    deadlock: false,
    graph: {},
  });

  const [victim, setVictim] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const res = await getDeadlocks();
      setData({
        deadlock: res?.deadlock ?? false,
        graph: res?.graph ?? {},
      });
    } catch {}
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 4000);
    return () => clearInterval(id);
  }, []);

  const fix = async () => {
    if (!victim.trim()) return;

    await resolveDeadlock(victim);
    setMsg("Resolution attempted");
    setVictim("");
    load();

    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div>
      <div className="page-title">Deadlocks</div>

      <Card title="System Status">
        <p className={data.deadlock ? "danger" : "success"}>
          {data.deadlock ? "Deadlock Detected" : "No Deadlock"}
        </p>

        <pre>{JSON.stringify(data.graph, null, 2)}</pre>

        <input
          placeholder="Enter victim owner"
          value={victim}
          onChange={(e) => setVictim(e.target.value)}
        />

        <div style={{ marginTop: "12px" }}>
          <button onClick={fix}>Resolve Deadlock</button>
        </div>

        {msg && (
          <div className="success" style={{ marginTop: "12px" }}>
            {msg}
          </div>
        )}
      </Card>
    </div>
  );
}
