<script setup lang="ts">
import type { Reply } from './types/reply';
import type { ReplyReplyResponse, ReplyWbiMainResponse } from './types/response';

const tabs = {
  [BlockType.Keyword]: { name: '关键词', value: BlockType.Keyword },
  [BlockType.UID]: { name: 'UID', value: BlockType.UID },
};

const isChecked = useGMValue<boolean>('isChecked', true);

const { type, list } = useBlockListWithType({
  [BlockType.Keyword]: { storageKey: 'keywords', defaultValue: [] },
  [BlockType.UID]: { storageKey: 'uids', defaultValue: [] }
})

function filterByKeyword(replies: Reply[], keywords: string[]) {
  return replies.filter((item) => keywords.every(keyword => item.content.message.indexOf(keyword) === -1));
}

// mid = uid
function filterByUID(replies: Reply[], uids: string[]) {
  return replies.filter((item) => uids.every(uid => item.mid_str !== uid));
}

const filterMap = {
  [BlockType.Keyword]: filterByKeyword,
  [BlockType.UID]: filterByUID,
};
 

const requestHook = useRequestHook({
  rules: [
    {
      url: "x/v2/reply/wbi/main",
      response: (originResponse: ReplyWbiMainResponse) => {
        if (originResponse?.data?.replies) {
          const repliesFilter = filterMap[type.value];
          const replies = repliesFilter(originResponse.data.replies.slice(), list.value);
          originResponse.data.replies = replies;
        }
        return originResponse;
      },
    },
    {
      url: 'x/v2/reply/reply',
      response: (originResponse: ReplyReplyResponse) => {
        return originResponse;
      }
    }
  ],
  immediate: isChecked.value,
});

watch(isChecked, (value) => {
  value ? requestHook.enable() : requestHook.disable();
});


function addItem(value: string) {
  if (value) {
    list.value.push(value);
  }
}

function remove(value: string) {
  const index = list.value.indexOf(value);
  if (index > -1) {
    list.value.splice(index, 1);
  }
}
</script>

<template>
  <FloatContainer>
    <div class="main" box-border w="290px" px="8px" py="14px">
      <div flex items="center" mb-2>
        <span mr-1>激活隐藏</span>
        <Switch v-model="isChecked" />
        <span ml-1 text-xs text-zinc-400>切换后需要刷新页面</span>
      </div>
      <div flex flex-col>
        <InputWithType mb-1 @add="addItem" :label="tabs[type].name" />

        <div my-2 flex items-start gap-2>
          <div v-for="tab in Object.values(tabs)" :key="tab.value" :class="{ 'text-stone-500': type !== tab.value }"
            cursor-pointer @click="type = tab.value" transition-all duration-200>
            <span>{{ tab.name }}列表</span>
          </div>
        </div>

        <ul p-0 m-0 overflow-y-scroll h="430px" v-if="list.length > 0">
          <li v-for="item in list" :key="item" text-sm text-zinc-500 list-none mb-1 flex items-center
            justify-between pr-1>
            <span truncate mr-.5>{{ item }}</span>
            <span cursor-pointer p-.5 @click="remove(item)">✕</span>
          </li>
        </ul>
        <div text-sm text-zinc-500 flex justify-center items-center mt-30>这里是空的</div>
      </div>
    </div>
  </FloatContainer>
</template>
