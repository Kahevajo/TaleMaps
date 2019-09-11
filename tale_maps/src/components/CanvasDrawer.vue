<template>
  <div>
    <h2 id="zoneTitle">Zone Image Generator (Progress: {{renderIndex}} of {{$store.state.logs.logData.length}} frames)</h2>
    <canvas id="zoneCanvas" width="1002" height="668"></canvas>
  </div>
</template>

<script>
import {ids, IDSTRINGS, mapIDs} from "../utility/mappings.js"
import { RadarSpinner  } from 'epic-spinners'

export default {
  components: {

  },
  data() {
    return {
      tempMaps: {},
      context: null,
      canvas: null,
      loading: true,
      renderIndex: 0,
    }
  },
  mounted() {
    if(this.$store.state.zoneMode === null) {
      this.$router.push("/zones");
      return;
    }
    const canvas = document.getElementById("zoneCanvas")
    const context = canvas.getContext('2d')
    this.canvas = canvas
    this.context = context
    this.renderLoop()
  },
  methods: {
    async renderLoop() {
      let logs = this.$store.state.logs.logData
      for(let i = 0; i<logs.length; i++) {
        this.renderIndex = i;
        if(logs[i][3] === "-1") continue;
        this.loading = true
        await this.render(logs[i])
      }
      
    },
    render(logEntry) {
      var log = {}
      switch(logEntry[0]) {
        default:
          log = {
            version: "1.0.1",
            x: logEntry[1],
            y: logEntry[2],
            map: mapIDs[parseInt(logEntry[3])],
            ts: logEntry[4],
            lvl: logEntry[5],
            id: ids[logEntry[6]],
          }
      }
      var imgsrc = require("../assets/orgmaps/" + log.map + ".jpg")
      if(!this.tempMaps[log.map]) {
        const img = new Image();
        img.src = imgsrc;
        return new Promise((resolve, reject) => {
          img.onload = () => {
            this.context.drawImage(img, 0, 0);
            this.drawPoint(this.context, log.x, log.y)
            this.loading = false;
            this.tempMaps[log.map] = this.canvas.toDataURL("image/jpeg", 1.0)
            resolve()
          }
          img.onerror = (e) => {
            console.log(e)
            reject()
          }
        })
      } else {
        const img = new Image();
        img.src = this.tempMaps[log.map]
        return new Promise((resolve, reject) => {
          img.onload = () => {
            this.context.drawImage(img, 0, 0);
            this.drawPoint(this.context, log.x, log.y)
            this.loading = false;
            this.tempMaps[log.map] = this.canvas.toDataURL("image/jpeg", 1.0)
            resolve()
          }
          img.onerror = (e) => {
            console.log(e)
            reject()
          }
        })
      }
    },
    drawPoint(context, x, y) {
      context.fillRect(x*1002, y*668, 5, 5)
    }
  }
}
</script>

<style>
#zoneCanvas {
  border: 1px solid white;
  margin: 0 auto;
}

#zoneTitle {
  margin: 0 auto;
}
</style>