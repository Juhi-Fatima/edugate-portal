import React, { useState } from 'react';

function App() {
  const [pin, setPin] = useState("");
  const [bgColor, setBgColor] = useState("#1a1a1a"); // Professional dark background
  const [message, setMessage] = useState("ENTER SECURITY PIN");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerify = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:5000/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enteredPin: pin })
      });
      const data = await response.json();

      if (data.status === "APPROVED") {
        setBgColor("#50C878"); // Emerald Green
        setMessage(`ACCESS GRANTED: Welcome, ${data.teacherName}!`);
      } else {
        setBgColor("#DC143C"); // Crimson Red
        setMessage("ACCESS DENIED: Invalid PIN");
        
        // Reset after 2 seconds
        setTimeout(() => {
          setBgColor("#1a1a1a");
          setMessage("ENTER SECURITY PIN");
          setPin("");
        }, 2000);
      }
    } catch (error) {
      setMessage("ERROR: Brain (Backend) Offline");
    }
    setIsProcessing(false);
  };

  return (
    <div style={{ backgroundColor: bgColor, height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', transition: '0.8s', margin: 0, position: 'fixed', top: 0, left: 0 }}>
      <h1 style={{ letterSpacing: '4px', fontSize: '3rem', marginBottom: '40px', fontFamily: 'sans-serif' }}>EDUGATE</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
        <input 
          type="password" 
          placeholder="****" 
          value={pin}
          maxLength={4}
          onChange={(e) => setPin(e.target.value)}
          style={{ padding: '15px', fontSize: '32px', textAlign: 'center', borderRadius: '10px', border: 'none', width: '180px', letterSpacing: '10px', outline: 'none' }}
        />
        <br />
        <button 
          onClick={handleVerify}
          disabled={isProcessing}
          style={{ marginTop: '30px', width: '100%', padding: '15px', fontSize: '20px', cursor: 'pointer', borderRadius: '10px', border: 'none', backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>
          {isProcessing ? "CHECKING..." : "VERIFY IDENTITY"}
        </button>
      </div>
      
      <h2 style={{ marginTop: '40px', fontWeight: '300', fontFamily: 'sans-serif' }}>{message}</h2>
    </div>
  );
}

export default App;