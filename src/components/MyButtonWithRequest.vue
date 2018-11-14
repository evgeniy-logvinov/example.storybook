<template>
  <div>
    {{resp}}
    <button class="button is-primary" @click="onClick">
      <slot></slot>
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'my-button-with-request',

  data() {
    return {
      resp: 'empty',
    };
  },

  methods: {
    async onClick() {
      this.resp = await axios.get('https://swapi.co/api/planets/1');
      this.$emit('click');
    },
  },
};
</script>

<style>
button {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15pt;
  padding: 3px 10px;
  margin: 10px;
}
</style>
