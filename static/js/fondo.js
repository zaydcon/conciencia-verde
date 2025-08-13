const canvas = document.getElementById('fondoHojas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hojas = [];
for (let i = 0; i < 30; i++) {
    hojas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        velocidad: 1 + Math.random(),
        tamaño: 20 + Math.random() * 15,
        giro: Math.random() * 360
    });
}

function dibujarHojas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hojas.forEach(hoja => {
        ctx.save();
        ctx.translate(hoja.x, hoja.y);
        ctx.rotate(hoja.giro * Math.PI / 180);
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.ellipse(0, 0, hoja.tamaño, hoja.tamaño / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        hoja.y += hoja.velocidad;
        hoja.giro += 1;
        if (hoja.y > canvas.height) {
            hoja.y = -20;
            hoja.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(dibujarHojas);
}

dibujarHojas();
