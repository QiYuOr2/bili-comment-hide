<script setup lang="ts">
defineProps<{
  label: string
}>()

const value = ref('')

const emits = defineEmits<{
  (event: 'add', value: string): void
}>()
</script>

<template>
  <div relative flex h-8 border border-slate-200 border-solid rounded-md overflow-hidden>
    <div px-2 text-sm  text-slate-500 flex items-center
      bg="transparent"
      border="1 l-none y-none solid slate-200"
      w="3em"
    >
      {{ label }}
    </div>
    <div w="0">
      <input class="input" v-model="value" />
    </div>
    <!-- 发送按钮 -->
    <button absolute right="-1px" top="-1px" bottom="-1px"  w="4em" bg-emerald-500 hover:bg-emerald-300 text-white text-sm disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer
    border="1px solid slate-200"  ml-auto transition="all hover:all 300"
      disabled:cursor-not-allowed
      font-bold
      outline="none focus-visible:none focus:none" @click="emits('add', value)">添加</button>
  </div>
</template>

<style scoped>
.input {
  @apply box-border h-full px-2 text-sm transition-all border-none text-slate-500 invalid:border-pink-500 invalid:text-pink-500 invalid:focus:border-pink-500 disabled:cursor-not-allowed  disabled:text-slate-400 bg-transparent autofill:transparent disabled:slate-50 outline-none focus-visible:none focus:none;
}
</style>