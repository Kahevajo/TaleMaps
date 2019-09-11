<template>
    <div>
        <h1>Your stats</h1>
        <div class="container">
            <ul style="list-style:none;">
                <li>Have {{$store.state.logs.logData.length}} log entries</li>
                <li>You have died {{$store.state.logs.logData.filter(x => x[6] == 301).length}} times</li>
                <li>Finished {{$store.state.logs.logData.filter(x => x[6] == 311).length}} quests</li>
                <li>Killed {{$store.state.logs.logData.filter(x => x[6] == 401).length}} mobs</li>
            </ul>
        </div>
        <div>
            <router-link to="/video"><button>Generate a video</button></router-link>
            <router-link to="/zones"><button>Generate zone images</button></router-link>
        </div>
    </div>
</template>

<script>
import VueRouter from 'vue-router'
export default {

}
</script>


<style lang="scss" scoped>
.container {
    background-color: gray;
    padding: 2em;

}
</style>