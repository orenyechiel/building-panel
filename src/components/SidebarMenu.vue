<template>
  <aside>
    <div class="container">

    <ContractDropdown :contract="getUserContract"/>

    <div class="logout-wrap">
      <p> {{detectHour}} {{ getUserContract.fullName }}</p>
      <a @click.prevent="logOut">{{ getWpLabels.logout }}</a>
    </div>

    <nav>
      <ul>
        <li>
          <img :src="Building" alt="">
          <router-link to="/private-area">{{ getWpLabels.overview_title }}</router-link>
        </li>

        <li>
          <img :src="Pictures" alt="">
          <router-link to="/pictures">תמונות</router-link>
        </li>

        <li>
          <img :src="Profile" alt="">
          <router-link to="/profile">{{ getWpLabels.profile }}</router-link>
        </li>
      </ul>
    </nav>

    </div>
  </aside>
</template>

<script>
import Building from '@/assets/images/icons/building.svg'
import Pictures from '@/assets/images/icons/pictures.svg'
import Profile from '@/assets/images/icons/profile.svg'
import ContractDropdown from "@/components/mini-components/ContractDropdown";
import {mapGetters, mapActions} from "vuex";
export default {
  name: "SidebarMenu",
  components: {
    ContractDropdown,
  },
  setup() {
    return {
      Building,
      Pictures,
      Profile
    };
  },
  methods: {
    ...mapActions(['userContract']),
    logOut() {
      localStorage.removeItem('contractIdStorage');
      localStorage.removeItem('userToken');
      this.$store.commit('changeStep', 1);
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters(['getUserContract', 'getWpLabels']),
    detectHour() {
      const hour = new Date().getHours();
      return (hour<12 && this.getWpLabels.good_morning ||
          hour<15 && this.getWpLabels.good_noon ||
          hour<18 && this.getWpLabels.good_afternoon ||
          hour<24 && this.getWpLabels.good_evening)
    }
  },
  async created() {
    const cnt = localStorage.getItem('contractIdStorage');
    await this.userContract(cnt)
  }
};
</script>

<style scoped lang="scss">
$brown: #453a2d;
$light-brown: #6f655b;

aside {
  color: white;
  flex-basis: 15%;
  padding: 20px;
  min-width: 260px;
  box-sizing: border-box;
  background-color: $brown;
  position: relative;

  .logout-wrap {
    text-align: right;
    padding: 15px 8px;
    margin-bottom: 8px;
    p {
      font-size: 20px;
      font-family: Almoni-bold;
      margin-bottom: 4px;
    }
    a {
      color: white;
      font-family: Almoni-light;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  nav {
    position: absolute;
    width: 100%;
    right: 0;

    ul {
      text-align: right;

      li {
        display: flex;
        gap: 10px;
        margin-bottom: 6px;
        padding: 10px 0;
        &.active,
        &:hover,
        &:focus-within {
          background-color: $light-brown;
          a {
            font-family: Almoni-bold;
          }
        }

        a {
          color: white;
          font-size: 24px;
          font-family: Almoni-light;
          text-decoration: none;
        }

        img {
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
