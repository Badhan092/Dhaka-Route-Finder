// /search is an alias of /routes. Keep old links working.
export async function getServerSideProps({ query }) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    (Array.isArray(v) ? v : [v]).forEach((x) => params.append(k, x));
  }
  const qs = params.toString();
  return { redirect: { destination: qs ? `/routes?${qs}` : "/routes", permanent: false } };
}

export default function SearchRedirect() {
  return null;
}
