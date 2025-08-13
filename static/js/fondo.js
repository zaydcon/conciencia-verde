// Configuración del lienzo
const canvas = document.getElementById("fondoHojas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ajustar si cambia el tamaño de la ventana
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Clase para cada hoja
class Hoja {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamaño = 15 + Math.random() * 20; // tamaño aleatorio
        this.velocidadY = 0.5 + Math.random(); // caída suave
        this.velocidadX = Math.random() * 1 - 0.5; // leve movimiento lateral
        this.rotación = Math.random() * 360;
        this.giro = Math.random() * 0.5 - 0.25;
        this.color = `hsl(${90 + Math.random() * 60}, 60%, 40%)`; // tonos verdes
    }

    dibujar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotación * Math.PI / 180);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.tamaño / 2, this.tamaño, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    mover() {
        this.y += this.velocidadY;
        this.x += this.velocidadX;
        this.rotación += this.giro;

        // Si la hoja sale por abajo, reaparece arriba
        if (this.y > canvas.height) {
            this.y = -this.tamaño;
            this.x = Math.random() * canvas.width;
        }
    }
}

// Crear muchas hojas
const hojas = [];
for (let i = 0; i < 50; i++) {
    hojas.push(new Hoja());
}

// Animar
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hojas.forEach(hoja => {
        hoja.mover();
        hoja.dibujar();
    });
    requestAnimationFrame(animar);
}

animar();
