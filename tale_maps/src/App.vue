<template>
  <div id="app">
    <div v-if="!$store.state.file && !loading" v-cloak @drop.prevent="fileDropped" @dragover.prevent @click="$refs.fileInput.click()">
      <input style="display:none;" type="file" ref="fileInput" @change="fileDropped">
      <div id="dropHere"><h1>Drop your log file here or click to browse</h1></div>
    </div>
    <div v-else-if="loading && !$store.state.error && !$store.state.logs">
      <radar-spinner
        :animation-duration="2000"
        :size="60"
        color="#D3D3D3"
      />
    </div>
    <div v-else-if="$store.state.error">
      <h1>Something went wrong when reading your file, please refresh and try again</h1>
    </div>
    <router-view v-else></router-view>
    <div id="github">
      <a href="https://github.com/albinso/TaleMaps" target="_blank">Github repository</a>
    </div>
  </div>
</template>

<script>
import { RadarSpinner  } from 'epic-spinners'

export default {
  name: 'app',
  components: {
    RadarSpinner
  },
  methods: {
    fileDropped(event) {
      let droppedFiles = event.target.files || event.dataTransfer.files;
      if(!droppedFiles) return;
      this.loading = true;
      this.$store.commit("addLog", droppedFiles[0])
    }
  },
  data: function() {
    return {
      loading: false,
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#github {
  display: block;
  position: fixed;
  bottom: 1em;
  z-index: 99;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

#drophere {
  font-size: 500%;
  margin: auto;
  width: 100%;
  height: 100%;
  align-self: center;
}
</style>
