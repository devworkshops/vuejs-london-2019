<template>
  <button
    @click="increase()"
    @contextmenu="decrease()"
    :class="{positive:counter>0,negative:counter<0}"
  >{{counter}}</button>
</template>

<script>
export default {
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        increase() {
            this.counter++
        },
        decrease() {
            this.counter--
        }
    }
}
</script>

<style>
</style>
