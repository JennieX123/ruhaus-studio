export default function AwardsStrip() {
  const awards = [
    { src: "/award-reddot.png", alt: "Red Dot Design Award", h: 36 },
    { src: "/award-if.png", alt: "iF Design Award", h: 40 },
    { src: "/award-adesign.png", alt: "A' Design Award", h: 48 },
    { src: "/award-indigo.png", alt: "Indigo Design Award", h: 36 },
    { src: "/award-adc.png", alt: "ADC Award", h: 44 },
    { src: "/award-asia.png", alt: "Asia Design Prize", h: 36 },
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
                height: `${award.h}px`,
                width: "auto",
                objectFit: "contain",
                filter: "grayscale(1) brightness(0) invert(0)",
                opacity: 0.45,
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
