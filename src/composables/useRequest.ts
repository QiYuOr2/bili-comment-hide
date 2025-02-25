import { MaybeRefOrGetter, toValue } from "vue";
import xhook from "xhook";
import type { BiliResponse } from "../types/response";

export interface Rule<T, R> {
  url: string;
  response: (originResponse: T) => R;
}

interface UseRequestHookOptions<T, R> {
  rules: MaybeRefOrGetter<Rule<T, R>[]>;
  immediate?: boolean;
}

function matchURL<T, R>(url: string, rule: Rule<T, R>) {
  return url.includes(rule.url);
}

export function useRequestHook<T, R>(options?: UseRequestHookOptions<T, R>) {
  xhook.after((request, response) => {
    const rules = toValue(options?.rules ?? []);

    for (const rule of rules) {
      if (matchURL(request.url, rule)) {
        Object.defineProperty(response, "data", {
          set(v) {
            this._data = rule.response(v);
          },
          get() {
            return this._data;
          },
        });
      }
    }
  });

  console.log("[bili-comment-hide] options?.immediate ", options?.immediate);
  options?.immediate ? xhook.enable() : xhook.disable();

  return { enable: xhook.enable, disable: xhook.disable };
}
