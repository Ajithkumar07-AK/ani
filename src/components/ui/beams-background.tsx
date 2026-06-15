import React, { useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

interface Beam {
  x: number;
  y: number;
  length: number;
  width: number;
  speed: number;
  angle: number; // in radians
  opacity: number;
  color: string;
  hue: number;
  pulseSpeed: number;
  pulseTimer: number;
}

export function BeamsBackground({ className, children }: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize Beams
    const beams: Beam[] = [];
    const beamCount = 14;
    const colors = [
      "rgba(0, 240, 255, ",  // Neon Cyan
      "rgba(255, 42, 116, ", // Neon Pink
      "rgba(176, 38, 255, ", // Neon Purple
      "rgba(57, 255, 20, ",  // Neon Green
    ];

    for (let i = 0; i < beamCount; i++) {
      const hueChoice = Math.floor(Math.random() * colors.length);
      beams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 150 + Math.random() * 300,
        width: 1.5 + Math.random() * 3,
        speed: 0.4 + Math.random() * 1.2,
        angle: (Math.random() * 30 - 15) * (Math.PI / 180), // slightly angled
        opacity: 0.1 + Math.random() * 0.4,
        color: colors[hueChoice],
        hue: hueChoice,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseTimer: Math.random() * Math.PI,
      });
    }

    // Animation Loop
    const render = () => {
      // Clear canvas with deep dark, slightly transparent overlay for trail effect
      ctx.fillStyle = "rgba(4, 4, 10, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Render subtle background grid to make it look technical
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render glowing base orbs for modern atmosphere
      const grad1 = ctx.createRadialGradient(
        width * 0.2, height * 0.2, 0,
        width * 0.2, height * 0.2, width * 0.4
      );
      grad1.addColorStop(0, "rgba(176, 38, 255, 0.08)");
      grad1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(width * 0.2, height * 0.2, width * 0.4, 0, Math.PI * 2);
      ctx.fill();

      const grad2 = ctx.createRadialGradient(
        width * 0.8, height * 0.7, 0,
        width * 0.8, height * 0.7, width * 0.5
      );
      grad2.addColorStop(0, "rgba(0, 240, 255, 0.06)");
      grad2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.7, width * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Update and Draw Beams
      beams.forEach((beam) => {
        beam.pulseTimer += beam.pulseSpeed;
        const currentOpacity = beam.opacity * (0.6 + Math.sin(beam.pulseTimer) * 0.4);

        // Move beam down/up along its angle
        beam.x += Math.cos(beam.angle) * beam.speed;
        beam.y += Math.sin(beam.angle) * beam.speed;

        // Reset if goes off-screen
        if (beam.y > height + 200 || beam.x > width + 200 || beam.x < -200) {
          beam.y = -200;
          beam.x = Math.random() * width;
          beam.length = 150 + Math.random() * 300;
          beam.speed = 0.4 + Math.random() * 1.2;
        }

        // Draw Glow of the beam
        ctx.shadowColor = beam.hue === 0 ? "#00f0ff" : beam.hue === 1 ? "#ff2a74" : beam.hue === 2 ? "#b026ff" : "#39ff14";
        ctx.shadowBlur = 12;

        const startX = beam.x;
        const startY = beam.y;
        const endX = beam.x + Math.sin(beam.angle) * beam.length;
        const endY = beam.y + Math.cos(beam.angle) * beam.length;

        // Gradient for individual beam
        const beamGrad = ctx.createLinearGradient(startX, startY, endX, endY);
        beamGrad.addColorStop(0, `${beam.color}0)`);
        beamGrad.addColorStop(0.3, `${beam.color}${currentOpacity})`);
        beamGrad.addColorStop(0.7, `${beam.color}${currentOpacity})`);
        beamGrad.addColorStop(1, `${beam.color}0)`);

        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = beam.width;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Reset shadow for next drawings to preserve performance
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="beams-container"
      ref={containerRef}
      className={cn("relative w-full min-h-screen overflow-hidden bg-[#020617]", className)}
    >
      {/* Editorial aesthetic backline overlays */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[1px] h-[140%] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent rotate-[35deg] blur-[1px]"></div>
        <div className="absolute top-[-20%] left-[40%] w-[1px] h-[140%] bg-gradient-to-b from-transparent via-purple-500/15 to-transparent rotate-[35deg] blur-[1px]"></div>
        <div className="absolute top-[-20%] left-[70%] w-[1px] h-[140%] bg-gradient-to-b from-transparent via-blue-500/15 to-transparent rotate-[35deg] blur-[1px]"></div>
        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px]"></div>
      </div>

      <canvas
        id="beams-canvas"
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none block z-0"
      />
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
