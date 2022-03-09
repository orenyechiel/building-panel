<template>
  <div class="card-wrap">
    <div class="material-card">

      <div class="head">
        <img :src="icon" alt="">
        <p>{{ details.name }}</p>
      </div>

      <div class="card-details">
        <div class="date">
          <p>{{relevantDate}}</p>
          <span>{{textFormat(details.lastDateToChoose)}}</span>
        </div>

        <a href="" @click.prevent="action">
          <img :src="Arrow" alt="">
        </a>
      </div>

    </div>
  </div>
</template>

<script>
import Door from '@/assets/images/icons/choice-door.webp'
import Kitchen from '@/assets/images/icons/choice-kitchen.svg'
import Keramika from '@/assets/images/icons/choice-keramika.svg'
import Wall from '@/assets/images/icons/choice-wall.svg'
import Floor from '@/assets/images/icons/choice-floor.svg'
import Arrow from '@/assets/images/icons/left-arrow.svg'
import {mapGetters} from "vuex";

export default {
  name: "MaterialCard",
  props: ['details', 'relevantDate'],
  setup() {
    return {
      Arrow,
      Door,
      Kitchen,
      Keramika,
      Wall,
      Floor,
    }
  },
  data() {
    return {
      icon: Door
    }
  },
  computed: {
    ...mapGetters(['getWpLabels'])
  },
  methods: {
    action() {

    },
    textFormat(text) {
      if(text) {
        // return 'ת. אחרון לבחירה'
        return this.getWpLabels.last_date_to_choose
      } else {
        // return 'תאריך בחירה'
        return this.getWpLabels.date_of_choosing
      }
    },
    setRelevantIcon(materialType) {
      switch(materialType) {
        case 'דלתות':
          this.icon = Door
          break;
        case 'מטבח':
          this.icon = Kitchen
          break;
        case 'שיש':
          this.icon = Keramika
          break;
        case 'אריח':
          this.icon = Wall
          break;
        case 'ריצוף':
          this.icon = Floor
          break;
        default:
          this.icon = Wall
      }
    }
  },
  created() {
    this.setRelevantIcon(this.details.subjectName)
  }
}
</script>

<style scoped lang="scss">
.card-wrap {
  padding: 0 10px;
  .material-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(111, 101, 91, .2);

    .head {
      padding: 15px 10px;
      text-align: right;
      display: flex;
      align-items: center;
      p {
        font-size: 20px;
        font-family: Almoni-bold;
      }
      img {
        width: 32px;
        height: 32px;
        margin-left: 11px;
      }
    }

    .card-details {
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 20px;
      .date {
        text-align: right;
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
      img {
        height: 100%;
      }
    }

  }
}
</style>