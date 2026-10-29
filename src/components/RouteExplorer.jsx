'use client';
import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import RouteMap from './RouteMap';

// Map + "find this bus between two stops": choosing stops highlights the segment on the map.
export default function RouteExplorer({ stops, points }) {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const pick = (set) => (e) => set(e.target.value === '' ? null : +e.target.value);
  const opts = stops.map((s, i) => <option key={i} value={i}>{i + 1}. {s}</option>);
  const both = a != null && b != null && a !== b;
  return (
    <div>
      <div className="filters">
        <div><label htmlFor="sa">Board at</label><select id="sa" value={a ?? ''} onChange={pick(setA)}><option value="">Choose a stop…</option>{opts}</select></div>
        <button type="button" className="btn ghost" aria-label="Swap stops" onClick={() => { setA(b); setB(a); }}><ArrowLeftRight size={16} /></button>
        <div><label htmlFor="sb">Get off at</label><select id="sb" value={b ?? ''} onChange={pick(setB)}><option value="">Choose a stop…</option>{opts}</select></div>
      </div>
      <p className="route" role="status" style={{ minHeight: '1.5em' }}>
        {both ? `${Math.abs(a - b)} stops from ${stops[a]} to ${stops[b]}` : a != null && a === b ? 'Pick two different stops.' : ''}
      </p>
      <RouteMap points={points} total={stops.length} from={a} to={b} />
    </div>
  );
}
