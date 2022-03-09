<template>
  <div class="card-wrap">
    <div class="guarantee-card">

      <div class="col">
        <p>{{ changes.changesPreview.Date }}</p>
        <span>תאריך שינוי</span>
      </div>

      <div class="col">
        <p>{{ changes.changesPreview.ChangeEstimateID }}</p>
        <span>מס׳ הצעת מחיר</span>
      </div>

      <div class="col">
        <p>{{ formatPrice(changes.changesPreview.Price) }}</p>
        <span>עלות</span>
      </div>

      <div class="col">
        <p>{{ changes.changesPreview.TotalWorkingDays }}</p>
        <span>{{ getWpLabels.work_days }}</span>
        </div>

      <div class="col">
        <a href="" @click.prevent="action">
          <img :src="Arrow" alt="">
        </a>
      </div>

    </div>
  </div>
</template>


<script>
import Arrow from '@/assets/images/icons/left-arrow.svg'
import {mapGetters} from "vuex";

export default {
  name: "ResidentChangesCard",
  props: ['changes'],
  setup() {
    return {
      Arrow
    }
  },
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
    },
    action() {

    },
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
      img {
        height: 100%;
      }
    }
  }
}
</style>