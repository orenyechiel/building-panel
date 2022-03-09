<template>
  <div class="table-background" @click="$emit('closeModal')">

    <div class="table-wrap" @click.stop>
      <div class="header">
        <slot name="header">

        </slot>
        <button @click="$emit('closeModal')">סגירה</button>
      </div>

      <div class="table">
        <div class="thead">
          <div class="tr">
            <slot name="th-row">

            </slot>
          </div>
        </div>

        <div class="tbody" v-if="paidPayments">
          <div class="tr" v-for="row in paidPayments" :key="row.paymentCode">
            <div class="td">{{ row.date }}</div>
            <div class="td">---</div>
            <div class="td">{{ totalPaidPayments }}/{{ row.paymentNumber }}</div>
            <div class="td">---</div>
            <div class="td">---</div>
            <div class="td">{{ cleanPrice(row.priceWithVat) }}</div>
            <div class="td">{{ vaxPrice(row.priceWithVat) }}</div>
            <div class="td">{{ formatPrice(row.priceWithVat) }}</div>
          </div>
        </div>

        <div class="tbody" v-if="futurePayments">
          <div class="tr" v-for="row in futurePayments" :key="row.id">
            <div class="td">{{ row.paymentDate }}</div>
            <div class="td">{{ row.futurePaymentFor }}</div>
            <div class="td">---</div>
            <div class="td">{{ row.linkage }}</div>
            <div class="td">---</div>
            <div class="td">{{ cleanPrice(row.amount) }}</div>
            <div class="td">{{ vaxPrice(row.amount) }}</div>
            <div class="td">{{ formatPrice(row.amount) }}</div>
          </div>
        </div>

        <div class="tfoot" v-if="futurePayments">
          <div class="td"></div>
          <div class="td"></div>
          <div class="td"></div>
          <div class="td"></div>
          <div class="td"></div>
          <div class="td"></div>
          <div class="td">סה״כ לתשלום</div>
          <div class="td">{{formatPrice(sumFuturePayments)}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "SlotTable",
  props: ['paidPayments', 'totalPaidPayments', 'futurePayments'],
  methods: {
    formatPrice(num) {
      if (num === null || num === "") {
        return '---'
      }
      const n = parseFloat(num)
      return '₪' + n.toLocaleString()
    },
    cleanPrice(num) {
      if (num === null || num === "") {
        return '---'
      }
      const val = num - (num * 0.17)
      const n = parseFloat(val)
      return '₪' + n.toLocaleString()
    },
    vaxPrice(num) {
      if (num === null || num === "") {
        return '---'
      }
      const val = num - (num * 0.83)
      const n = parseFloat(val)
      return '₪' + n.toLocaleString()
    },
  },
  computed: {
    sumFuturePayments() {
      let sum = 0;
      this.futurePayments.map(item => {
        sum = sum + Number(item.amount);
      })
      return sum
    }
  },
  created() {
    console.log(this.futurePayments);
  }
}
</script>

<style lang="scss">
.table-background {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .45);
  z-index: 2;

  .table-wrap {
    border-radius: 10px;
    background-color: white;
    width: 80%;
    max-height: 70vh;
    overflow-y: scroll;
    scrollbar-width: thin; /* firefox */

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #e4e2da;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #979797;
    }

    .header {
      padding: 25px;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
    }

    .modal-headline {
      font-size: 40px;
      font-family: Almoni-bold;
      color: #49382a;
    }

    button {
      width: 250px;
      font-size: 24px;
      font-family: Almoni-bold;
      border: none;
      border-radius: 5px;
      color: white;
      background-color: #423a32;
      cursor: pointer;
    }
  }

  .table {
    width: 100%;

    .thead {
      padding: 12px 18px;
      background-color: rgba(151, 151, 151, .3);

      .tr {
        color: #453a2d;
        font-size: 26px;
        font-family: Almoni-bold;
        display: flex;
        align-items: center;

        .td {
          flex: 1 1 0;
        }
      }
    }

    .tbody {
      padding: 0 18px;

      .tr {
        padding: 25px 0;
        border-bottom: 1px solid rgba(111, 101, 91, .5);
        display: flex;
        align-items: center;

        .td {
          color: #49382a;
          font-size: 26px;
          font-family: Almoni;
          flex: 1 1 0;
        }
      }
    }

    .tfoot {
      display: flex;
      align-items: center;
      padding: 12px 18px;
      background-color: #f4f3f0;
      .td {
        color: #49382a;
        font-size: 26px;
        font-family: Almoni;
        flex: 1 1 0;
      }
    }
  }
}
</style>