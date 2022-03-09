<template>
  <div class="panel">

    <div class="loader-wrap" v-show="showLoader">
      <p>הנתונים נטענים, אנא המתן</p>
      <LoaderDots/>
    </div>

    <TopProgress/>

    <div class="boxes-wrapper">

      <div class="cell">
        <teleport to="body">
          <slot-table v-if="showPaidPayments"
                      @close-modal="closePaymentsModal"
                      :paid-payments="getApartmentPaidPayments"
                      :total-paid-payments="getTotalPaidPayments">
            <template v-slot:header>
              <h2 class="modal-headline">{{ getWpLabels.payments_dashboard }}</h2>
            </template>
            <template v-slot:th-row>
              <div class="td">תאריך עסקה</div>
              <div class="td">{{getWpLabels.payment_for}}</div>
              <div class="td">{{getWpLabels.payment}}</div>
              <div class="td">{{getWpLabels.linkage}}</div>
              <div class="td">{{getWpLabels.interest}}</div>
              <div class="td">{{getWpLabels.fund_amount}}</div>
              <div class="td">מע״מ</div>
              <div class="td">סה״כ</div>
            </template>
          </slot-table>
        </teleport>

        <slot-box>
          <template v-slot:header>
            <img :src="Payments" class="box-icon" alt="">
            <h4>{{getWpLabels.payments}}</h4>
            <div class="additional-detail">
              <a href="" @click.prevent="openPaymentsModal">{{ getWpLabels.payments_dashboard }}</a>
            </div>
          </template>

          <template v-slot:default>
            <div class="flex">
              <div class="percent-wrap">
