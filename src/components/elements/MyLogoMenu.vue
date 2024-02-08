<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: String,
  size: String
})

const className = computed(() => ({
  ' -blanc': props.color === 'blanc',
  ' -petit': props.size === 'petit',
  ' -moyen': props.size === 'moyen',
  ' -grand': props.size === 'grand'
}))
</script>

<template>
  <router-link class="link" to="/menu">
    <div class="menu" :class="className">
      <svg
        width="85"
        height="85"
        viewBox="0 0 85 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_37_639)">
          <path
            d="M14.1661 0H24.7911C32.6154 0 38.9572 6.34346 38.9572 14.1661V24.7911C38.9572 32.6154 32.6138 38.9572 24.7911 38.9572H14.1661C6.3418 38.9572 0 32.6154 0 24.7911V14.1661C0 6.34346 6.34346 0 14.1661 0Z"
            fill="black"
          />
          <path
            d="M14.1661 46.0411H24.7911C32.6154 46.0411 38.9572 52.3846 38.9572 60.2072V70.8322C38.9572 78.6565 32.6138 84.9983 24.7911 84.9983H14.1661C6.3418 84.9983 0 78.6565 0 70.8322V60.2072C0 52.3829 6.34346 46.0411 14.1661 46.0411Z"
            fill="black"
          />
          <path
            d="M60.2089 46.0411H70.8339C78.6582 46.0411 85 52.3846 85 60.2072V70.8322C85 78.6565 78.6582 84.9983 70.8339 84.9983H60.2089C52.3846 84.9983 46.0428 78.6549 46.0428 70.8322V60.2072C46.0428 52.3829 52.3846 46.0411 60.2089 46.0411Z"
            fill="black"
          />
          <path
            d="M60.2089 1.5H70.8339C77.8297 1.5 83.5 7.17177 83.5 14.1661V24.7911C83.5 31.7869 77.8282 37.4572 70.8339 37.4572H60.2089C53.2131 37.4572 47.5428 31.7855 47.5428 24.7911V14.1661C47.5428 7.17022 53.213 1.5 60.2089 1.5Z"
            stroke="black"
            stroke-width="3"
          />
        </g>
        <defs>
          <clipPath id="clip0_37_639">
            <rect width="85" height="85" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p>MENU</p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // color
  &.-blanc {
    svg path:nth-child(-n + 3) {
      fill: $blanc;
    }
    svg path {
      stroke: $blanc;
    }
  }

  // size
  &.-petit {
    svg {
      width: 30px;
      height: 30px;
    }
  }
  &.-moyen {
    svg {
      width: 60px;
      height: 60px;
    }
  }
  &.-grand {
    svg {
      width: 100px;
      height: 100px;
    }
  }

  p {
    font-size: rem(10);
    text-align: center;
    text-decoration: none;
    color: $blanc;
    margin: 0;

    @include medium-up {
      font-size: rem(12);
    }
  }
}

.link {
  text-decoration: none;
}
</style>
