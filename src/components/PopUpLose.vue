<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-box">
      <img
        src="/images/eLapiz.png"
        alt="icono popup"
        class="popup-icono"
      />

      <h2 class="titulo-popup">
        ¡UPS, CASI LO LOGRÁS!
      </h2>

      <div class="contenido-popup">        
        <div>
          <p>El libro estaba en otra bolsa...<br>Pero no te rindás, ¡podés intentarlo de nuevo!</p>
        </div>
      </div>

      <div class="botones-popup">
        <button class="boton-iniciar" @click="iniciar">Reiniciar</button>
        <button class="boton-salir" @click="cerrar">Salir</button>
      </div>
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
  color: #A7412E;
  font-weight: 900; 
  line-height: 1.2;
  margin-bottom: 2vh;
  text-transform: uppercase;
  text-shadow:
    0.5px 0 #A7412E,
    -0.5px 0 #A7412E,
    0 0.5px #A7412E,
    0 -0.5px #A7412E;
}

.titulo-popup {
  font-size: 2.8vh; /* más pequeño */
  color: #A7412E;
  margin-bottom: 2vh;
  text-transform: uppercase;
  font-family: 'GothamBold', sans-serif;
}

.subtitulo {
  font-weight: bold;
  font-size: 1.8vh; /* más pequeño */
  margin-bottom: 1vh;
  text-align: left;
}

.contenido-popup {
  font-size: 1.6vh; /* más pequeño */
  color: #000;
  text-align: left;
  margin-bottom: 2vh;
}

.contenido-popup ol {
  padding-left: 1.4em;
  margin: 1vh 0;
}

.botones-popup {
  display: flex;
  gap: 1vh;
  justify-content: center;
  margin-top: 3vh;
}

.botones-popup button {
  width: 45%;
}

.boton-iniciar,
.boton-salir {
  flex: 1;  
  border: none;
  padding: 1.4vh 2.8vh;
  border-radius: 1vh;
  font-size: 2vh;
  cursor: pointer;
  transition: background 0.2s ease;
  font-family: 'GothamBold', sans-serif;
  color: #0c2a4b;
}

.boton-iniciar {
  background-color: #FFAC28;  
}

.boton-salir {
  background-color: #65a7db;
}

.popup-icono {
  object-fit: contain;
  margin: 0 auto 0.5svh;
  display: block;
  animation: sacudidaError 0.4s ease-in-out 1, flameLoop 1.6s ease-in-out infinite;
}

@keyframes sacudidaError {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

@keyframes flameLoop {
  0% { transform: scale(1) translateY(0); opacity: 1; }
  50% { transform: scale(1.05) translateY(-2px); opacity: 0.9; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

.contenido-popup {
  font-size: 1.6vh;
  color: #0c2a4b;
  text-align: center; /* ← centramos los párrafos */
  margin-bottom: 2vh;
  margin-top: 4vh;  
}

</style>