<template>
  <div
    :class="avatarClasses"
    :style="avatarStyle"
  >
    <!-- Ícone (se fornecido) -->
    <span v-if="icon" class="dss-avatar__icon material-icons" :style="iconStyle">
      {{ icon }}
    </span>

    <!-- Conteúdo (texto, imagem, etc.) -->
    <div v-if="!icon" :style="contentStyle" class="dss-avatar__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DssAvatar',

  props: {
    // Tamanho (compatível com Quasar - aceita qualquer unidade CSS)
    size: {
      type: String,
      default: null // null = usa tamanho padrão (48px)
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
      validator: (value) => !value || ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'].includes(value)
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
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    avatarClasses() {
      // Aplica cores usando classes utilitárias (padrão Quasar)
      let colorClasses = '';
      if (this.color) {
        colorClasses = `bg-${this.color} text-white`;
      }

      // Override de text color se especificado
      if (this.textColor) {
        colorClasses += ` text-${this.textColor}`;
      }

      return [
        'dss-avatar',
        colorClasses, // Classes utilitárias (.bg-primary, .text-primary)
        {
          'dss-avatar--square': this.square,
          'dss-avatar--rounded': this.rounded
        }
      ];
    },

    avatarStyle() {
      const style = {};

      // Tamanho customizável (compatível com Quasar)
      if (this.size) {
        style.width = this.size;
        style.height = this.size;
      }

      // Border-radius baseado nas props de forma
      if (this.square) {
        style.borderRadius = '0';
      } else if (this.rounded) {
        style.borderRadius = '8px'; // var(--dss-border-radius-md)
      } else {
        // Padrão: circular (50%)
        style.borderRadius = '50%';
      }

      return style;
    },

    iconStyle() {
      const style = {};

      // Calcular tamanho do ícone proporcionalmente ao avatar
      if (this.size) {
        // Extrair valor numérico do size (ex: "64px" -> 64)
        const sizeValue = parseFloat(this.size);

        // Ícone deve ser aproximadamente 50% do tamanho do avatar
        const iconSize = sizeValue * 0.5;

        style.fontSize = `${iconSize}px`;
      }

      return style;
    },

    contentStyle() {
      const style = {};

      // Font size customizável (compatível com Quasar)
      if (this.fontSize) {
        style.fontSize = this.fontSize;
      }

      return style;
    }
  }
}
</script>

<!-- Estilos carregados globalmente via dss-full.css -->
