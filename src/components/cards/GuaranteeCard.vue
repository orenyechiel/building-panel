<template>
  <div class="card-wrap">
    <div class="guarantee-card">

      <div class="col">
        <p>{{ guarantees.numberOfGuarantee }}</p>
        <span>{{ getWpLabels.security_number_title }}</span>
      </div>

      <div class="col">
        <p>{{ guarantees.startDate }}</p>
        <span>{{ getWpLabels.start_date }}</span>
      </div>

      <div class="col">
        <p>{{ formatPrice(guarantees.amount) }}</p>
        <span>{{ getWpLabels.amount_with_tax }}</span>
      </div>

      <div class="col">
        <p>---</p>
        <span>{{ getWpLabels.index }}</span>
      </div>

    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";

export default {
  name: "GuaranteeCard",
  props: ['guarantees'],
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
  }
}
</script>


<style scoped lang="scss">

.card-wrap {
  padding: 0 10px;

  .guarantee-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(111, 101, 91, .2);

    .col {
      text-align: right;
      padding: 10px 0;
      &:first-of-type {
        padding-right: 10px;
      }
      &:last-of-type {
        padding-left: 10px;
      }
      p {
        color: #453a2d;
        font-family: Almoni-bold;
        font-size: 20px;
      }
      span {
        color: #49382a;
        font-family: Almoni-light;
        font-size: 18px;
      }
    }
  }
}
</style>