const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

//Event Listeners
addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

addEventListener('touchmove',(e)=>{
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
})

addEventListener('touchstart',(e)=>{
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

//Object Prototype
function Particle(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
}

Particle.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
}

Particle.prototype.update = function () {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
}

//Implementation
let particles;

function init() {
    particles = [];
}

const particleCount = 50;

let speedFactor = 3;

let hue = 0;
let hueRadians = 0;

function generateRing() {
    setTimeout(generateRing, 200)
    hue = Math.sin(hueRadians);
    
    for (let i = 0; i < particleCount; i++) {
        const radian = (Math.PI * 2) / particleCount;

        const x = mouse.x;
        const y = mouse.y;

        particles.push(new Particle(x, y, 5, `hsl(${Math.abs(hue*360)},100%,50%)`,
            {
                x: Math.cos(radian * i) * speedFactor,
                y: Math.sin(radian * i) * speedFactor
            }
        ));
    }
    hueRadians += 0.01;
}

//Animation loop
function animate() {
    requestAnimationFrame(animate);

    c.fillStyle = 'rgba(0,0,0,0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {

        if (particle.x > canvas.width + particle.radius || particle.x < 0 - particle.radius || particle.y > canvas.height + particle.radius || particle.y < 0 - particle.radius) {
            particles.splice(index, 1);
        } else {
            particle.update();
        }
    });
}

init();
animate();
generateRing();
