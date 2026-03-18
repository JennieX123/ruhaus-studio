export default function AwardsStrip() {
  const awards = [
    { src: "/award-reddot.png", alt: "Red Dot Design Award" },
    { src: "/award-if.png", alt: "iF Design Award" },
    { src: "/award-adesign.png", alt: "A' Design Award" },
    { src: "/award-indigo.png", alt: "Indigo Design Award" },
    { src: "/award-adc.png", alt: "ADC Award" },
    { src: "/award-asia.png", alt: "Asia Design Prize" },
  ];

  return (
    <div style={{
      background: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "48px 60px",
      fontFamily: "Helvetica Neue, Arial, sans-serif"
    }}>
      {/* Simulated homepage context */}
      <p style={{ fontSize: "13px", color: "#888", marginBottom: "8px", maxWidth: "640px", lineHeight: 1.6 }}>
        Design, strategize, and build <u>AI-powered experiences for social impact</u>, exploring the future of human intelligence.
      </p>

      <div style={{ marginTop: "32px", marginBottom: "10px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "2px", color: "#bbb", fontWeight: 600, textTransform: "uppercase", marginBottom: "20px" }}>
          Recognition
        </p>

        {/* Award logos row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}>
          {awards.map((award) => (
            <img
              key={award.alt}
              src={award.src}
              alt={award.alt}
              style={{
                height: "40px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: "48px", borderTop: "1px solid #eee", paddingTop: "16px", width: "100%" }}>
        <p style={{ fontSize: "10px", color: "#ccc", letterSpacing: "1px" }}>Preview — awards strip below homepage description</p>
      </div>
    </div>
  );
}
