<template>
  <div class="mini-card">
    <ul>
      <li>
        <p>{{details.signDate}}</p>
        <span>{{ getWpLabels.signing_date }}</span>
      </li>
      <li>
        <p>{{details.estimatedDate}}</p>
        <span>{{ getWpLabels.estimated_delivery_date }}</span>
      </li>
      <li>
        <p>{{formatPrice(details.priceWithTax)}}</p>
        <span>מחיר דירה כולל מע״מ</span>
      </li>
      <li>
        <p>{{details.lotNumber}}</p>
        <span>ממגרש</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ContractMiniCard",
  props: ['details'],
  computed: {
    ...mapGetters(['getWpLabels'])
  },
  methods: {
    formatPrice(num) {
      if (num === null || num === "") {
        return '---'
      }
      const n = parseFloat(num)
      return '₪' + n.toLocaleString()
    }
  },
}
</script>

<style scoped lang="scss">
  .mini-card {
    padding: 20px;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      li {
        flex-basis: calc(50% - 10px);
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