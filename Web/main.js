document.addEventListener('DOMContentLoaded', () => {
    // --- Canvas Particles Animation ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let particleCount = 100;
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Adjust particle count based on screen size
        particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        initParticles();
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Particles move upwards (like vapor)
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = Math.random() * -1 - 0.2;
            this.size = Math.random() * 2 + 0.5;
            this.baseAlpha = Math.random() * 0.5 + 0.1;
            this.alpha = this.baseAlpha;
            this.life = Math.random() * 100;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Fading effect
            this.life += 0.01;
            this.alpha = this.baseAlpha + Math.sin(this.life) * 0.2;
            
            // Reset particle if it goes out of bounds
            if (this.y < -10) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
            }
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 192, 255, ${this.alpha})`;
            ctx.fill();
            
            // Add a slight glow to larger particles
            if (this.size > 1.5) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00F2FE';
            } else {
                ctx.shadowBlur = 0;
            }
        }
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Initialize and start animation
    resizeCanvas();
    animateParticles();
    
    // --- Mouse Parallax Effect ---
    const heroContent = document.getElementById('hero-content');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Calculate tilt
        const tiltX = (y - 0.5) * 10; // Max 10 deg tilt
        const tiltY = (0.5 - x) * 10;
        
        // Apply transform
        heroContent.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        heroContent.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
        heroContent.style.transition = 'transform 0.5s ease-out';
        
        setTimeout(() => {
            heroContent.style.transition = 'none';
        }, 500);
    });
});