<!--                <PercentLoader :percent="paymentPercent"/>-->
                <PercentLoader/>
              </div>

              <div class="data-wrap">
                <ul>
                  <li>
                    <div class="detail info">
                      <InfoTooltip/>
                      <div class="detail-inner">
                        <p>{{ formatPrice(getApartmentPayments.totalPrice) }}</p>
                        <span>{{ getWpLabels.total_price }}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="detail">
                      <p>{{ formatPrice(getApartmentPayments.amountPaid) }}</p>
                      <span>{{ getWpLabels.amount_paid }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="detail">
                      <p>{{ formatPrice(getApartmentPayments.amountLeftToPay) }}</p>
                      <span>{{ getWpLabels.amount_left }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="detail info">
                      <InfoTooltip/>
                      <div class="detail-inner">
                        <a class="underscore" @click.prevent="openNextPaymentsModal">
                          {{ formatPrice(getApartmentPayments.nextPaymentAmount) }}
                        </a>
                        <br>
                        <span>{{ getWpLabels.upcoming_payments }}</span>
                      </div>
                    </div>

                    <teleport to="body">
                      <slot-table v-if="showNextPayments"
                                  @close-modal="closePaymentsModal"
                                  :future-payments="getFuturePayments"
                                  :total-paid-payments="getTotalPaidPayments">
                        <template v-slot:header>
                          <h2 class="modal-headline">{{ getWpLabels.upcoming_payments }}</h2>
                        </template>
                        <template v-slot:th-row>
                          <div class="td">תאריך עסקה</div>
                          <div class="td">{{ getWpLabels.payment_for }}</div>
                          <div class="td">{{ getWpLabels.payment }}</div>
                          <div class="td">{{ getWpLabels.linkage }}</div>
                          <div class="td">{{ getWpLabels.interest }}</div>
                          <div class="td">{{ getWpLabels.fund_amount }}</div>
                          <div class="td">מע״מ</div>
                          <div class="td">סכום לחיוב</div>
                        </template>
                      </slot-table>
                    </teleport>
                  </li>
                  <li>
                    <div class="detail info">
                      <InfoTooltip/>
                      <div class="detail-inner">
                        <p class="underscore">
                          {{ formatPrice(getApartmentPayments.nextPaymentDate) }}
                        </p>
                        <span>{{ getWpLabels.upcoming_payment_date }}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="detail info">
                      <InfoTooltip/>
                      <div class="detail-inner">
                        <p class="warn underscore">
                          {{ formatPrice(getApartmentPayments.currentBalance) }}
                        </p>
                        <span>{{ getWpLabels.current_balance_today }}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="detail">
                      <img :src="Calc">
                      <a href="">מחשבון משכנתא</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </slot-box>
      </div>

      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src="Materialist" class="box-icon" alt="">
            <h4>{{ getWpLabels.materials_choose_title }}</h4>
          </template>
          <template v-slot:default>
            <ul>
              <li v-for="notChosen in getTenantNotChosenMaterials" :key="notChosen.subjectId">
                <MaterialCard
                    :details="notChosen"
                    :relevant-date="notChosen.lastDateToChoose"/>
              </li>
            </ul>
            <div class="sub-header">
              <div class="head">
                <img :src="MaterialistDark" alt="">
                <p>{{ getWpLabels.chosen_raw_materials }}</p>
              </div>
              <ul>
                <li v-for="chosen in getTenantChanges" :key="chosen.subjectId">
                  <MaterialCard
                      :details="chosen"
                      :relevant-date="chosen.chosen_date"/>
                </li>
              </ul>
            </div>
          </template>
        </slot-box>
      </div>

      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src="ApartmentDrawing" class="box-icon" alt="">
            <h4>{{ getWpLabels.tenant_changes }}</h4>
          </template>
          <template v-slot:default>
            <NoChangesMade v-if="!getResidentChanges.length"/>
            <ResidentChangesCard
                v-for="(change, i) in getResidentChanges"
                :key="i"
                :changes="change"/>
            <div class="btn-wrap">
              <DefaultBtn :text="getWpLabels.schedule_changes_meet" />
            </div>
          </template>
        </slot-box>
      </div>

      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src="Payments" class="box-icon" alt="">
            <h4>{{ getWpLabels.securities }}</h4>
          </template>
          <template v-slot:default>
            <ul>
              <li v-for="guarantee in getGuarantees" :key="guarantee.id">
                <GuaranteeCard :guarantees="guarantee"/>
              </li>
            </ul>
          </template>
        </slot-box>
      </div>

      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src="Contract" class="box-icon" alt="">
            <h4>{{ getWpLabels.the_contract }}</h4>
          </template>
          <template v-slot:default>
            <div class="sub-header">
              <div class="head">
                <img :src="Brief" alt="">
                <p>{{ getWpLabels.contract_summary }}</p>
              </div>
            </div>
            <ContractMiniCard :details="getBriefContract"/>

            <div class="sub-header">
              <div class="head">
                <img :src="CndApartment" alt="">
                <p>{{ getWpLabels.the_apartment }}</p>
              </div>
            </div>
            <ApartmentMiniCard :details="getApartmentDetails"/>

            <div class="sub-header">
              <div class="head">
                <img :src="Storage" alt="">
                <p>{{ getWpLabels.storage }}</p>
              </div>
            </div>
            <StoreMiniCard :details="getApartmentStoreRoom"/>

            <div class="sub-header">
              <div class="head">
                <img :src="Parking" alt="">
                <p>{{ getWpLabels.parking }}</p>
              </div>
            </div>
            <ParkingMiniCard :details="getApartmentParking"/>

          </template>
        </slot-box>
      </div>

      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src="Papper" class="box-icon" alt="">
            <h4>{{ getWpLabels.apartment_case }}</h4>
          </template>
          <template v-slot:default>
            <ul>
              <li>
                <file-card>
                  <template v-slot:default>
                    <img :src="Download" class="file-icon" alt="">
                  </template>
                </file-card>
              </li>
              <li>
                <file-card>
                  <template v-slot:default>
                    <img :src="Download" class="file-icon" alt="">
                  </template>
                </file-card>
              </li>
            </ul>
          </template>
        </slot-box>
      </div>

      <div class="cell">
        <slot-box>
          <template v-slot:header>
            <img :src="Message" class="box-icon" alt="">
            <h4>{{ getWpLabels.messages_tab_title }}</h4>
          </template>
          <template v-slot:default>
            <ul>
              <li>
                <file-card>
                  <template v-slot:default>
                    <img :src="Pdf" class="file-icon" alt="">
                  </template>
                </file-card>
              </li>
              <li>
                <file-card>
                  <template v-slot:default>
                    <img :src="Pdf" class="file-icon" alt="">
                  </template>
                </file-card>
              </li>
            </ul>
          </template>
        </slot-box>
      </div>


    </div>

  </div>
</template>

<script>
import TopProgress from "@/components/TopProgress";
import SlotBox from "@/components/SlotBox";
import SlotTable from "@/components/SlotTable";
import PercentLoader from "@/components/mini-components/PercentLoader";
import InfoTooltip from "@/components/mini-components/InfoTooltip";
import FileCard from "@/components/cards/FileCard";
import MaterialCard from "@/components/cards/MaterialCard";
import GuaranteeCard from "@/components/cards/GuaranteeCard";
import DefaultBtn from "@/components/mini-components/DefaultBtn";
import ContractMiniCard from "@/components/cards/ContractMiniCard";
import ApartmentMiniCard from "@/components/cards/ApartmentMiniCard";
import StoreMiniCard from "@/components/cards/StoreMiniCard";
import ParkingMiniCard from "@/components/cards/ParkingMiniCard";
import ResidentChangesCard from "@/components/cards/ResidentChangesCard";
import NoChangesMade from "@/components/mini-components/NoChangesMade";
import LoaderDots from "@/components/mini-components/LoaderDots"
import Payments from '@/assets/images/icons/payments.svg'
import Materialist from '@/assets/images/icons/materialist.svg'
import MaterialistDark from '@/assets/images/icons/materialist-dark.svg'
import Brief from '@/assets/images/icons/cnt-brief.svg'
import CndApartment from '@/assets/images/icons/cnt-apartment.svg'
import Storage from '@/assets/images/icons/cnt-storage.svg'
import Parking from '@/assets/images/icons/cnt-parking.svg'
import Message from '@/assets/images/icons/message.svg'
import Contract from '@/assets/images/icons/contract.svg'
import Papper from '@/assets/images/icons/papper.svg'
import ApartmentDrawing from '@/assets/images/icons/apartment-drawing.svg'
import Calc from '@/assets/images/icons/calc.svg'

import Pdf from '@/assets/images/icons/pdf.svg'
import Download from '@/assets/images/icons/download.svg'

import {mapGetters, mapActions} from "vuex";
import showLoader from "@/mixing/showLoader";

export default {
  name: "MainPanel",
  components: {
    LoaderDots,
    ApartmentMiniCard,
    ContractMiniCard,
    GuaranteeCard,
    SlotBox,
    TopProgress,
    PercentLoader,
    NoChangesMade,
    InfoTooltip,
    SlotTable,
    FileCard,
    MaterialCard,
    DefaultBtn,
    StoreMiniCard,
    ParkingMiniCard,
    ResidentChangesCard
  },
  mixins: [showLoader],
  setup() {
    return {
      Payments,
      Materialist,
      MaterialistDark,
      Message,
      Contract,
      Papper,
      ApartmentDrawing,
      Calc,
      Pdf,
      Download,
      Brief,
      CndApartment,
      Storage,
      Parking,
    }
  },
  data() {
    return {
      showPaidPayments: false,
      showNextPayments: false,
      paymentPercent: '',
    }
  },
  methods: {
    ...mapActions(['userContract', 'apartmentPayments', 'apartmentPaidPayments', 'apartmentFuturePayments', 'guarantees', 'contractDetails', 'tenantChanges']),
    formatPrice(num) {
      if (num === null || num === "") {
        return '---'
      }
      const n = parseFloat(num)
      return '₪' + n.toLocaleString()
    },
    openPaymentsModal() {
      this.showPaidPayments = true;
    },
    openNextPaymentsModal() {
      this.showNextPayments = true;
    },
    closePaymentsModal() {
      this.showPaidPayments = false;
      this.showNextPayments = false;
    },
    apis(token) {
      this.apartmentPayments(token)
      this.apartmentPaidPayments(token)
      this.apartmentFuturePayments(token)
      this.guarantees(token)
      this.contractDetails(token)
      this.tenantChanges(token)
    }
  },
  computed: {
    ...mapGetters(['getWpLabels', 'getUserToken', 'getApartmentPayments', 'getApartmentPaidPayments', 'getTotalPaidPayments', 'getFuturePayments', 'getGuarantees', 'getContractDetails', 'getBriefContract', 'getApartmentDetails', 'getApartmentStoreRoom', 'getApartmentParking', 'getTenantChanges', 'getTenantNotChosenMaterials', 'getResidentChanges']),
  },
  async created() {
    const token = localStorage.getItem('userToken');
    const cnt = localStorage.getItem('contractIdStorage');

    await this.userContract(cnt)
    await this.apis(token);
    this.loaderOff()
  }
}
</script>

<style scoped lang="scss">

.panel {
  flex-grow: 1;

  .boxes-wrapper {
    position: relative;
    top: -20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding: 0 40px;

    .cell {
      &:first-of-type {
        grid-column: 1 / 4;
      }

      .btn-wrap {
        text-align: center;
        padding: 36px 0;
      }

      img.box-icon {
        margin-left: 10px;
        height: 24px;
        max-width: 24px;
      }

      .additional-detail {
        color: white;
        margin-right: auto;

        a {
          color: white;
        }
      }

      .sub-header {
        .head {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px;
          background-color: #f4f3f0;

          img {
            max-width: 24px;
          }

          p {
            color: #453a2d;
            font-family: Almoni-bold;
            font-size: 18px;
          }
        }
      }
    }
  }
}

.flex {
  display: flex;
  padding: 25px 0 20px;

  .percent-wrap {
    padding: 0 3.2%;
  }

  .data-wrap {
    flex-grow: 1;
    display: flex;
    align-items: center;

    ul {
      display: flex;
      flex-grow: 1;

      li {
        display: flex;
        align-items: center;
        flex-grow: 1;
        padding: 10px 1.2%;
        border-right: 1px solid #b3a08a;

        &:last-of-type {
          .detail {
            display: flex;
            align-items: center;
            font-size: 20px;
            font-family: Almoni;

            img {
              width: 20px;
              margin-left: 5px;
            }
          }
        }

        .detail {
          text-align: right;

          &.info {
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }

          p, a {
            color: #453a2d;
            font-family: Almoni-bold;
            font-size: 20px;

            &.underscore {
              text-decoration: underline;
            }

            &.warn {
              color: #f61e1e;
            }
          }

          a.underscore {
            cursor: pointer;
          }

          span {
            color: #49382a;
            font-family: Almoni-light;
            font-size: 18px;
          }


        }
      }
    }
  }
}
</style>