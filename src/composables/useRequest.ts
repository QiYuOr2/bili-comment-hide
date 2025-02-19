import { MaybeRefOrGetter, toValue } from "vue";
import xhook from "xhook";

export interface Rule {
  url: string;
  response: (originResponse: unknown) => xhook.Response;
}

interface UseRequestHookOptions {
  rules: MaybeRefOrGetter<Rule[]>;
  immediate?: boolean;
}

function matchURL(url: string, rule: Rule) {
  return url.includes(rule.url);
}

export function useRequestHook(options?: UseRequestHookOptions) {
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
