<template>
  <div class="circle-wrap">
    <div class="circle" :class="{spin: spinner}">

      <div class="inside-circle">
        <span>{{Math.floor(getPaymentsPercent) }}%</span>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PercentLoader",
  data() {
    return {
      degree: '',
      spinner: false,
    }
  },
  methods: {
    cl() {
      setTimeout(()=> {this.spinner = true}, 400)
    },
    degreeCalc() {
      this.degree = 360*this.getPaymentsPercent/100 + 'deg'
    },
  },
  watch: {
    getPaymentsPercent() {
      this.degreeCalc()
    }
  },
  computed: {
    ...mapGetters(['getPaymentsPercent'])
  },
  async created() {
    await this.degreeCalc()
    await this.cl()
  }
}
</script>

<style scoped lang="scss">
@property --degree {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.circle-wrap {
  width: 95px;
  position: relative;
  height: 95px;
  background: #e6e2e7;
  border-radius: 50%;

  .circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: --degree 1.2s ease-out;
    background: conic-gradient(#453a2d var(--degree), transparent var(--degree));

    &.spin {
      --degree: v-bind(degree);
    }
  }

  .inside-circle {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1;
    inset: 0;
    margin: auto;

    span {
      color: #453a2d;
      font-size: 26px;
      font-family: Almoni;
    }
  }
}
</style>