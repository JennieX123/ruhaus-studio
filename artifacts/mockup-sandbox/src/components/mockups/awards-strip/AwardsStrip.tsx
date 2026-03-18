export default function AwardsStrip() {
  const awards = [
    {
      name: "Red Dot",
      svg: (
        <svg viewBox="0 0 80 40" width="80" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="20" r="10" fill="#1a1a1a" />
          <text x="40" y="37" textAnchor="middle" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="7" fontWeight="700" fill="#1a1a1a" letterSpacing="0.5">RED DOT</text>
        </svg>
      ),
    },
    {
      name: "iF Design",
      svg: (
        <svg viewBox="0 0 80 40" width="80" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="6" width="36" height="28" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
          <text x="40" y="26" textAnchor="middle" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#1a1a1a" letterSpacing="1">iF</text>
        </svg>
      ),
    },
    {
      name: "Indigo Awards",
      svg: (
        <svg viewBox="0 0 90 40" width="90" height="40" xmlns="http://www.w3.org/2000/svg">
          <polygon points="45,4 52,16 65,16 55,24 59,36 45,28 31,36 35,24 25,16 38,16" fill="#1a1a1a" />
          <text x="45" y="37" textAnchor="middle" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="5.5" fontWeight="700" fill="#1a1a1a" letterSpacing="1">INDIGO</text>
        </svg>
      ),
    },
    {
      name: "IDEA",
      svg: (
        <svg viewBox="0 0 80 40" width="80" height="40" xmlns="http://www.w3.org/2000/svg">
          <text x="40" y="24" textAnchor="middle" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="20" fontWeight="900" fill="#1a1a1a" letterSpacing="2">IDEA</text>
          <text x="40" y="36" textAnchor="middle" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="5" fontWeight="500" fill="#555" letterSpacing="0.8">DESIGN EXCELLENCE</text>
        </svg>
      ),
    },
    {
      name: "Muse Design",
      svg: (
        <svg viewBox="0 0 90 40" width="90" height="40" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,30 L20,12 L35,22 L45,10 L55,22 L70,12 L70,30" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          <text x="45" y="38" textAnchor="middle" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="5.5" fontWeight="700" fill="#1a1a1a" letterSpacing="1.5">MUSE DESIGN</text>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
      {/* Context label */}
      <p style={{ fontSize: "11px", letterSpacing: "2px", color: "#aaa", fontWeight: 600, marginBottom: "32px", textTransform: "uppercase" }}>As featured / recognized by</p>

      {/* Awards row */}
      <div style={{ display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap", justifyContent: "center", opacity: 0.55, filter: "grayscale(1)" }}>
        {awards.map((award) => (
          <div key={award.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", transition: "opacity 0.3s" }}>
            {award.svg}
          </div>
        ))}
      </div>

      {/* Divider line style */}
      <div style={{ marginTop: "60px", width: "100%", maxWidth: "700px", borderTop: "1px solid #eee", paddingTop: "40px" }}>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#bbb", letterSpacing: "1px" }}>Preview — below homepage description</p>
      </div>
    </div>
  );
}
