<template>
  <div class="card">
    <div class="title"><slot name="title" /></div>
    <div><slot name="body" /></div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid gray;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  .title {
    border-bottom: 1px solid gray;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
}
</style>
