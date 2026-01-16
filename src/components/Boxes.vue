<template>
  <div class="game-container">
    <div class="title">ENCONTRÁ <br>EL LIBRO</div>

    <div class="cups">
    <div
  v-for="(content, index) in contents"
  :key="index"
  class="cup"
  :ref="el => cupRefs[index] = el"
  @click="handleGuess(index)"
>
  <div
    class="ball"
    v-if="revealAtStart || showObjects"
    :ref="el => { objectRefs[index] = el }"
    :style="{
      backgroundImage: `url('${getImagenCarta(content === 'libro' ? 'libro.png' : 'backSchool.png')}')`
    }"
  ></div>
</div>

    </div>

    <div class="acciones">
      <button @click="home" class="boton-icono boton-home">
        <img src="/icons/casa.png" alt="Inicio" />
      </button>
      <button @click="mostrarInstrucciones('tres-cajas')" class="boton-icono boton-info">
        <img src="/icons/info.png" alt="Información" />
      </button>
    </div>

    <PopUpInstrucciones 
      juego="tres-cajas" 
      :visible="mostrarPopup" 
      @cerrar="cerrarInstrucciones"
      @iniciar="restartGame" />

    <transition name="fade-scale">
      <PopUpGanaste
        juego="tres-cajas" 
        :visible="result !== null ? result : false" 
        @iniciar="salir"
      />
    </transition>

    <transition name="fade-scale">
      <PopUpPerdiste
        juego="tres-cajas"
        :visible="result !== null ? !result : false" 
        @cerrar="salir"
        @iniciar="restartGame"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useRouter } from 'vue-router'

import PopUpInstrucciones from '../components/Instructions.vue'
import PopUpGanaste from '../components/PopUpWin.vue'
import PopUpPerdiste from '../components/PopUpLose.vue'

const cupRefs = ref([])
const objectRefs = ref([null, null, null])
const contents = ref(shuffleContent())
const logicalContents = ref([0, 1, 2])
const showObjects = ref(false)
const isShuffling = ref(false)
const result = ref(null)
const mostrarPopup = ref(false)
const revealAtStart = ref(true)
const positions = ['20%', '50%', '80%']
const cupZIndexes = ref([1, 2, 3])
const router = useRouter()
const cupOrder = ref([0, 1, 2])
const isIntroAnimation = ref(true)

function getImagenCarta(valor) {
  return `${import.meta.env.BASE_URL}images/${valor}`
}

function shuffleContent() {
  const arr = ['libro', 'backSchool', 'backSchool']
  return arr.sort(() => Math.random() - 0.5)
}

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    gsap.set(cupRefs.value[i], {
      left: positions[i],
      y: -40,
    })
  }

  setTimeout(() => {
    animateObjectsIntoCups()
    setTimeout(() => {
      shuffleCups()
    }, 1000)
  }, 1500)
})

function animateObjectsOutOfCups() {
  contents.value.forEach((_, i) => {
    const el = objectRefs.value[i]
    if (!el) return

    // Empezar desde posición "dentro de la taza"
    gsap.set(el, { y: 50, scale: 0.8, opacity: 0 })

    // Animar para que "salgan"
    gsap.to(el, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut'
    })
  })
}

function animateObjectsIntoCups() {
  isIntroAnimation.value = true
  contents.value.forEach((_, i) => {
    const el = objectRefs.value[i]
    if (!el) return

    gsap.to(el, {
      y: 50,
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        if (i === contents.value.length - 1) {
          revealAtStart.value = false
          showObjects.value = false
          contents.value.forEach((_, j) => {
            const elReset = objectRefs.value[j]
            if (elReset) gsap.set(elReset, { y: 0, scale: 1, opacity: 1 })
          })
        }
      }
    })
  })
}

function liftAll(up = true) {
  cupRefs.value.forEach(cup => {
    gsap.to(cup, {
      y: up ? -40 : 0,
      duration: 0.4,
      ease: 'power2.out'
    })
  })
}

