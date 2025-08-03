<script>
  // Optional: You can add props or logic here if needed
</script>

<style>
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e1bee7 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
  }

  .rotating-heart {
    position: relative;
    width: 120px;
    height: 120px;
    animation: rotate 3s linear infinite;
  }

  .heart {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, #e91e63, #f06292);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(233, 30, 99, 0.3);
    animation: pulse 2s ease-in-out infinite;
  }

  .heart::before {
    content: "❤️";
    font-size: 40px;
    animation: heartBeat 1.5s ease-in-out infinite;
  }

  .baby-icon {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    animation: float 2s ease-in-out infinite;
  }

  .doctor-icon {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    animation: float 2s ease-in-out infinite reverse;
  }

  .loading-text {
    margin-top: 40px;
    font-size: 24px;
    font-weight: bold;
    color: #e91e63;
    text-align: center;
    animation: fadeInOut 2s ease-in-out infinite;
  }

  .loading-dots {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 8px;
  }

  .dot {
    width: 12px;
    height: 12px;
    background: #e91e63;
    border-radius: 50%;
    animation: dotPulse 1.5s ease-in-out infinite;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  .floating-hearts {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .floating-heart {
    position: absolute;
    font-size: 20px;
    color: rgba(233, 30, 99, 0.3);
    animation: floatAround 4s linear infinite;
  }

  .floating-heart:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .floating-heart:nth-child(2) {
    top: 20%;
    right: 15%;
    animation-delay: 1s;
  }

  .floating-heart:nth-child(3) {
    bottom: 30%;
    left: 20%;
    animation-delay: 2s;
  }

  .floating-heart:nth-child(4) {
    bottom: 20%;
    right: 10%;
    animation-delay: 3s;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  @keyframes heartBeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateX(-50%) translateY(0px);
    }
    50% {
      transform: translateX(-50%) translateY(-10px);
    }
  }

  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes dotPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }

  @keyframes floatAround {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }
</style>

<div class="loader-container">
  <!-- Floating Background Hearts -->
  <div class="floating-hearts">
    <div class="floating-heart">💕</div>
    <div class="floating-heart">💖</div>
    <div class="floating-heart">💝</div>
    <div class="floating-heart">💗</div>
  </div>

  <!-- Main Rotating Heart with Icons -->
  <div class="rotating-heart">
    <div class="heart">
      <div class="baby-icon">👶</div>
      <div class="doctor-icon">👩‍⚕️</div>
    </div>
  </div>

  <!-- Loading Text -->
  <div class="loading-text">
    Loading Avi's App...
  </div>

  <!-- Loading Dots -->
  <div class="loading-dots">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>