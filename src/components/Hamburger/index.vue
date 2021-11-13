<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path d="M448 736c-8.19 0-16.38-3.12-22.62-9.38-12.5-12.5-12.5-32.75 0-45.25L594.75 512 425.38 342.62c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l180.69 180.69c18.72 18.72 18.72 49.16 0 67.88l-180.7 180.68c-6.24 6.26-14.43 9.38-22.62 9.38z m158.06-212.69h0.31-0.31z" p-id="5406" /><path d="M512 128c211.74 0 384 172.26 384 384S723.74 896 512 896 128 723.74 128 512s172.26-384 384-384m0-64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z" p-id="5407" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