function shuffleCups() {
  isShuffling.value = true
  let swaps = 10
  let count = 0

  const doShuffle = () => {
    let i = Math.floor(Math.random() * 3)
    let j
    do {
      j = Math.floor(Math.random() * 3)
    } while (j === i)

    // Intercambiar posiciones en cupOrder (visual)
    const temp = cupOrder.value[i]
    cupOrder.value[i] = cupOrder.value[j]
    cupOrder.value[j] = temp

    // Intercambiar contenido lógico en logicalContents usando las posiciones i y j
    const tmpLogic = logicalContents.value[i]
    logicalContents.value[i] = logicalContents.value[j]
    logicalContents.value[j] = tmpLogic

    // Ajustar z-index para animación estética (opcional)
    cupRefs.value[cupOrder.value[i]].style.zIndex = 10
    cupRefs.value[cupOrder.value[j]].style.zIndex = 9

    const tl = gsap.timeline({
      onComplete: () => {
        cupRefs.value[cupOrder.value[i]].style.zIndex = 1
        cupRefs.value[cupOrder.value[j]].style.zIndex = 1
      }
    })

    // Animar cada taza hacia su nueva posición
    for (let k = 0; k < 3; k++) {
      tl.to(cupRefs.value[cupOrder.value[k]], {
        left: positions[k],
        duration: 0.25,
        ease: 'power2.inOut'
      }, '<')
    }

    count++
    if (count < swaps) {
      setTimeout(doShuffle, 600)
    } else {
      setTimeout(() => {
        isShuffling.value = false
        isIntroAnimation.value = false
      }, 600)
    }
  }

  doShuffle()
}


function handleGuess(index) {
  if (isIntroAnimation.value || isShuffling.value || showObjects.value) return

  liftAll(true)
  gsap.to(cupRefs.value[index], {
    y: -40,
    duration: 0.3,
    ease: 'power1.out',
    onComplete: async () => {
      showObjects.value = true

      await nextTick()

      animateObjectsOutOfCups()

      setTimeout(() => {
        result.value = contents.value[index] === 'libro'
      }, 1000)
    }
  })
}


function restartGame() {
  mostrarPopup.value = false
  showObjects.value = false
  result.value = null
  isShuffling.value = false
   isIntroAnimation.value = true
  revealAtStart.value = true
  contents.value = shuffleContent()
  logicalContents.value = [0, 1, 2]
  cupOrder.value = [0, 1, 2]
  cupZIndexes.value = [1, 2, 3]

  for (let i = 0; i < 3; i++) {
    gsap.set(cupRefs.value[i], {
      left: positions[i],
      y: -40,
    })
  }

  setTimeout(() => {
    animateObjectsIntoCups()
    setTimeout(() => {
      shuffleCups()
    }, 1000)
  }, 1500)
}

function mostrarInstrucciones() {
  mostrarPopup.value = true
}

function cerrarInstrucciones() {
  mostrarPopup.value = false
  restartGame()
}

function salir() {
  result.value = null
  router.push('/')
}

function home() {
  router.push('/')
}
</script>

<style scoped>
.game-container {
  width: 100vw;
  height: 100vh;
  background-image: url('/images/fondo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.title {
  font-size: 6vh;
  color: white;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin-top: 8vh;
  margin-left: 3vw;
  font-family: 'GothamBlack', sans-serif;
}

.cups {
  position: relative;
  width: 100%;
  height: 5vh;
  margin-top: 8vh;
}

.cup {
  width: 15vh;
  height: 15vh;
  background-image: url('/images/bolsas.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transform: translateX(-50%);
}

.ball {
  position: absolute;
  bottom: 15vh;
  left: 50%;
  transform: translateX(-50%);
  width: 10vh;
  height: 10vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.acciones {
  display: flex;
  justify-content: space-between;
  width: 70vw;
  margin: 3vh auto 5.5vh;
}

.boton-icono {
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 8vh;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.boton-icono:hover {
  transform: scale(1.1);
}

.boton-icono img {
  width: 4vh;
  height: 4vh;
  object-fit: contain;
}

.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.3s ease;
}

.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
}

.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
}
</style>
