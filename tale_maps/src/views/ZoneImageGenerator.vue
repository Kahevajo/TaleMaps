<template>
  <div>
    <h2 id="zoneTitle">Zone Image Generator</h2>
    <h3>Settings</h3>
    <div>
      <router-link to="/zoneCanvas">
        <button @click="$store.state.zoneMode = 'points'" v-bind:class="{selectedButton: mode === 'points'}">Points</button>
      </router-link>
      <router-link to="/zoneCanvas">
        <button @click="$store.state.zoneMode  = 'lines'" v-bind:class="{selectedButton: mode === 'lines'}">Lines</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import VueRouter from 'vue-router'

export default {
  data: function() {
    return {
      mode: null,
    }
  },
  methods: {
    init() {
      console.log("init")
      const myCanvas = document.getElementById("zoneCanvas")
      const context = myCanvas.getContext('2d')
      const img = new Image();
        img.src = kalimdor;
        img.onload = () => {
          context.drawImage(img, 0, 0);
          this.loading = false;
          console.log("init loaded")
      };
    }
  },
  mounted() {
    
  },
}
</script>

<style lang="scss" scoped>
#zoneTitle {
  margin: 0 auto;
}

.selectedButton {
  background-color: white;
  border: 5px solid white;
}

</style>>