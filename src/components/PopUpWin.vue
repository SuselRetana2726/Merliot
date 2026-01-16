<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-box">
      <img
        src="/images/personaje.png"
        alt="icono popup"
        class="popup-icono"
      />

      <h2 class="titulo-popup">
        ¡BUEN OJO!
      </h2>

      <div class="contenido-popup">     
        <div>
          <p>¡Lo encontraste! Elegiste la bolsa correcta y encontraste el libro ganador.</p>
        </div>
        <p class="mensaje-final">Preguntá por tu sorpresa.</p>
      </div>

      <button class="boton-iniciar" @click="iniciar">Aceptar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    juego: String,
    visible: Boolean
  },
  emits: ['iniciar'],
  methods: {
    iniciar() {
      this.$emit('iniciar');
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup-box {
  position: relative;
  background: #ffffff;
  border-radius: 2vh;
  padding: 3vh 2.5vh;
  width: 55%;
  max-width: 60vw; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.popup-box h2 {
  font-size: 4.3vh;
  color: #FFAC28;
  font-weight: 900; 
  line-height: 1.2;
  margin-bottom: 2vh;
  text-transform: uppercase;
  text-shadow:
    0.5px 0 #FFAC28,
    -0.5px 0 #FFAC28,
    0 0.5px #FFAC28,
    0 -0.5px #FFAC28;
}

.titulo-popup {
  font-size: 2.8vh; /* más pequeño */
  color: #FFAC28;
  font-weight: bold;
  margin-bottom: 2vh;
  text-transform: uppercase;
  font-family: 'GTWalsheimUltraBold', sans-serif;
}

.subtitulo {
  font-weight: bold;
  font-size: 1.8vh; /* más pequeño */
  margin-bottom: 1vh;
  text-align: left;
  color:#0c2a4b;
}

.contenido-popup {
  font-size: 1.6vh; /* más pequeño */
  color:#0c2a4b;
  text-align: left;
  margin-bottom: 2vh;
}

.contenido-popup ol {
  padding-left: 1.4em;
  margin: 1vh 0;
}

.mensaje-final {
  text-align: center;
  font-size: 1.7vh; /* más pequeño */
  margin-top: 2vh;
  font-family: 'GothamBoldItalic', sans-serif;
}

.boton-iniciar {
  background-color: #FFAC28;
  color: #0c2a4b;
  border: none;
  padding: 1.4vh 2.8vh;
  border-radius: 1vh;
  font-size: 2vh; /* más pequeño */
  font-family: 'GothamBold', sans-serif;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease;
  margin-top: 2vh;
}

.boton-iniciar:hover {
  background-color: #FFAC28;
}

.popup-icono {
  object-fit: contain;
  margin: 0 auto 0.5svh;
  display: block;
  animation: animacionHamburguesa 1.2s infinite ease-in-out;}

@keyframes animacionHamburguesa {
  0% {
    transform: scale(1) rotate(0deg) translate(0, 0);
    filter: brightness(1);
  }
  25% {
    transform: scale(1.03) rotate(1deg) translate(-1px, 1px);
    filter: brightness(1.1);
  }
  50% {
    transform: scale(1.05) rotate(-1deg) translate(1px, -1px);
    filter: brightness(1.2);
  }
  75% {
    transform: scale(1.03) rotate(1deg) translate(-1px, 0px);
    filter: brightness(1.1);
  }
  100% {
    transform: scale(1) rotate(0deg) translate(0, 0);
    filter: brightness(1);
  }
}
.contenido-popup {
  font-size: 1.6vh;
  color: #000;
  text-align: center; /* ← centramos los párrafos */
  margin-bottom: 2vh;
  margin-top: 4vh;  
}

</style>