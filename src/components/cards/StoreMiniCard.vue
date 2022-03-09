<template>
  <div class="mini-card">
    <ul>
      <li>
        <p>{{ formatedData(details.PropertyName) }}</p>
        <span>{{ getWpLabels.property_name }}</span>
      </li>
      <li>
        <p>{{ formatedData(details.floor) }}</p>
        <span>{{ getWpLabels.level }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "StoreMiniCard",
  props: ['details'],
  computed: {
    ...mapGetters(['getWpLabels'])
  },
  methods: {
    formatedData(d) {
      if (d) {
        return d
      } else {
        return '---'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mini-card {
  padding: 20px;
  ul {
    display: flex;
    gap: 20px;
    li {
      text-align: right;
      flex-basis: calc(33% - 10px);
      p {
        color: #453a2d;
        font-size: 20px;
        font-family: Almoni-bold;
      }
      span {
        color: #49382a;
        font-size: 18px;
        font-family: Almoni-light;
      }
    }
  }
}
</style>