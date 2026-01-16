<template>
  <div class="home-container">
    <div class="contenido">
      <img src="/images/titulohome.png" alt="Título del juego" class="titulo-img" />
      <img src="/images/personaje.png"  class="personaje-img" />           
      <div class="botones">
        <button class="btn btn-amarillo" @click="mostrarInstrucciones('tres-cajas')">
          Encontrá el libro
        </button>
      </div>
    </div>

     <!-- IMÁGENES DECORATIVAS -->
    <img src="/images/lapiz.png"  class="lapiz-img" />
    <img src="/images/libroD.png"  class="libro-img" />
    <img src="/images/maletin.png"  class="maletin-img" />
    <img src="/images/resaltador.png"  class="resaltador-img" />

    <PopUpInstrucciones 
      :juego="juegoSeleccionado" 
      :visible="mostrarPopup" 
      @cerrar="cerrarPopup"
      @iniciar="iniciarJuego" 
    />    
  </div>  
</template>

<script>
import PopUpInstrucciones from '../components/Instructions.vue'

export default {
  components: {
    PopUpInstrucciones
  },
  data() {
    return {
      juegoSeleccionado: '',
      mostrarPopup: false
    }
  },
  methods: {
    mostrarInstrucciones(juego) {
      this.juegoSeleccionado = juego
      this.mostrarPopup = true
    },
    cerrarPopup() {
      this.mostrarPopup = false
    },
    iniciarJuego() {
      this.mostrarPopup = false
      this.$router.push(`/juego/${this.juegoSeleccionado}`)
    }
  }
}
</script>

<style scoped>
.home-container {
  background-image: url('/images/fondo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden; 
}

.contenido {
  width: 100%;
  max-width: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 50vh;
  box-sizing: border-box;
  text-align: center;
  color: white;  
}

.titulo-img {
  width: 100%;
}

.personaje-img {
  position: absolute;
  top: 20%;      /* lo sube */
  right: 8.5%;    /* lo mueve a la derecha */
}

.maletin-img {
  position: absolute;
  top: 5%;      /* lo sube */
  left: -10%;    /* lo mueve a la derecha */
}

.resaltador-img {
  position: absolute;
  top: -7%;      /* lo sube */
  right: -15%;    /* lo mueve a la derecha */
}
.lapiz-img {
  position: absolute;
  bottom: 10%;      /* lo sube */
  right: 15%;    /* lo mueve a la derecha */
}
.libro-img {
  position: absolute;
  bottom: -4%;      /* lo sube */
  left: 10%;    /* lo mueve a la derecha */
}

.botones {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Alinea al centro */
  margin-top: 10rem;
}

.btn {
  width: 100%;           /* Que no se limite al 100% del contenedor si este es pequeño */
  height: 10rem;         /* Fija la altura */
  font-size: 3rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'GothamBold', sans-serif;
}

.btn-amarillo {
  background-color: #FFAC28;
  color: #0c2a4b;
}

/* Responsivo para celulares pequeños */
@media (max-width: 480px) {
  .contenido {
    height: 50vh;
    padding: 1.5rem 1rem;
    margin-top: 0vh;
  }

  .titulo-img {
    max-width: 90%;
  }

  .texto h2 {
    font-size: 2rem;
  }

  .texto p {
    font-size: 1rem;
  }

  .botones {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center; /* Alinea al centro */
  margin-top: 5rem;
}

.btn {
  width: 100%;           /* Que no se limite al 100% del contenedor si este es pequeño */
  height: 4rem;         /* Fija la altura */
  font-size: 0.95rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0rem;
  font-weight: bold;
}

.personaje-img {
  position: absolute;
  top: 25%;      /* lo sube */
  right: 8.5%;    /* lo mueve a la derecha */
  width: 25%;
}

.maletin-img {
  position: absolute;
  top: 5%;      /* lo sube */
  left: -10%;    /* lo mueve a la derecha */
  width: 30%;
}

.resaltador-img {
  position: absolute;
  top: -7%;      /* lo sube */
  right: -15%;    /* lo mueve a la derecha */
  width: 50%;
}
.lapiz-img {
  position: absolute;
  bottom: 10%;      /* lo sube */
  right: 15%;    /* lo mueve a la derecha */
  width: 30%;
}
.libro-img {
  position: absolute;
  bottom: -4%;      /* lo sube */
  left: 10%;    /* lo mueve a la derecha */
  width: 30%;
}


}
</style>
