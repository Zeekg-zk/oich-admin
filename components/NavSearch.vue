<template>
  <div class="search">
    <input type="text" class="input" placeholder="搜索（按 Enter 键搜素）">
    <i class="el-icon-search icon" />
  </div>
</template>

<script>
export default { }
</script>

<style lang="scss" scoped>
.search {
  display: inline-block;
  font-size: 18px;
  &:hover .input {
    width: 240px;
    opacity: 1;
  }
}
.input, .icon {
  border: none;
  width: 30px;
  height: 30px;
  outline: none;
  transition: all .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 8px;
}
.icon {
  line-height: 7vh;
  position: absolute;
  left: 0;
}
.input {
  opacity: 0;
  padding: 3px;
  &::-webkit-input-placeholder {
    color: #545455;
    font-size: 15px;
    letter-spacing: 2px;
  }
}
</style>
