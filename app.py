from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    noticias = [
        {"titulo": "Nueva jornada de siembra en Antioquia", "descripcion": "Más de 500 árboles fueron plantados en la ribera del río.", "fecha": "12 Agosto 2025"},
        {"titulo": "Reciclaje comunitario en Medellín", "descripcion": "Vecinos recolectaron 2 toneladas de plástico para reciclaje.", "fecha": "10 Agosto 2025"},
        {"titulo": "Taller de compostaje", "descripcion": "Aprende a convertir tus desechos orgánicos en abono natural.", "fecha": "8 Agosto 2025"}
    ]
    return render_template("index.html", noticias=noticias)

if __name__ == "__main__":
    app.run(debug=True)
