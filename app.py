from flask import Flask, render_template
import feedparser
import time

app = Flask(__name__)

# Variables de caché
noticias_cache = []
ultima_actualizacion = 0
TIEMPO_REFRESCO = 1800  # 30 minutos en segundos

def obtener_noticias():
    global noticias_cache, ultima_actualizacion

    # Si han pasado menos de 30 min desde la última actualización, usar caché
    if time.time() - ultima_actualizacion < TIEMPO_REFRESCO and noticias_cache:
        return noticias_cache

    print("♻ Actualizando noticias desde el RSS...")
    rss_url = "https://news.un.org/feed/subscribe/es/news/topic/climate-change/feed/rss.xml"

    try:
        feed = feedparser.parse(rss_url)
    except Exception as e:
        print(f"Error al obtener el feed: {e}")
        return noticias_cache  # Devuelve lo que tenga el caché si falla

    noticias = []
    for entrada in feed.entries[:5]:  # Solo las 5 más recientes
        noticias.append({
            "titulo": getattr(entrada, "title", "Sin título"),
            "descripcion": getattr(entrada, "summary", "Sin descripción disponible"),
            "fecha": getattr(entrada, "published", "Fecha no disponible"),
            "link": getattr(entrada, "link", "#")
        })

    # Actualizar caché
    noticias_cache = noticias
    ultima_actualizacion = time.time()
    return noticias

@app.route("/")
def home():
    noticias = obtener_noticias()
    return render_template("index.html", noticias=noticias)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
