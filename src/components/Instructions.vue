<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-box">
      <button class="cerrar-boton" @click="cerrar">
        <img src="/icons/cerrar.png" alt="Cerrar" />
      </button>

      <h2 class="titulo-popup">
        ENCONTRÁ EL LIBRO
      </h2>

      <div class="contenido-popup">
        <p class="subtitulo">INSTRUCCIONES</p>       
        <div>
          <p>¡Poné a prueba tu instinto y tu suerte!</p>
          <ol>
            <li>Tres bolsas...</li>
            <li>Un libro escondido...</li>
            <li>¡Elegí bien y ganá una sorpresa increible!</li>
          </ol>
        </div>
        <p class="mensaje-final">¡Si lo lográs, ganás una sorpresa increible!</p>
      </div>

      <button class="boton-iniciar" @click="iniciar">Iniciá el juego</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    juego: String,
    visible: Boolean
  },
  emits: ['cerrar', 'iniciar'],
  methods: {
    cerrar() {
      this.$emit('cerrar');
    },
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
  font-size: 3vh;
  color: #4c85bf;
  font-weight: 900; 
  line-height: 1.2;
  margin-bottom: 2vh;
  text-transform: uppercase;
  text-shadow:
    0.5px 0 #4c85bf,
    -0.5px 0 #4c85bf,
    0 0.5px #4c85bf,
    0 -0.5px #4c85bf;
}

.cerrar-boton {
  position: absolute;
  top: -1.5vh;  
  right: -1.5vh;
  background: #fff; /* fondo blanco */
  border: 2px solid #0c2a4b;
  border-radius: 50%; /* círculo */
  width: 5vh;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0 0 5px #0c2a4b;
  z-index: 10;
}

.cerrar-boton img {
  width: 2.5vh;
  height: 2.5vh;
}

.titulo-popup {
  font-size: 2.8vh; /* más pequeño */
  color: #00aaff;
  font-weight: bold;
  margin-bottom: 2vh;
  text-transform: uppercase;
  font-family: 'GothamBlack', sans-serif;
}

.subtitulo {
  font-size: 1.8vh; /* más pequeño */
  margin-bottom: 1vh;
  text-align: left;
  font-family: 'GothamBold', sans-serif;
  color: #0c2a4b;
}

.contenido-popup {
  font-size: 1.6vh; /* más pequeño */
  color: #0c2a4b;
  text-align: left;
  margin-bottom: 2vh;
}

.contenido-popup ol {
  padding-left: 1.4em;
  margin: 1vh 0;
}

.mensaje-final {
  /*font-style: italic;*/
  text-align: center;
  font-size: 1.7vh; /* más pequeño */
  margin-top: 2vh;
  color: #0c2a4b;
  font-family: 'GothamBoldItalic', sans-serif;
}

.boton-iniciar {
  background-color: #FFAC28;
  color: #0c2a4b;
  border: none;
  padding: 1.4vh 2.8vh;
  border-radius: 1vh;
  font-size: 2vh; /* más pequeño */
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease;
  font-family: 'GothamBold', sans-serif;
}
</style>
