import { useRef, useEffect, useCallback } from 'react';

export default function NeuralNetwork() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  const createParticles = useCallback((width, height) => {
    const particleCount = Math.min(120, Math.floor((width * height) / 15000));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 2,
        originalX: 0,
        originalY: 0,
      });
    }

    particles.forEach(p => {
      p.originalX = p.x;
      p.originalY = p.y;
    });

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
      ctx.fill();

      // Add glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 3
      );
      gradient.addColorStop(0, 'rgba(96, 165, 250, 0.4)');
      gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnection = (p1, p2, distance, maxDistance) => {
      const opacity = (1 - distance / maxDistance) * 0.5;
      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const maxDistance = 150;
      const mouseRadius = 200;

      particles.forEach((particle) => {
        // Mouse interaction - attract particles
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distanceToMouse < mouseRadius) {
          const force = (mouseRadius - distanceToMouse) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.1;
          particle.vy += Math.sin(angle) * force * 0.1;
        }

        // Return to original position slowly
        const returnForce = 0.02;
        particle.vx += (particle.originalX - particle.x) * returnForce;
        particle.vy += (particle.originalY - particle.y) * returnForce;

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Boundaries
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.5;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.5;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        drawParticle(particle);
      });

      // Draw connections (neural network style)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            drawConnection(particles[i], particles[j], distance, maxDistance);
          }
        }
      }

      // Connect to mouse
      particles.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const opacity = (1 - distance / mouseRadius) * 0.3;
          ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      // Draw mouse glow
      const mouseGradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 50
      );
      mouseGradient.addColorStop(0, 'rgba(147, 197, 253, 0.4)');
      mouseGradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
      ctx.fillStyle = mouseGradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
