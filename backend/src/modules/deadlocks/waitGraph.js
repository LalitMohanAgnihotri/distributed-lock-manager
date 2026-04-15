export function detectCycle(graph) {
  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;
    visited.add(node);
    stack.add(node);

    for (const next of graph[node] || []) {
      if (dfs(next)) return true;
    }
        
    stack.delete(node);
    return false;
  }

  return Object.keys(graph).some(dfs);
}