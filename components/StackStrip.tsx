export function StackStrip({ spanish }: { spanish: boolean }) {
  return <aside className="stack-strip" aria-label={spanish ? "Tecnologías principales" : "Core technologies"}>
    <div className="shell stack-inner">
      <span className="stack-label"><span aria-hidden="true">/</span> {spanish ? "Stack principal" : "Core stack"}</span>
      <div className="stack-items">
        <span className="stack-tech"><svg aria-hidden="true" viewBox="-12 -11 24 22" fill="none" stroke="currentColor" strokeWidth="1"><ellipse rx="11" ry="4.1"/><ellipse rx="11" ry="4.1" transform="rotate(60)"/><ellipse rx="11" ry="4.1" transform="rotate(120)"/><circle r="1.8" fill="currentColor"/></svg> React</span>
        <span className="stack-tech next-word"><b aria-hidden="true">N</b>Next.js</span>
        <span className="stack-tech"><b className="ts-symbol" aria-hidden="true">TS</b>TypeScript</span>
        <span className="stack-tech"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 3c-5 0-7 4-6 9m3.5 4.5C10 21 16 23 20 18c2-3 1-5-1-7.5M16 7c-3-2-5-2-8 .5m-2 7c-2 3-4 2-4-1.5m8 3.5c2-1 4-3 5-5"/><circle cx="6" cy="13" r="2"/><circle cx="10" cy="16" r="1.7"/><circle cx="16.5" cy="9" r="2"/></svg>Redux</span>
        <span className="stack-tech"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 2h13l-4 10-3-6-3 6L8 2ZM6 14c-.5 2-1.1 3.4-3 4 1 4 4.5 4 7 2l7-5"/><circle cx="5" cy="12" r="2.3"/><circle cx="11" cy="13" r="2.3"/><circle cx="18" cy="13" r="2.3"/></svg>Jest</span>
      </div>
    </div>
  </aside>;
}
