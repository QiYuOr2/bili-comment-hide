import { GM_getValue, GM_setValue } from "$";
import { computed, Ref, ref, watch } from "vue";


export function useGMValue<T>(key: string, initialValue: T): Ref<T> {
  
  const _value = ref<T>(GM_getValue(key, initialValue));

  watch(
    _value,
    (v) => {
      GM_setValue(key, v);
    },
    { deep: true }
  );

  return computed({
    set(v: T) {
      _value.value = v;
    },
    get() {
      return _value.value;
    },
  })
}
