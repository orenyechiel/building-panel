<template>
  <div class="step">
    <a class="prev-step" @click.prevent="prevStep">חזרה</a>
    <div class="inner-top-modal">
      <h3>{{ getWpLabels.several_apartments_subtitle }}</h3>
      <p>{{ getWpLabels.several_apartments_title }}</p>
    </div>

    <div class="inner-bottom-modal">
      <ul class="contract-list">
        <li v-for="contract in getApartmentsList" :key="contract.contractId">
          <label :for="contract.contractId" @change="enableNext">
            <input type="radio"
                   name="contract"
                   v-model="chosenContract"
                   :id="contract.contractId"
                   :value="contract.contractId">
            <ApartmentCard
                :apartment-num="contract.assetCode"
                :project-title="contract.title"
                :project-city="contract.city"
            />
          </label>
        </li>
      </ul>
    </div>

    <button type="submit"
            class="btn-brown"
            :disabled="isDisabled"
            @click="logToPanel">
      מעבר לאזור האישי
    </button>
  </div>
</template>

<script>
import ApartmentCard from "@/components/cards/ApartmentCard";
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: "StepThree",
  components: {ApartmentCard},
  data() {
    return {
      isDisabled: true,
      chosenContract: '',
    }
  },
  methods: {
    ...mapActions(['userContract']),
    ...mapMutations(['prevStep']),
    enableNext() {
      this.isDisabled = false;

      const unselectedRadios = document.querySelectorAll('input[type="radio"]:not(:checked) + .apartment-card');
      unselectedRadios.forEach(i => {
        i.style.opacity = .7;
      })
    },
    async logToPanel() {
      await localStorage.setItem('contractIdStorage', this.chosenContract);
      await this.userContract(localStorage.getItem('contractIdStorage'));
      this.$router.replace('/private-area');
    }
  },
  computed: {
    ...mapGetters(['getWpLabels', 'getApartmentsList'])
  },
}
</script>

<style scoped lang="scss">
.contract-list {
  li {
    margin-bottom: 10px;
  }

  label {
    cursor: pointer;
  }

  input[type="radio"] {
    display: none;

    &:checked {
      + .apartment-card {
        opacity: 1 !important;
        background-color: #b3a08a;
      }
    }
  }
}

button {
  margin-top: 66px;
}
</style>