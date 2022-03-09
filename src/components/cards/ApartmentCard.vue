<template>
  <div class="apartment-card">
    <div class="img-wrap">
      <img src="../../assets/images/apartment-icon.png" alt="">
    </div>

    <div class="desc-wrap">
      <p class="project-name">{{ projectTitle }}</p>
      <p class="city">{{ projectCity }}</p>
    </div>

    <div class="apartment-details">
      <p class="apartment-number">{{ apartmentNum }}</p>
      <p>{{ getWpLabels.apartment_number }}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ApartmentCard",
  props: ['projectTitle', 'projectCity', 'apartmentNum'],
  computed: {
    ...mapGetters(['getWpLabels'])
  },
}
</script>

<style scoped lang="scss">

.apartment-card {
  display: flex;
  background-color: #e4e2da;
  border-radius: 5px;
  padding: 12px 20px;
  gap: 20px;
  text-align: right;

  .img-wrap {
    width: 40px;
    height: 40px;

    img {
      max-width: 100%;
      object-fit: cover;
    }
  }

  .desc-wrap {
    padding-left: 20px;

    .project-name {
      color: #453a2d;
      font-size: 20px;
      font-family: Almoni-bold;
    }

    .city {
      font-size: 18px;
      color: #49382a;
      font-family: Almoni-light;
    }
  }

  .apartment-details {
    .apartment-number {
      font-size: 20px;
      color: #453a2d;
    }

    p {
      font-size: 18px;
      color: #49382a;
      font-family: Almoni-light;
    }
  }
}
</style>