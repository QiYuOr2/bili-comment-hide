<script setup lang="ts">
import { useGMValue } from '../composables/useGMValue';

const isExpand = useGMValue('isExpand', true);
</script>


<template>
  <div fixed bg-white border border-solid border-stone-2 shadow-sm shadow-stone-400 rounded-xl 
    transition-all duration-300 ease-in-out overflow-hidden 
    z="99999" 
    top="100px" 
    :w="isExpand ? '300px' : '12'"
    :h="isExpand ? '600px' : '12'" 
    :p="isExpand ? '5px' : '0'"
    :right="isExpand ? '2' : 'hover:2 -5'"
    >
    <div ref="el" @click="isExpand = !isExpand" flex items-center justify-center h-12 rounded-lg bg-stone-100 
      :bg="isExpand ? 'stone-100' : 'white'" 
      :w="isExpand ? 'full' : '12'"  
      cursor-pointer transition-all duration-300 ease-in-out
      gap-1
    >
      <span>评论</span><span text-xs text-stone-400>{{ isExpand ? '点击这里最小化' : '' }}</span>
    </div>
    <div v-show="isExpand" w="300px">
      <slot></slot>
    </div>
  </div>
</template>
