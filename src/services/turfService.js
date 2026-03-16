import turfs from "../data/turfs";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function getTurfs(query = "") {
  await delay();
  if (!query.trim()) return turfs;
  const q = query.toLowerCase();
  return turfs.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.sports.some((s) => s.toLowerCase().includes(q))
  );
}

export async function getTurfById(id) {
  await delay();
  return turfs.find((t) => t.id === Number(id)) || null;
}