<template>
  <div class="mini-card">
    <ul>
      <li>
        <p>{{details.address + ' ' + details.name}}</p>
        <span>{{ getWpLabels.address }}</span>
      </li>
      <li>
        <p>{{details.PropertyName}}</p>
        <span>{{ getWpLabels.structure_name }}</span>
      </li>
      <li>
        <p>{{ details.floor }}</p>
        <span>{{ getWpLabels.property }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ApartmentMiniCard",
  props: ['details'],
  computed: {
    ...mapGetters(['getWpLabels'])
  },
}
</script>

<style scoped lang="scss">
.mini-card {
  padding: 20px;
  ul {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    li {
      text-align: right;
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