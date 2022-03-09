<template>
  <div class="panel">

    <div class="loader-wrap" v-show="showLoader">
      <LoaderDots/>
    </div>

    <TopProgress/>

    <DeleteUser v-if="showModal" @close-self="closeModal"/>

    <div class="boxes-wrapper">
      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src=PrivateProfile class="box-icon" alt="">
            <h4>{{ getWpLabels.personal_details }}</h4>
          </template>
          <template v-slot:default>
            <div class="ul-wrap">
              <ul class="box-list">
                <li>
                  <div class="li-inner">
                    <span>{{ getWpLabels.name }}</span>
                    <p>{{ checkValue(getProfileInfo.fullName) }}</p>
                  </div>
                </li>
                <li>
                  <div class="li-inner">
                    <span>תעודת זהות</span>
                    <p>{{ checkValue(getProfileInfo.id) }}</p>
                  </div>
                </li>
                <li>
                  <div class="li-inner">
                    <span>דוא”ל</span>
                    <p>{{ checkValue(getProfileInfo.email) }}</p>
                  </div>
                </li>
                <li>
                  <div class="li-inner">
                    <span>{{ getWpLabels.phone }}</span>
                    <p>{{ checkValue(getProfileInfo.phoneNumber) }}</p>
                  </div>
                </li>
              </ul>

              <div class="note">
                <img :src="Info">
                <span>פרטי הרוכש כפי שנרשמו בהסכם המכר</span>
              </div>

            </div>
          </template>
        </slot-box>
      </div>


      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src=ContactBook class="box-icon" alt="">
            <h4>{{ getWpLabels.contacts }}</h4>
          </template>
          <template v-slot:default>
            <div class="ul-wrap">
              <ul class="box-list" v-for="contact in getProfileContacts" :key="contact">
                <li>
                  <div class="li-inner">
                    <span>{{ getWpLabels.name }}</span>
                    <p>{{ checkValue(contact.fullName) }}</p>
                  </div>
                </li>
                <li>
                  <div class="li-inner">
                    <span>תעודת זהות</span>
                    <p>{{ checkValue(contact.id) }}</p>
                  </div>
                </li>
                <li>
                  <div class="li-inner">
                    <span>דוא”ל</span>
                    <p>{{ checkValue(contact.email) }}</p>
                  </div>
                </li>
                <li>
                  <div class="li-inner">
                    <span>{{ getWpLabels.phone }}</span>
                    <p>{{ checkValue(contact.phoneNumber) }}</p>
                  </div>
                </li>
              </ul>

              <div class="note">
                <img :src="Info">
                <span>פרטי הנציג המטפל בתיק הלקוח שלכם</span>
              </div>
            </div>
          </template>
        </slot-box>
      </div>


      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src=Gps class="box-icon" alt="">
            <h4>{{ getWpLabels.address }}</h4>
          </template>
          <template v-slot:default>
            <div class="ul-wrap">
              <ul>
                <li>
                  <span class="sub-title">{{ getWpLabels.shipping_address }}</span>
                  <ul class="box-list">
                    <li>
                      <div class="li-inner">
                        <span>{{ getWpLabels.street }}</span>
                        <p>{{ checkValue(getProfileAddress.street) }}</p>
                      </div>
                    </li>
                    <li>
                      <div class="li-inner">
                        <span>{{ getWpLabels.number }}</span>
                        <p>---</p>
                      </div>
                    </li>
                    <li>
                      <div class="li-inner">
                        <span>{{ getWpLabels.city }}</span>
                        <p>{{ checkValue(getProfileAddress.city) }}</p>
                      </div>
                    </li>
                    <li>
                      <div class="li-inner">
                        <span>{{ getWpLabels.zip_code }}</span>
                        <p>---</p>
                      </div>
                    </li>
                  </ul>
                </li>

                <li class="address-line">
                  <span class="sub-title">{{ getWpLabels.billing_address }}</span>
                  <ul class="box-list">
                    <li>
                      <div class="li-inner">
                        <span>{{ getWpLabels.street }}</span>
                        <p>{{ checkValue(getProfileBillingAddress.street) }}</p>
                      </div>
                    </li>
                    <li>
                      <div class="li-inner">
                        <span>{{ getWpLabels.number }}</span>
                        <p>---</p>
                      </div>
                    </li>
                    <li>
                      <div class="li-inner">
                        <span>{{ getWpLabels.city }}</span>
                        <p>{{ checkValue(getProfileBillingAddress.city) }}</p>
                      </div>
                    </li>
                    <li>
                      <div class="li-inner">
                        <span>{{ getWpLabels.zip_code }}</span>
                        <p>---</p>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </template>
        </slot-box>
      </div>


      <div class="delete-account-wrap">
        <button @click="openModal">
          <img :src=DeleteAccount alt="">
          <span>{{ getWpLabels.deleteMyAcount }}</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import TopProgress from "@/components/TopProgress";
