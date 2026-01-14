import { computed as f, defineComponent as I, useSlots as F, createBlock as L, openBlock as a, resolveDynamicComponent as M, unref as o, mergeProps as z, withCtx as T, createElementBlock as d, createCommentVNode as r, createElementVNode as m, normalizeClass as h, normalizeStyle as v, toDisplayString as _, renderSlot as c, createTextVNode as C, useAttrs as E, withKeys as R, withModifiers as K, ref as N } from "vue";
function X(e, s) {
  return {
    buttonClasses: f(() => {
      let i = "";
      e.brand || (e.variant === "flat" || e.variant === "outline" ? i = `text-${e.color}` : i = `bg-${e.color} text-white`);
      const l = !!(e.label || s.hasDefaultSlot.value), u = !!(e.icon || e.iconRight) && !l;
      return [
        // Classe base
        "dss-button",
        // Variante visual
        `dss-button--${e.variant}`,
        // Classes de cor (utilitárias DSS)
        i,
        // Tamanho
        `dss-button--${e.size}`,
        // Classes condicionais
        {
          "dss-button--round": e.round,
          "dss-button--square": e.square,
          "dss-button--loading": e.loading,
          "dss-button--disabled": e.disabled,
          "dss-button--dense": e.dense,
          "dss-button--no-caps": e.noCaps,
          "dss-button--icon-only": u,
          // Brand
          [`dss-button--brand-${e.brand}`]: !!e.brand,
          // Layout
          [`dss-button--align-${e.align}`]: e.align !== "center",
          "dss-button--stack": e.stack,
          "dss-button--stretch": e.stretch,
          "dss-button--no-wrap": e.noWrap
        }
      ];
    })
  };
}
function j(e) {
  const s = f(() => e.to ? "router-link" : "button"), t = f(() => e.to ? null : e.type || "button");
  return {
    componentType: s,
    nativeType: t
  };
}
function G(e) {
  return {
    percentageStyle: f(() => e.percentage === null || e.percentage === void 0 ? null : {
      transform: `translateX(${e.percentage - 100}%)`
    })
  };
}
const H = {
  key: 0,
  class: "dss-button__loading"
}, J = {
  key: 2,
  class: "dss-button__icon dss-button__icon--left"
}, Q = {
  key: 3,
  class: "dss-button__label"
}, U = {
  key: 4,
  class: "dss-button__icon dss-button__icon--right"
}, Y = {
  key: 5,
  class: "dss-button__ripple"
}, rt = /* @__PURE__ */ I({
  name: "DssButton",
  inheritAttrs: !1,
  __name: "DssButton.ts",
  props: {
    label: { default: "" },
    icon: { default: "" },
    iconRight: { default: "" },
    variant: { default: "elevated" },
    color: { default: "primary" },
    size: { default: "md" },
    round: { type: Boolean, default: !1 },
    square: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    percentage: { default: null },
    darkPercentage: { type: Boolean, default: !1 },
    type: { default: "button" },
    to: { default: null },
    replace: { type: Boolean, default: !1 },
    brand: { default: null },
    dense: { type: Boolean, default: !1 },
    noCaps: { type: Boolean, default: !1 },
    align: { default: "center" },
    stack: { type: Boolean, default: !1 },
    stretch: { type: Boolean, default: !1 },
    noWrap: { type: Boolean, default: !1 },
    padding: { default: null },
    ripple: { type: Boolean, default: !1 },
    tabindex: { default: null }
  },
  emits: ["click"],
  setup(e, { emit: s }) {
    const t = e, i = s, l = F(), n = f(() => !!l.default), { componentType: u, nativeType: k } = j(t), { buttonClasses: S } = X(t, { hasDefaultSlot: n }), { percentageStyle: b } = G(t), $ = f(() => t.icon || ""), y = f(() => t.iconRight || ""), B = f(() => {
      const g = {};
      return t.padding && (g.padding = t.padding), g;
    }), x = f(() => t.disabled || t.loading ? -1 : t.tabindex !== null && t.tabindex !== void 0 ? typeof t.tabindex == "number" ? t.tabindex : parseInt(t.tabindex) : 0);
    function V(g) {
      !t.disabled && !t.loading && i("click", g);
    }
    return (g, A) => (a(), L(M(o(u)), z({
      type: o(k),
      to: e.to,
      replace: e.replace,
      disabled: e.disabled || e.loading,
      class: o(S),
      style: B.value,
      tabindex: x.value
    }, g.$attrs, { onClick: V }), {
      default: T(() => [
        e.loading && e.percentage === null ? (a(), d("span", H, [...A[0] || (A[0] = [
          m("span", { class: "dss-button__spinner" }, null, -1)
        ])])) : r("", !0),
        e.loading && e.percentage !== null ? (a(), d("span", {
          key: 1,
          class: h(["dss-button__progress", { "dss-button__progress--dark": e.darkPercentage }])
        }, [
          m("span", {
            class: "dss-button__progress-indicator",
            style: v(o(b))
          }, null, 4)
        ], 2)) : r("", !0),
        $.value && !e.loading ? (a(), d("span", J, _($.value), 1)) : r("", !0),
        e.label || g.$slots.default ? (a(), d("span", Q, [
          c(g.$slots, "default", {}, () => [
            C(_(e.label), 1)
          ])
        ])) : r("", !0),
        y.value && !e.loading ? (a(), d("span", U, _(y.value), 1)) : r("", !0),
        e.ripple ? (a(), d("span", Y)) : r("", !0)
      ]),
      _: 3
    }, 16, ["type", "to", "replace", "disabled", "class", "style", "tabindex"]));
  }
});
function Z(e) {
  return {
    badgeClasses: f(() => {
      let t = "";
      return e.outline || e.transparent ? t = `text-${e.color}` : t = `bg-${e.color} text-white`, e.textColor && (t += ` text-${e.textColor}`), [
        // Classe base
        "dss-badge",
        // Classes de cor (utilitárias DSS)
        t,
        // Classes condicionais
        {
          "dss-badge--floating": e.floating,
          "dss-badge--transparent": e.transparent,
          "dss-badge--multi-line": e.multiLine,
          "dss-badge--outline": e.outline,
          "dss-badge--rounded": e.rounded
        }
      ];
    })
  };
}
const ut = /* @__PURE__ */ I({
  name: "DssBadge",
  __name: "DssBadge.ts",
  props: {
    label: { default: "" },
    color: { default: "primary" },
    textColor: { default: null },
    transparent: { type: Boolean, default: !1 },
    outline: { type: Boolean, default: !1 },
    rounded: { type: Boolean, default: !1 },
    multiLine: { type: Boolean, default: !1 },
    floating: { type: Boolean, default: !1 },
    align: { default: null }
  },
  setup(e) {
    const s = e, { badgeClasses: t } = Z(s), i = f(() => {
      const l = {};
      return s.align && (l.verticalAlign = s.align), l;
    });
    return (l, n) => (a(), d("div", {
      class: h(o(t)),
      style: v(i.value)
    }, [
      c(l.$slots, "default", {}, () => [
        C(_(e.label), 1)
      ])
    ], 6));
  }
});
function ee(e) {
  return {
    avatarClasses: f(() => {
      let t = "";
      return e.color && (t = `bg-${e.color} text-white`), e.textColor && (t += ` text-${e.textColor}`), [
        // Classe base
        "dss-avatar",
        // Classes de cor (utilitárias DSS)
        t,
        // Classes condicionais de forma
        {
          "dss-avatar--square": e.square,
          "dss-avatar--rounded": e.rounded
        }
      ];
    })
  };
}
function te(e) {
  const s = f(() => {
    const l = {};
    return e.size && (l.width = e.size, l.height = e.size), e.square ? l.borderRadius = "0" : e.rounded ? l.borderRadius = "8px" : l.borderRadius = "50%", l;
  }), t = f(() => {
    const l = {};
    if (e.size) {
      const u = parseFloat(e.size) * 0.5;
      l.fontSize = `${u}px`;
    }
    return l;
  }), i = f(() => {
    const l = {};
    return e.fontSize && (l.fontSize = e.fontSize), l;
  });
  return {
    avatarStyle: s,
    iconStyle: t,
    contentStyle: i
  };
}
const ct = /* @__PURE__ */ I({
  name: "DssAvatar",
  __name: "DssAvatar.ts",
  props: {
    size: { default: null },
    fontSize: { default: null },
    color: { default: null },
    textColor: { default: null },
    icon: { default: null },
    square: { type: Boolean, default: !1 },
    rounded: { type: Boolean, default: !1 }
  },
  setup(e) {
    const s = e, { avatarClasses: t } = ee(s), { avatarStyle: i, iconStyle: l, contentStyle: n } = te(s);
    return (u, k) => (a(), d("div", {
      class: h(o(t)),
      style: v(o(i))
    }, [
      e.icon ? (a(), d("span", {
        key: 0,
        class: "dss-avatar__icon material-icons",
        style: v(o(l))
      }, _(e.icon), 5)) : r("", !0),
      e.icon ? r("", !0) : (a(), d("div", {
        key: 1,
        style: v(o(n)),
        class: "dss-avatar__content"
      }, [
        c(u.$slots, "default")
      ], 4))
    ], 6));
  }
});
function se(e) {
  return {
    cardClasses: f(() => [
      // Classe base
      "dss-card",
      // Variante visual
      `dss-card--${e.variant}`,
      // Classes condicionais
      {
        "dss-card--square": e.square,
        "dss-card--clickable": e.clickable,
        "dss-card--dark": e.dark,
        [`dss-card--brand-${e.brand}`]: e.brand
      }
    ])
  };
}
function ne(e, s) {
  return {
    cardAttrs: f(() => {
      const i = { ...s };
      return e.clickable && (i.tabindex = i.tabindex ?? "0", i.role = i.role ?? "article"), i;
    })
  };
}
function ae(e, s) {
  return {
    handleClick: (l) => {
      e.clickable && s("click", l);
    },
    handleKeydown: (l) => {
      e.clickable && s("click", l);
    }
  };
}
function le(e) {
  return {
    sectionClasses: f(() => [
      // Classe base
      "dss-card-section",
      // Classes condicionais
      {
        "dss-card-section--horizontal": e.horizontal
      }
    ])
  };
}
function de(e) {
  return {
    actionsClasses: f(() => [
      // Classe base
      "dss-card-actions",
      // Alinhamento horizontal
      `dss-card-actions--align-${e.align}`,
      // Classes condicionais
      {
        "dss-card-actions--vertical": e.vertical
      }
    ])
  };
}
const ie = /* @__PURE__ */ I({
  name: "DssCard",
  inheritAttrs: !1,
  __name: "DssCard.ts",
  props: {
    variant: { default: "elevated" },
    square: { type: Boolean, default: !1 },
    dark: { type: Boolean, default: !1 },
    brand: { default: null },
    clickable: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e, { emit: s }) {
    const t = e, i = s, l = E(), { cardClasses: n } = se(t), { cardAttrs: u } = ne(t, l), { handleClick: k, handleKeydown: S } = ae(t, i), b = f(() => ({}));
    return ($, y) => (a(), d("div", z({
      class: o(n),
      style: b.value
    }, o(u), {
      onClick: y[0] || (y[0] = //@ts-ignore
      (...B) => o(k) && o(k)(...B)),
      onKeydown: [
        y[1] || (y[1] = R(
          //@ts-ignore
          (...B) => o(S) && o(S)(...B),
          ["enter"]
        )),
        y[2] || (y[2] = R(K(
          //@ts-ignore
          (...B) => o(S) && o(S)(...B),
          ["prevent"]
        ), ["space"]))
      ]
    }), [
      c($.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), p = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [i, l] of s)
    t[i] = l;
  return t;
}, ft = /* @__PURE__ */ p(ie, [["__scopeId", "data-v-33285652"]]), oe = /* @__PURE__ */ I({
  name: "DssCardSection",
  __name: "DssCardSection.ts",
  props: {
    horizontal: { type: Boolean, default: !1 }
  },
  setup(e) {
    const s = e, { sectionClasses: t } = le(s);
    return (i, l) => (a(), d("div", {
      class: h(o(t))
    }, [
      c(i.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), bt = /* @__PURE__ */ p(oe, [["__scopeId", "data-v-80db62cf"]]), re = /* @__PURE__ */ I({
  name: "DssCardActions",
  __name: "DssCardActions.ts",
  props: {
    align: { default: "right" },
    vertical: { type: Boolean, default: !1 }
  },
  setup(e) {
    const s = e, { actionsClasses: t } = de(s);
    return (i, l) => (a(), d("div", {
      class: h(o(t))
    }, [
      c(i.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), _t = /* @__PURE__ */ p(re, [["__scopeId", "data-v-3af48abe"]]);
function ue(e, { isFocused: s, hasValue: t }) {
  const i = f(() => [
    // Classe base
    "dss-input",
    // Variante visual
    `dss-input--${e.variant}`,
    // Classes condicionais de estado
    {
      "dss-input--focused": s.value,
      "dss-input--error": e.error,
      "dss-input--disabled": e.disabled,
      "dss-input--readonly": e.readonly,
      "dss-input--dense": e.dense,
      "dss-input--loading": e.loading,
      "dss-input--filled": t.value,
      [`dss-input--brand-${e.brand}`]: e.brand
    }
  ]), l = f(() => [
    // Classe base
    "dss-input__label",
    // Classes condicionais
    {
      "dss-input__label--stack": e.stackLabel,
      "dss-input__label--float": t.value || s.value
    }
  ]), n = f(() => "dss-input__native");
  return {
    wrapperClasses: i,
    labelClasses: l,
    inputClasses: n
  };
}
function ce(e, s) {
  const t = N(!1), i = f(() => e.modelValue !== "" && e.modelValue !== null && e.modelValue !== void 0), l = f(() => e.error && e.errorMessage || e.hint || !!s.error || !!s.hint);
  return {
    isFocused: t,
    hasValue: i,
    hasBottomSlot: l
  };
}
function fe(e, s, t) {
  return {
    handleInput: (b) => {
      const $ = b.target;
      e("update:modelValue", $.value);
    },
    handleFocus: (b) => {
      t.value = !0, e("focus", b);
    },
    handleBlur: (b) => {
      t.value = !1, e("blur", b);
    },
    handleClear: () => {
      var b;
      e("update:modelValue", ""), (b = s.value) == null || b.focus();
    },
    focus: () => {
      var b;
      (b = s.value) == null || b.focus();
    },
    blur: () => {
      var b;
      (b = s.value) == null || b.blur();
    }
  };
}
const be = {
  key: 0,
  class: "dss-input__before"
}, _e = { class: "dss-input__field" }, he = {
  key: 0,
  class: "dss-input__prepend"
}, ye = { class: "dss-input__control" }, ge = ["type", "value", "placeholder", "disabled", "readonly"], pe = {
  key: 1,
  class: "dss-input__append"
}, me = {
  key: 1,
  class: "dss-input__after"
}, ve = {
  key: 2,
  class: "dss-input__bottom"
}, Ce = {
  key: 0,
  class: "dss-input__error"
}, ke = {
  key: 1,
  class: "dss-input__hint"
}, Se = /* @__PURE__ */ I({
  name: "DssInput",
  inheritAttrs: !1,
  __name: "DssInput.ts",
  props: {
    modelValue: { default: "" },
    variant: { default: "outlined" },
    type: { default: "text" },
    dense: { type: Boolean, default: !1 },
    brand: { default: null },
    label: { default: "" },
    stackLabel: { type: Boolean, default: !1 },
    placeholder: { default: "" },
    hint: { default: "" },
    errorMessage: { default: "" },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(e, { expose: s, emit: t }) {
    const i = e, l = t, n = F(), u = N(null), { isFocused: k, hasValue: S, hasBottomSlot: b } = ce(i, n), { wrapperClasses: $, labelClasses: y, inputClasses: B } = ue(i, { isFocused: k, hasValue: S }), { handleInput: x, handleFocus: V, handleBlur: g, handleClear: A, focus: O, blur: W } = fe(
      l,
      u,
      k
    );
    return s({
      focus: O,
      blur: W
    }), (D, q) => (a(), d("div", {
      class: h(o($))
    }, [
      o(n).before ? (a(), d("div", be, [
        c(D.$slots, "before")
      ])) : r("", !0),
      m("div", _e, [
        o(n).prepend ? (a(), d("div", he, [
          c(D.$slots, "prepend")
        ])) : r("", !0),
        m("div", ye, [
          e.label || o(n).label ? (a(), d("label", {
            key: 0,
            class: h(o(y))
          }, [
            c(D.$slots, "label", {}, () => [
              C(_(e.label), 1)
            ])
          ], 2)) : r("", !0),
          m("input", z({
            ref_key: "inputRef",
            ref: u,
            type: e.type,
            value: e.modelValue,
            placeholder: e.placeholder,
            disabled: e.disabled,
            readonly: e.readonly,
            class: o(B)
          }, D.$attrs, {
            onInput: q[0] || (q[0] = //@ts-ignore
            (...w) => o(x) && o(x)(...w)),
            onFocus: q[1] || (q[1] = //@ts-ignore
            (...w) => o(V) && o(V)(...w)),
            onBlur: q[2] || (q[2] = //@ts-ignore
            (...w) => o(g) && o(g)(...w))
          }), null, 16, ge)
        ]),
        o(n).append || e.clearable ? (a(), d("div", pe, [
          c(D.$slots, "append"),
          e.clearable && e.modelValue ? (a(), d("button", {
            key: 0,
            class: "dss-input__clear",
            type: "button",
            onClick: q[3] || (q[3] = //@ts-ignore
            (...w) => o(A) && o(A)(...w)),
            "aria-label": "Clear input"
          }, " × ")) : r("", !0)
        ])) : r("", !0)
      ]),
      o(n).after ? (a(), d("div", me, [
        c(D.$slots, "after")
      ])) : r("", !0),
      o(b) ? (a(), d("div", ve, [
        e.error && e.errorMessage ? (a(), d("div", Ce, [
          c(D.$slots, "error", {}, () => [
            C(_(e.errorMessage), 1)
          ])
        ])) : e.hint ? (a(), d("div", ke, [
          c(D.$slots, "hint", {}, () => [
            C(_(e.hint), 1)
          ])
        ])) : r("", !0)
      ])) : r("", !0)
    ], 2));
  }
}), P = {
  "dss-input": "_dss-input_dqnng_32",
  "dss-input__field": "_dss-input__field_dqnng_43",
  "dss-input--dense": "_dss-input--dense_dqnng_54",
  "dss-input__control": "_dss-input__control_dqnng_61",
  "dss-input__label": "_dss-input__label_dqnng_77",
  "dss-input__label--float": "_dss-input__label--float_dqnng_90",
  "dss-input__label--stack": "_dss-input__label--stack_dqnng_97",
  "dss-input__native": "_dss-input__native_dqnng_107",
  "dss-input--disabled": "_dss-input--disabled_dqnng_137",
  "dss-input--readonly": "_dss-input--readonly_dqnng_143",
  "dss-input__before": "_dss-input__before_dqnng_150",
  "dss-input__after": "_dss-input__after_dqnng_151",
  "dss-input__prepend": "_dss-input__prepend_dqnng_152",
  "dss-input__append": "_dss-input__append_dqnng_153",
  "dss-input__clear": "_dss-input__clear_dqnng_173",
  "dss-input__bottom": "_dss-input__bottom_dqnng_201",
  "dss-input__hint": "_dss-input__hint_dqnng_210",
  "dss-input__error": "_dss-input__error_dqnng_214",
  "dss-input--loading": "_dss-input--loading_dqnng_232",
  "dss-input-spin": "_dss-input-spin_dqnng_1",
  "dss-input--filled": "_dss-input--filled_dqnng_268",
  "dss-input--focused": "_dss-input--focused_dqnng_276",
  "dss-input--error": "_dss-input--error_dqnng_284",
  "dss-input--outlined": "_dss-input--outlined_dqnng_319",
  "dss-input--standout": "_dss-input--standout_dqnng_377",
  "dss-input--borderless": "_dss-input--borderless_dqnng_448",
  "dss-input--brand-hub": "_dss-input--brand-hub_dqnng_622",
  "dss-input--brand-water": "_dss-input--brand-water_dqnng_661",
  "dss-input--brand-waste": "_dss-input--brand-waste_dqnng_692"
}, Be = {
  $style: P
}, ht = /* @__PURE__ */ p(Se, [["__cssModules", Be]]), $e = {
  name: "DssButton",
  inheritAttrs: !1,
  props: {
    // Content
    label: {
      type: String,
      default: ""
    },
    // Ícone à esquerda (compatível com Quasar)
    icon: {
      type: String,
      default: ""
    },
    // Ícone à direita (compatível com Quasar)
    iconRight: {
      type: String,
      default: ""
    },
    // Visual Variant
    variant: {
      type: String,
      default: "elevated",
      validator: (e) => ["elevated", "flat", "outline", "unelevated", "push", "glossy"].includes(e)
    },
    // Color
    color: {
      type: String,
      default: "primary",
      validator: (e) => ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(e)
    },
    // Size
    size: {
      type: String,
      default: "md",
      validator: (e) => ["xs", "sm", "md", "lg", "xl"].includes(e)
    },
    // Shape
    round: {
      type: Boolean,
      default: !1
    },
    square: {
      type: Boolean,
      default: !1
    },
    // States
    loading: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    // Loading Progress (compatível com Quasar)
    percentage: {
      type: Number,
      default: null,
      validator: (e) => e === null || e >= 0 && e <= 100
    },
    darkPercentage: {
      type: Boolean,
      default: !1
    },
    // Behavior
    type: {
      type: String,
      default: "button",
      validator: (e) => ["button", "submit", "reset"].includes(e)
    },
    // Router (if using Vue Router)
    to: {
      type: [String, Object],
      default: null
    },
    replace: {
      type: Boolean,
      default: !1
    },
    // Brand
    brand: {
      type: String,
      default: null,
      validator: (e) => !e || ["hub", "water", "waste"].includes(e)
    },
    // Dense
    dense: {
      type: Boolean,
      default: !1
    },
    // No caps (disable uppercase transform)
    noCaps: {
      type: Boolean,
      default: !1
    },
    // Interaction (compatível com Quasar)
    ripple: {
      type: Boolean,
      default: !1
    },
    tabindex: {
      type: [Number, String],
      default: null
    },
    // Layout (compatível com Quasar)
    align: {
      type: String,
      default: "center",
      validator: (e) => ["left", "center", "right", "between", "around", "evenly"].includes(e)
    },
    stack: {
      type: Boolean,
      default: !1
    },
    stretch: {
      type: Boolean,
      default: !1
    },
    noWrap: {
      type: Boolean,
      default: !1
    },
    padding: {
      type: String,
      default: null
      // null = usa padding padrão do DSS
    }
  },
  computed: {
    componentType() {
      return this.to ? "router-link" : "button";
    },
    nativeType() {
      return this.to ? null : this.type;
    },
    // Ícone à esquerda (compatível com Quasar)
    computedIconLeft() {
      return this.icon || "";
    },
    // Ícone à direita (compatível com Quasar)
    computedIconRight() {
      return this.iconRight || "";
    },
    buttonClasses() {
      let e = "";
      return this.brand || (this.variant === "flat" || this.variant === "outline" ? e = `text-${this.color}` : e = `bg-${this.color} text-white`), [
        "dss-button",
        `dss-button--${this.variant}`,
        e,
        // Classes utilitárias (.bg-primary, .text-primary) - vazio se brand
        `dss-button--${this.size}`,
        {
          "dss-button--round": this.round,
          "dss-button--square": this.square,
          "dss-button--loading": this.loading,
          "dss-button--disabled": this.disabled,
          "dss-button--dense": this.dense,
          "dss-button--no-caps": this.noCaps,
          "dss-button--icon-only": (this.computedIconLeft || this.computedIconRight) && !this.label && !this.$slots.default,
          [`dss-button--brand-${this.brand}`]: this.brand,
          // Layout classes (compatível com Quasar)
          [`dss-button--align-${this.align}`]: this.align !== "center",
          "dss-button--stack": this.stack,
          "dss-button--stretch": this.stretch,
          "dss-button--no-wrap": this.noWrap
        }
      ];
    },
    // Estilo inline para padding customizável (compatível com Quasar)
    buttonStyle() {
      const e = {};
      return this.padding && (e.padding = this.padding), e;
    },
    // Barra de progresso (compatível com Quasar)
    percentageStyle() {
      return this.percentage === null ? null : {
        transform: `translateX(${this.percentage - 100}%)`
      };
    },
    // Tabindex computado (compatível com Quasar)
    computedTabindex() {
      return this.disabled || this.loading ? -1 : this.tabindex !== null ? this.tabindex : 0;
    }
  },
  methods: {
    handleClick(e) {
      !this.disabled && !this.loading && this.$emit("click", e);
    }
  }
}, De = {
  key: 0,
  class: "dss-button__loading"
}, qe = {
  key: 2,
  class: "dss-button__icon dss-button__icon--left"
}, we = {
  key: 3,
  class: "dss-button__label"
}, Ie = {
  key: 4,
  class: "dss-button__icon dss-button__icon--right"
}, ze = {
  key: 5,
  class: "dss-button__ripple"
};
function Ae(e, s, t, i, l, n) {
  return a(), L(M(n.componentType), z({
    type: n.nativeType,
    to: t.to,
    replace: t.replace,
    disabled: t.disabled || t.loading,
    class: n.buttonClasses,
    style: n.buttonStyle,
    tabindex: n.computedTabindex
  }, e.$attrs, { onClick: n.handleClick }), {
    default: T(() => [
      t.loading && t.percentage === null ? (a(), d("span", De, [...s[0] || (s[0] = [
        m("span", { class: "dss-button__spinner" }, null, -1)
      ])])) : r("", !0),
      t.loading && t.percentage !== null ? (a(), d("span", {
        key: 1,
        class: h(["dss-button__progress", { "dss-button__progress--dark": t.darkPercentage }])
      }, [
        m("span", {
          class: "dss-button__progress-indicator",
          style: v(n.percentageStyle)
        }, null, 4)
      ], 2)) : r("", !0),
      n.computedIconLeft && !t.loading ? (a(), d("span", qe, _(n.computedIconLeft), 1)) : r("", !0),
      t.label || e.$slots.default ? (a(), d("span", we, [
        c(e.$slots, "default", {}, () => [
          C(_(t.label), 1)
        ])
      ])) : r("", !0),
      n.computedIconRight && !t.loading ? (a(), d("span", Ie, _(n.computedIconRight), 1)) : r("", !0),
      t.ripple ? (a(), d("span", ze)) : r("", !0)
    ]),
    _: 3
  }, 16, ["type", "to", "replace", "disabled", "class", "style", "tabindex", "onClick"]);
}
const xe = /* @__PURE__ */ p($e, [["render", Ae]]), Ve = {
  name: "DssBadge",
  props: {
    // Conteúdo
    label: {
      type: [Number, String],
      default: ""
    },
    // Cores (compatível com Quasar)
    color: {
      type: String,
      default: "primary",
      validator: (e) => ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(e)
    },
    textColor: {
      type: String,
      default: null
    },
    // Posicionamento (compatível com Quasar)
    floating: {
      type: Boolean,
      default: !1
    },
    align: {
      type: String,
      default: null,
      validator: (e) => !e || ["top", "middle", "bottom"].includes(e)
    },
    // Aparência (compatível com Quasar)
    transparent: {
      type: Boolean,
      default: !1
    },
    multiLine: {
      type: Boolean,
      default: !1
    },
    outline: {
      type: Boolean,
      default: !1
    },
    rounded: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    badgeClasses() {
      this.outline === !0 || this.transparent === !0 ? this.color : this.textColor;
      let e = "";
      return this.outline === !0 || this.transparent === !0 ? e = `text-${this.color}` : e = `bg-${this.color} text-white`, this.textColor && (e += ` text-${this.textColor}`), [
        "dss-badge",
        e,
        // Classes utilitárias (.bg-primary, .text-primary)
        {
          "dss-badge--floating": this.floating,
          "dss-badge--transparent": this.transparent,
          "dss-badge--multi-line": this.multiLine,
          "dss-badge--outline": this.outline,
          "dss-badge--rounded": this.rounded
        }
      ];
    },
    badgeStyle() {
      const e = {};
      return this.align && (e.verticalAlign = this.align), e;
    }
  }
};
function Re(e, s, t, i, l, n) {
  return a(), d("div", {
    class: h(n.badgeClasses),
    style: v(n.badgeStyle)
  }, [
    c(e.$slots, "default", {}, () => [
      C(_(t.label), 1)
    ])
  ], 6);
}
const Fe = /* @__PURE__ */ p(Ve, [["render", Re]]), Le = {
  name: "DssAvatar",
  props: {
    // Tamanho (compatível com Quasar - aceita qualquer unidade CSS)
    size: {
      type: String,
      default: null
      // null = usa tamanho padrão (48px)
    },
    // Tipografia
    fontSize: {
      type: String,
      default: null
    },
    // Cores (compatível com Quasar)
    color: {
      type: String,
      default: null,
      validator: (e) => !e || ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(e)
    },
    textColor: {
      type: String,
      default: null
    },
    // Ícone
    icon: {
      type: String,
      default: null
    },
    // Forma (compatível com Quasar)
    square: {
      type: Boolean,
      default: !1
    },
    rounded: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    avatarClasses() {
      let e = "";
      return this.color && (e = `bg-${this.color} text-white`), this.textColor && (e += ` text-${this.textColor}`), [
        "dss-avatar",
        e,
        // Classes utilitárias (.bg-primary, .text-primary)
        {
          "dss-avatar--square": this.square,
          "dss-avatar--rounded": this.rounded
        }
      ];
    },
    avatarStyle() {
      const e = {};
      return this.size && (e.width = this.size, e.height = this.size), this.square ? e.borderRadius = "0" : this.rounded ? e.borderRadius = "8px" : e.borderRadius = "50%", e;
    },
    iconStyle() {
      const e = {};
      if (this.size) {
        const t = parseFloat(this.size) * 0.5;
        e.fontSize = `${t}px`;
      }
      return e;
    },
    contentStyle() {
      const e = {};
      return this.fontSize && (e.fontSize = this.fontSize), e;
    }
  }
};
function Me(e, s, t, i, l, n) {
  return a(), d("div", {
    class: h(n.avatarClasses),
    style: v(n.avatarStyle)
  }, [
    t.icon ? (a(), d("span", {
      key: 0,
      class: "dss-avatar__icon material-icons",
      style: v(n.iconStyle)
    }, _(t.icon), 5)) : r("", !0),
    t.icon ? r("", !0) : (a(), d("div", {
      key: 1,
      style: v(n.contentStyle),
      class: "dss-avatar__content"
    }, [
      c(e.$slots, "default")
    ], 4))
  ], 6);
}
const Te = /* @__PURE__ */ p(Le, [["render", Me]]), Ke = {
  name: "DssCard",
  props: {
    /**
     * Visual variant of the card
     * @values elevated, flat, bordered, outlined
     */
    variant: {
      type: String,
      default: "elevated",
      validator: (e) => ["elevated", "flat", "bordered", "outlined"].includes(e)
    },
    /**
     * Remove border-radius (square corners)
     */
    square: {
      type: Boolean,
      default: !1
    },
    /**
     * Make card clickable (adds hover effects)
     */
    clickable: {
      type: Boolean,
      default: !1
    },
    /**
     * Dark mode variant
     */
    dark: {
      type: Boolean,
      default: !1
    },
    /**
     * Brand variant (Hub, Water, Waste)
     * @values null, hub, water, waste
     */
    brand: {
      type: String,
      default: null,
      validator: (e) => !e || ["hub", "water", "waste"].includes(e)
    }
  },
  emits: ["click"],
  computed: {
    cardClasses() {
      return [
        "dss-card",
        `dss-card--${this.variant}`,
        {
          "dss-card--square": this.square,
          "dss-card--clickable": this.clickable,
          "dss-card--dark": this.dark,
          [`dss-card--brand-${this.brand}`]: this.brand
        }
      ];
    },
    cardStyles() {
      return {};
    },
    /**
     * Adiciona atributos de acessibilidade quando clickable
     */
    cardAttrs() {
      const e = { ...this.$attrs };
      return this.clickable && (e.tabindex = e.tabindex ?? "0", e.role = e.role ?? "article"), e;
    }
  },
  methods: {
    handleClick(e) {
      this.clickable && this.$emit("click", e);
    },
    /**
     * Handler para navegação por teclado (Enter e Space)
     * Conforme WCAG 2.1 AA
     */
    handleKeydown(e) {
      this.clickable && this.$emit("click", e);
    }
  }
};
function Ne(e, s, t, i, l, n) {
  return a(), d("div", z({
    class: n.cardClasses,
    style: n.cardStyles
  }, n.cardAttrs, {
    onClick: s[0] || (s[0] = (...u) => n.handleClick && n.handleClick(...u)),
    onKeydown: [
      s[1] || (s[1] = R((...u) => n.handleKeydown && n.handleKeydown(...u), ["enter"])),
      s[2] || (s[2] = R(K((...u) => n.handleKeydown && n.handleKeydown(...u), ["prevent"]), ["space"]))
    ]
  }), [
    c(e.$slots, "default", {}, void 0, !0)
  ], 16);
}
const Pe = /* @__PURE__ */ p(Ke, [["render", Ne], ["__scopeId", "data-v-570cd789"]]), Oe = {
  name: "DssCardSection",
  props: {
    /**
     * Horizontal layout (flex-row)
     */
    horizontal: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    sectionClasses() {
      return [
        "dss-card-section",
        {
          "dss-card-section--horizontal": this.horizontal
        }
      ];
    }
  }
};
function We(e, s, t, i, l, n) {
  return a(), d("div", {
    class: h(n.sectionClasses)
  }, [
    c(e.$slots, "default", {}, void 0, !0)
  ], 2);
}
const Ee = /* @__PURE__ */ p(Oe, [["render", We], ["__scopeId", "data-v-a4819ae3"]]), Xe = {
  name: "DssCardActions",
  props: {
    /**
     * Alignment of actions
     * @values left, center, right, between, around
     */
    align: {
      type: String,
      default: "right",
      validator: (e) => ["left", "center", "right", "between", "around"].includes(e)
    },
    /**
     * Vertical alignment (stacked buttons)
     */
    vertical: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    actionsClasses() {
      return [
        "dss-card-actions",
        `dss-card-actions--align-${this.align}`,
        {
          "dss-card-actions--vertical": this.vertical
        }
      ];
    }
  }
};
function je(e, s, t, i, l, n) {
  return a(), d("div", {
    class: h(n.actionsClasses)
  }, [
    c(e.$slots, "default", {}, void 0, !0)
  ], 2);
}
const Ge = /* @__PURE__ */ p(Xe, [["render", je], ["__scopeId", "data-v-fa8188fe"]]), He = {
  name: "DssInput",
  inheritAttrs: !1,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    variant: {
      type: String,
      default: "outlined",
      validator: (e) => ["filled", "outlined", "standout", "borderless"].includes(e)
    },
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: ""
    },
    stackLabel: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    error: {
      type: Boolean,
      default: !1
    },
    errorMessage: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    dense: {
      type: Boolean,
      default: !1
    },
    clearable: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    brand: {
      type: String,
      default: null,
      validator: (e) => !e || ["hub", "water", "waste"].includes(e)
    }
  },
  data() {
    return {
      isFocused: !1
    };
  },
  computed: {
    wrapperClasses() {
      return [
        "dss-input",
        `dss-input--${this.variant}`,
        {
          "dss-input--focused": this.isFocused,
          "dss-input--error": this.error,
          "dss-input--disabled": this.disabled,
          "dss-input--readonly": this.readonly,
          "dss-input--dense": this.dense,
          "dss-input--loading": this.loading,
          "dss-input--filled": this.hasValue,
          [`dss-input--brand-${this.brand}`]: this.brand
        }
      ];
    },
    labelClasses() {
      return [
        "dss-input__label",
        {
          "dss-input__label--stack": this.stackLabel,
          "dss-input__label--float": this.hasValue || this.isFocused
        }
      ];
    },
    inputClasses() {
      return "dss-input__native";
    },
    hasValue() {
      return this.modelValue !== "" && this.modelValue !== null && this.modelValue !== void 0;
    },
    hasBottomSlot() {
      return this.error && this.errorMessage || this.hint || this.$slots.error || this.$slots.hint;
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    handleFocus(e) {
      this.isFocused = !0, this.$emit("focus", e);
    },
    handleBlur(e) {
      this.isFocused = !1, this.$emit("blur", e);
    },
    handleClear() {
      this.$emit("update:modelValue", ""), this.$refs.inputRef.focus();
    },
    focus() {
      var e;
      (e = this.$refs.inputRef) == null || e.focus();
    },
    blur() {
      var e;
      (e = this.$refs.inputRef) == null || e.blur();
    }
  }
}, Je = {
  key: 0,
  class: "dss-input__before"
}, Qe = { class: "dss-input__field" }, Ue = {
  key: 0,
  class: "dss-input__prepend"
}, Ye = { class: "dss-input__control" }, Ze = ["type", "value", "placeholder", "disabled", "readonly"], et = {
  key: 1,
  class: "dss-input__append"
}, tt = {
  key: 1,
  class: "dss-input__after"
}, st = {
  key: 2,
  class: "dss-input__bottom"
}, nt = {
  key: 0,
  class: "dss-input__error"
}, at = {
  key: 1,
  class: "dss-input__hint"
};
function lt(e, s, t, i, l, n) {
  return a(), d("div", {
    class: h(n.wrapperClasses)
  }, [
    e.$slots.before ? (a(), d("div", Je, [
      c(e.$slots, "before")
    ])) : r("", !0),
    m("div", Qe, [
      e.$slots.prepend ? (a(), d("div", Ue, [
        c(e.$slots, "prepend")
      ])) : r("", !0),
      m("div", Ye, [
        t.label || e.$slots.label ? (a(), d("label", {
          key: 0,
          class: h(n.labelClasses)
        }, [
          c(e.$slots, "label", {}, () => [
            C(_(t.label), 1)
          ])
        ], 2)) : r("", !0),
        m("input", z({
          ref: "inputRef",
          type: t.type,
          value: t.modelValue,
          placeholder: t.placeholder,
          disabled: t.disabled,
          readonly: t.readonly,
          class: n.inputClasses
        }, e.$attrs, {
          onInput: s[0] || (s[0] = (...u) => n.handleInput && n.handleInput(...u)),
          onFocus: s[1] || (s[1] = (...u) => n.handleFocus && n.handleFocus(...u)),
          onBlur: s[2] || (s[2] = (...u) => n.handleBlur && n.handleBlur(...u))
        }), null, 16, Ze)
      ]),
      e.$slots.append || t.clearable ? (a(), d("div", et, [
        c(e.$slots, "append"),
        t.clearable && t.modelValue ? (a(), d("button", {
          key: 0,
          class: "dss-input__clear",
          type: "button",
          onClick: s[3] || (s[3] = (...u) => n.handleClear && n.handleClear(...u)),
          "aria-label": "Clear input"
        }, " × ")) : r("", !0)
      ])) : r("", !0)
    ]),
    e.$slots.after ? (a(), d("div", tt, [
      c(e.$slots, "after")
    ])) : r("", !0),
    n.hasBottomSlot ? (a(), d("div", st, [
      t.error && t.errorMessage ? (a(), d("div", nt, [
        c(e.$slots, "error", {}, () => [
          C(_(t.errorMessage), 1)
        ])
      ])) : t.hint ? (a(), d("div", at, [
        c(e.$slots, "hint", {}, () => [
          C(_(t.hint), 1)
        ])
      ])) : r("", !0)
    ])) : r("", !0)
  ], 2);
}
const dt = {
  $style: P
}, it = /* @__PURE__ */ p(He, [["render", lt], ["__cssModules", dt]]), yt = {
  install(e, s = {}) {
    e.component("DssButton", xe), e.component("DssBadge", Fe), e.component("DssAvatar", Te), e.component("DssCard", Pe), e.component("DssCardSection", Ee), e.component("DssCardActions", Ge), e.component("DssInput", it), s.brand && e.provide("dss-default-brand", s.brand), s.theme && e.provide("dss-default-theme", s.theme), process.env.NODE_ENV !== "production" && (console.log("✅ Design System Sansys instalado com sucesso!"), console.log("📦 Componentes registrados:", [
      "DssButton",
      "DssBadge",
      "DssAvatar",
      "DssCard",
      "DssCardSection",
      "DssCardActions",
      "DssInput"
    ]), s.brand && console.log("🎨 Brand padrão:", s.brand));
  }
};
/**
 * ==========================================================================
 * DESIGN SYSTEM SANSYS (DSS) v2.0
 * Sistema de Design profissional com componentes Vue 3
 * ==========================================================================
 *
 * @author Hebert Daniel Oliveira Chaves
 * @license MIT
 * @version 2.0.0
 *
 * @description
 * Design System completo baseado em tokens semânticos, com componentes
 * Vue 3, acessibilidade WCAG 2.1 AA e brandabilidade (Hub, Water, Waste).
 *
 * @features
 * - ✅ Componentes Vue 3 (Composition API + Options API)
 * - ✅ Tokens DSS (cores, spacing, typography, etc.)
 * - ✅ Acessibilidade WCAG 2.1 AA
 * - ✅ Brandabilidade (Hub 🟠, Water 🔵, Waste 🟢)
 * - ✅ Dark Mode Support
 * - ✅ TypeScript ready
 * - ✅ Tree-shakeable
 *
 * @usage
 *
 * // 1. Instalação global (todos os componentes)
 * import DesignSystemSansys from '@sansys/design-system'
 * import '@sansys/design-system/css'
 *
 * app.use(DesignSystemSansys, {
 *   brand: 'hub' // opcional
 * })
 *
 * // 2. Importação individual (tree-shaking)
 * import { DssButton, DssCard, DssInput } from '@sansys/design-system'
 * import '@sansys/design-system/css'
 *
 * ==========================================================================
 */
const gt = "2.2.0", pt = {
  name: "Design System Sansys",
  version: "2.2.0",
  description: "Sistema de Design profissional com componentes Vue 3 e tokens DSS",
  author: "Hebert Daniel Oliveira Chaves",
  license: "MIT",
  components: [
    "DssButton",
    "DssBadge",
    "DssAvatar",
    "DssCard",
    "DssCardSection",
    "DssCardActions",
    "DssInput"
  ],
  brands: ["hub", "water", "waste"],
  accessibility: "WCAG 2.1 AA",
  frameworks: ["Vue 3"]
};
export {
  ct as DssAvatar,
  ut as DssBadge,
  rt as DssButton,
  ft as DssCard,
  _t as DssCardActions,
  bt as DssCardSection,
  ht as DssInput,
  yt as default,
  pt as metadata,
  gt as version
};
//# sourceMappingURL=dss.es.js.map
