<template>

  <div class="project-head">

    <div class="contracts-dropdown">
      <div class="selected-contract contract-item">
        <h2>{{ contract.projectCity }}</h2>
        <hr>
        <div>
          <span>{{ contract.projectTitle }}</span>
        </div>

        <button class="arrow"
                v-if="hasMoreContracts"
                @click="showContractsList">
          <img :src="Arrow" alt="">
        </button>
      </div>

      <ul class="contract-list" v-show="toggleContracts">
        <li class="contract-item"
            v-for="contract in getFilteredApartmentsList"
            :key="contract.contractId"
            @click="moveToContract"
            :data-contract="contract.contractId">
          <h2>{{ contract.city }}</h2>
          <hr>
          <div>
            <span>{{ contract.title }}</span>
          </div>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
import Arrow from '@/assets/images/icons/dropdown-arrow.svg'
import authService from "@/services/authService";
import {mapGetters, mapActions} from "vuex";
export default {
  name: "ContractDropdown",
  props: ['contract'],
  data() {
    return {
      toggleContracts: false,
    }
  },
  setup() {
    return {
      Arrow
    };
  },
  methods: {
    ...mapActions(['userContract']),
    showContractsList(e) {
      this.toggleContracts = !this.toggleContracts;
        e.target.classList.toggle('rotate');
    },
    hasMoreContracts() {
      return this.getFilteredApartmentsList.length > 1
    },
    fetchUserApartments() {
      const code = localStorage.getItem('loginCode');
      authService.login(code).then(res => {
        this.$store.commit('setApartmentsList', res.data.apartmentsList);
      }).catch(err => {
        console.log('login error:: ', err);
      })
    },
    async moveToContract(e) {
      const chosenId = e.target.getAttribute('data-contract')
      localStorage.setItem('contractIdStorage', chosenId);

      await this.userContract(chosenId);
      this.$router.go();
    }
  },
  computed: {
    ...mapGetters(['getApartmentsList','getFilteredApartmentsList'])
  },
  async created() {
    // when user refresh the page
    await this.fetchUserApartments();
    console.log(this.getApartmentsList);
  }
}
</script>

<style scoped lang="scss">
$brown: #453a2d;
$lightbrown: #6f655b;

.project-head {
  color: $brown;
  font-family: Almoni;
  border:1px solid #979797;
  border-radius: 4px;
  background-color: white;
  position: relative;
  z-index: 1;

  .contract-item {
    text-align: center;
    padding: 18px;
    border-bottom: 1px solid $lightbrown;

    h2 {
      font-size: 24px;
    }

    hr {
      width: 38%;
      background-color: $brown;
      margin: 10px auto;
    }

    span {
      font-size: 18px;
    }
  }

  .selected-contract {
    position: relative;

    .arrow {
      position: absolute;
      inset: 40% auto auto 15px;
      background: transparent;
      border: none;
      transform: rotate(180deg);
      transition: .3s ease;

      img {
        pointer-events: none;
      }

      &.rotate {
        transform: rotate(0deg);
      }
    }
  }

  .contracts-dropdown {
    position: relative;

    .contract-list {
      position: absolute;
      background: white;
      width: 100%;
      border-radius: 0 0 4px 4px;
      max-height: 80vh;
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

      li > * {
        pointer-events: none;
      }
    }
  }

}
</style>