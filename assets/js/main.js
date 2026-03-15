(function() {
    'const themeKey = "theme"';
    const stored = localStorage.getItem(themeKey);
    if (stored) {
        document.documentElement.setAttribute("data-theme", stored);
    }
})();

const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
    themeToggle.addEventListener("click", function() {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    });
}

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
if (navToggle && navMenu) {
    navToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
    
    document.querySelectorAll(".nav-link").forEach(function(link) {
        link.addEventListener("click", function() {
            navMenu.classList.remove("active");
        });
    });
}

const titles = ["Creative Developer", "Full Stack Engineer", "Problem Solver", "Open Source Enthusiast"];
const typedElement = document.getElementById("typed-text");
if (typedElement) {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            delay = 50;
        } else {
            typedElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            delay = 100;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            delay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            delay = 500;
        }
        
        setTimeout(type, delay);
    }
    
    type();
}

const canvas = document.getElementById("particle-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 50;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    
    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };
    
    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
        ctx.fill();
    };
    
    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(function(p) {
            p.update();
            p.draw();
        });
        
        particles.forEach(function(p1, i) {
            particles.slice(i + 1).forEach(function(p2) {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = "rgba(99, 102, 241, " + (0.2 * (1 - dist / 150)) + ")";
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener("resize", resize);
    init();
    animate();
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".section").forEach(function(section) {
    section.classList.add("fade-in");
    observer.observe(section);
});

const style = document.createElement("style");
style.textContent = ".fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; } .fade-in.visible { opacity: 1; transform: translateY(0); }";
document.head.appendChild(style);