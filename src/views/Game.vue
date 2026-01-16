<template>
  <div>
    <component :is="componenteJuego" />
  </div>
</template>

<script>
import JuegoTresCajas from '../components/Boxes.vue'

export default {
  name: 'Juego',
  components: {
    JuegoTresCajas
  },
  computed: {
    componenteJuego() {
      const juego = this.$route.params.juego
      if (juego === 'tres-cajas') return 'JuegoTresCajas'
      return null
    }
  }
}
</script>