import LoaderDots from "@/components/mini-components/LoaderDots"
import toggleModal from "@/mixing/toggleModal";
import SlotBox from "@/components/SlotBox";
import DeleteUser from "@/components/modals/DeleteUser";

import PrivateProfile from '@/assets/images/icons/private-profile.svg'
import ContactBook from '@/assets/images/icons/contact-book.svg'
import Gps from '@/assets/images/icons/gps.svg'
import DeleteAccount from '@/assets/images/icons/delete-account.svg'
import Info from '@/assets/images/icons/info.svg'

import {mapActions, mapGetters} from "vuex";

export default {
  name: "ProfilePanel",
  mixins: [toggleModal],
  components: {
    LoaderDots,
    TopProgress,
    SlotBox,
    DeleteUser,
  },
  data() {
    return {
      showLoader: false,
    }
  },
  setup() {
    return {
      PrivateProfile,
      ContactBook,
      Gps,
      DeleteAccount,
      Info
    }
  },
  computed: {
    ...mapGetters(['getWpLabels', 'getProfileInfo', 'getProfileContacts', 'getProfileAddress', 'getProfileBillingAddress'])
  },
  methods: {
    ...mapActions(['profileData']),
    checkValue(data) {
      if (data !== "" || data === null) {
        return data
      }
      return '---'
    }
  },
  async created() {
    const token = localStorage.getItem('userToken');
    await this.profileData(token);
  }
}
</script>

<style scoped lang="scss">
.panel {
  flex-grow: 1;

  .boxes-wrapper {
    position: relative;
    top: -20px;
    padding: 0 40px;

    .cell {
      margin-bottom: 32px;

      .box-icon {
        margin-left: 8px;
        width: 24px;
      }
    }

    .ul-wrap {
      padding: 32px 32px 24px;

      .address-line,
      > .box-list:nth-child(n+2){
        margin-top: 40px;
      }
    }

    .sub-title {
      color: #453a2d;
      font-size: 20px;
      font-family: Almoni-bold;
      display: inline-block;
      margin-bottom: 12px;

      &:before {
        content: "\a";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #b3a08a;
        display: inline-block;
        margin-bottom: 2px;
        margin-left: 8px;
      }
    }

    .box-list {
      display: flex;
      justify-content: space-between;

      li {
        display: flex;
        align-items: center;
        flex-basis: 25%;
        flex-grow: 1;
        padding: 10px;
        border-right: 1px solid #b3a08a;

        .li-inner {
          span {
            color: #49382a;
            font-family: Almoni-light;
            font-size: 18px;
          }

          p {
            color: #453a2d;
            font-family: Almoni-bold;
            font-size: 20px;
          }
        }
      }
    }

    .delete-account-wrap {
      padding: 40px;
      background-color: #f7f9fc;

      button {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #453a2d;
        background-color: white;
        font-size: 20px;
        font-family: Almoni-bold;
        padding: 17px;
        margin: 0 auto;
        width: 46%;
        min-width: 600px;
        border-radius: 3px;
        border: solid 1px #b3a08a;
      }

      img {
        width: 24px;
        height: 24px;
      }
    }

  }

  .note {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 24px;
    transform: translateX(7px);
    span {
      font-size: 18px;
      font-family: 'Almoni-light';
      color: #49382a;
    }
  }
}
</style>