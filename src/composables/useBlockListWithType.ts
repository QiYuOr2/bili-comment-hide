export enum BlockType {
  Keyword = 'keyword',
  UID = 'uid',
}

type useBlockListWithTypeOptions = Record<BlockType, { storageKey: string; defaultValue: string[] }>;

export function useBlockListWithType(options: useBlockListWithTypeOptions) {
  const lists = {} as Record<BlockType, Ref<string[]>>;

  for (const type in options) {
    const { storageKey, defaultValue } = options[type as BlockType];
    lists[type as BlockType] = useGMValue(storageKey, defaultValue);
  }

  const currentType = ref<BlockType>(BlockType.Keyword);

  const list = computed(() => lists[currentType.value].value);

  return {
    type: currentType,
    list,
  };
}

