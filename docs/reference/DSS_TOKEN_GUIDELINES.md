# DSS - Guia de Boas Práticas de Tokens

> **📅 Criado:** Janeiro 2025
> **🎯 Objetivo:** Documentar as melhores práticas para criação e uso de tokens no DSS
> **✅ Baseado em:** Material Design (Google), Polaris (Shopify), Carbon (IBM), Chakra UI

---

## 📋 Índice

1. [Filosofia Central](#filosofia-central)
2. [Regras de Ouro](#regras-de-ouro)
3. [Estrutura de Nomenclatura](#estrutura-de-nomenclatura)
4. [Tokens como Provedores](#tokens-como-provedores)
5. [Componentes como Consumidores](#componentes-como-consumidores)
6. [Anti-Padrões Comuns](#anti-padrões-comuns)
7. [Exemplos Práticos](#exemplos-práticos)
8. [Checklist de Validação](#checklist-de-validação)
9. [Status da Migração](#status-da-migração-janeiro-2025)
10. [Tabela DE/PARA - Tokens Deprecados](#tabela-depara---tokens-deprecados)

---

## 🎯 Filosofia Central

### **Separação de Responsabilidades**

O DSS segue uma arquitetura rigorosa de **separação de responsabilidades**:

```
┌─────────────────────────────────────────────────┐
│           TOKENS (Provedores)                   │
│  - Valores abstratos e genéricos                │
│  - Decisões de design semânticas                │
│  - Reutilizáveis por N componentes              │
│  - NÃO conhecem componentes específicos         │
└─────────────────────────────────────────────────┘
                    ▼ (consumo)
┌─────────────────────────────────────────────────┐
│        COMPONENTES (Consumidores)               │
│  - Decisões de implementação específicas        │
│  - Escolhem quais tokens usar                   │
│  - Podem combinar múltiplos tokens              │
│  - Contextualizam tokens para seu uso           │
└─────────────────────────────────────────────────┘
```

---

## ✅ Regras de Ouro

### **Regra #1: Tokens São Provedores, Não Consumidores**

❌ **ERRADO:** Criar tokens específicos para componentes
```scss
/* ❌ NÃO FAÇA ISSO */
:root {
  --dss-button-primary-color: var(--dss-primary);
  --dss-card-hub-gradient: linear-gradient(...);
  --dss-input-border-color: var(--dss-gray-300);
}
```

✅ **CORRETO:** Criar tokens genéricos, componentes escolhem
```scss
/* ✅ FAÇA ISSO - Tokens genéricos */
:root {
  --dss-action-primary: #1F86DE;
  --dss-gradient-hub-vertical: linear-gradient(...);
  --dss-border-default: var(--dss-gray-300);
}

/* ✅ Componentes consomem tokens */
.dss-button--primary {
  background: var(--dss-action-primary);
}

.dss-card--hub {
  background: var(--dss-gradient-hub-vertical);
}

.dss-input {
  border-color: var(--dss-border-default);
}
```

---

### **Regra #2: Um Token Serve N Componentes**

❌ **ERRADO:** 1 token = 1 componente
```scss
/* ❌ Não escalável */
--dss-button-spacing: 16px;      /* só button usa */
--dss-card-spacing: 16px;        /* só card usa */
--dss-input-spacing: 16px;       /* só input usa */
/* Para 50 componentes = 50 tokens duplicados! */
```

✅ **CORRETO:** 1 token = N componentes
```scss
/* ✅ Escalável infinitamente */
--dss-spacing-4: 16px;           /* TODOS usam */

/* Componentes consomem o mesmo token */
.dss-button { padding: var(--dss-spacing-4); }
.dss-card { padding: var(--dss-spacing-4); }
.dss-input { padding: var(--dss-spacing-4); }
/* 50 componentes = MESMO token! */
```

---

### **Regra #3: Componentes Podem Combinar Tokens**

❌ **ERRADO:** Token rígido que faz tudo
```scss
/* ❌ Token inflexível */
--dss-button-primary-background: linear-gradient(
  180deg,
  var(--dss-primary-light),
  var(--dss-primary)
);

/* Componente preso ao gradiente */
.dss-button--primary {
  background: var(--dss-button-primary-background);
}
```

✅ **CORRETO:** Tokens flexíveis que componente combina
```scss
/* ✅ Tokens flexíveis */
--dss-gradient-primary-vertical: linear-gradient(180deg, ...);
--dss-gradient-primary-diagonal: linear-gradient(135deg, ...);
--dss-action-primary: #1F86DE;

/* Componente escolhe e combina */
.dss-button--primary {
  background: var(--dss-gradient-primary-vertical);
}

.dss-button--primary.dss-button--glossy {
  background:
    var(--dss-gradient-shine),
    var(--dss-gradient-primary-diagonal);
}

.dss-button--primary.dss-button--flat {
  background: var(--dss-action-primary); /* sólido, sem gradiente */
}
```

---

### **Regra #4: Tokens Não Conhecem Componentes**

❌ **ERRADO:** Tokens que sabem onde serão usados
```scss
/* ❌ Violação SRP (Single Responsibility Principle) */
--dss-border-for-cards: 1px solid var(--dss-gray-300);
--dss-shadow-for-buttons: 0 2px 4px rgba(0,0,0,0.1);
--dss-padding-for-inputs: 12px 16px;
```

✅ **CORRETO:** Tokens abstratos e semânticos
```scss
/* ✅ Tokens semânticos abstratos */
--dss-border-default: 1px solid var(--dss-gray-300);
--dss-shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
--dss-spacing-3: 12px;
--dss-spacing-4: 16px;

/* Componentes decidem usar */
.dss-card { border: var(--dss-border-default); }
.dss-button { box-shadow: var(--dss-shadow-sm); }
.dss-input { padding: var(--dss-spacing-3) var(--dss-spacing-4); }
```

---

### **Regra #5: Novos Componentes = 0 Novos Tokens**

❌ **ERRADO:** Cada componente cria seus tokens
```scss
/* ❌ Explosão de tokens */
/* _button-tokens.scss */
--dss-button-*: ...;  /* +10 tokens */

/* _card-tokens.scss */
--dss-card-*: ...;    /* +10 tokens */

/* _input-tokens.scss */
--dss-input-*: ...;   /* +10 tokens */

/* Para 50 componentes = +500 tokens! 😱 */
```

✅ **CORRETO:** Componentes usam tokens existentes
```scss
/* ✅ Tokens semânticos globais (uma vez) */
--dss-action-primary: #1F86DE;
--dss-spacing-4: 16px;
--dss-border-default: 1px solid var(--dss-gray-300);

/* TODOS os componentes usam os mesmos tokens */
.dss-button--primary { background: var(--dss-action-primary); }
.dss-card { padding: var(--dss-spacing-4); }
.dss-input { border: var(--dss-border-default); }

/* 50 componentes = MESMOS tokens! 🎉 */
```

---

## 🏗️ Estrutura de Nomenclatura

### **Padrão de Nomenclatura DSS**

```scss
--dss-{categoria}-{subcategoria}-{variação}-{estado}
```

### **Categorias Principais**

#### **1. Cores Semânticas**
```scss
/* Ações */
--dss-action-primary              /* Ação principal (#1F86DE) */
--dss-action-primary-hover        /* Hover de ação principal */
--dss-action-primary-deep         /* Active de ação principal */
--dss-action-primary-light        /* Versão clara */
--dss-action-primary-disable      /* Estado desabilitado */

/* Feedback */
--dss-feedback-success            /* Sucesso (#4CAF50) */
--dss-feedback-error              /* Erro (#D32F2F) */
--dss-feedback-warning            /* Aviso (#FFC107) */
--dss-feedback-info               /* Informação (#03A9F4) */
```

#### **2. Cores de Marca**

**⚠️ IMPORTANTE:** As paletas de marca (Hub, Water, Waste) são **escalas de 11 tons** (50 a 950). Apesar de não terem tokens de estado explícitos, seguem um **padrão de uso para interações**:

**Padrão de Estados:**
- **disable** = -200 (desabilitado)
- **light** = -300 (variante clara)
- **hover/focus** = Principal + 2 níveis (ex: se principal é 600, hover é 800)
- **deep** = Mais escuro (950)

```scss
/* Hub (Laranja/Marrom) - 11 tokens */
--dss-hub-50: #fff9ed;            /* Mais claro */
--dss-hub-100: #fef2d6;
--dss-hub-200: #fde2ab;           /* 🔒 Disable Hub */
--dss-hub-300: #fbcb76;           /* ✨ Light Hub */
--dss-hub-400: #f8aa3f;
--dss-hub-500: #f5911a;
--dss-hub-600: #ef7a11;           /* ✅ Principal Hub */
--dss-hub-700: #bf590f;
--dss-hub-800: #984614;           /* 💡 Hover/Focus Hub (principal + 2 níveis) */
--dss-hub-900: #7a3614;
--dss-hub-950: #421d08;           /* 🎯 Deep Hub (mais escuro) */

/* Water (Azul) - 11 tokens */
--dss-water-50: #f0f7ff;          /* Mais claro */
--dss-water-100: #e0eefe;
--dss-water-200: #badefd;         /* 🔒 Disable Water */
--dss-water-300: #7dc4fc;         /* ✨ Light Water */
--dss-water-400: #38a6f8;
--dss-water-500: #0e88e4;         /* ✅ Principal Water */
--dss-water-600: #026cc7;
--dss-water-700: #0356a1;         /* 💡 Hover/Focus Water (principal + 2 níveis) */
--dss-water-800: #074a85;
--dss-water-900: #0c3e6e;
--dss-water-950: #082749;         /* 🎯 Deep Water (mais escuro) */

/* Waste (Verde) - 11 tokens */
--dss-waste-50: #edfcf4;          /* Mais claro */
--dss-waste-100: #d3f8e2;
--dss-waste-200: #abefcb;         /* 🔒 Disable Waste */
--dss-waste-300: #74e1ae;         /* ✨ Light Waste */
--dss-waste-400: #3ccb8d;
--dss-waste-500: #18b173;
--dss-waste-600: #0b8154;         /* ✅ Principal Waste */
--dss-waste-700: #0a724e;
--dss-waste-800: #0a5b3e;         /* 💡 Hover/Focus Waste (principal + 2 níveis) */
--dss-waste-900: #0a4a34;
--dss-waste-950: #042a1e;         /* 🎯 Deep Waste (mais escuro) */

/* 📝 RESUMO DE ESTADOS POR MARCA */
// Hub:   Principal=600  | Light=300  | Disable=200  | Hover/Focus=800  | Deep=950
// Water: Principal=500  | Light=300  | Disable=200  | Hover/Focus=700  | Deep=950
// Waste: Principal=600  | Light=300  | Disable=200  | Hover/Focus=800  | Deep=950
```

#### **3. Espaçamento**
```scss
--dss-spacing-0: 0px;
--dss-spacing-1: 4px;
--dss-spacing-2: 8px;
--dss-spacing-3: 12px;
--dss-spacing-4: 16px;            /* Base */
--dss-spacing-5: 20px;
--dss-spacing-6: 24px;
--dss-spacing-8: 32px;
--dss-spacing-10: 40px;
--dss-spacing-12: 48px;
--dss-spacing-16: 64px;
```

#### **4. Gradientes**
```scss
/* Por direção */
--dss-gradient-primary-vertical
--dss-gradient-primary-horizontal
--dss-gradient-primary-diagonal

/* Por marca */
--dss-gradient-hub-vertical
--dss-gradient-water-vertical
--dss-gradient-waste-vertical

/* Utilitários */
--dss-gradient-overlay
--dss-gradient-shine
```

#### **5. Sombras**
```scss
--dss-shadow-sm                   /* Pequena */
--dss-shadow-md                   /* Média */
--dss-shadow-lg                   /* Grande */
--dss-elevation-1                 /* Elevação sutil */
--dss-elevation-card-hover        /* Card em hover */
```

#### **6. Bordas**
```scss
--dss-border-default              /* 1px solid gray-300 */
--dss-border-subtle               /* Borda sutil */
--dss-radius-button: 4px;         /* Raio de botão */
--dss-radius-card: 12px;          /* Raio de card */
```

#### **7. Opacidade**

Sistema padronizado de transparências com **escala 0-100** e tokens semânticos para estados.

```scss
/* Escala Base (0-100) */
--dss-opacity-0: 0;               /* Invisível */
--dss-opacity-10: 0.1;            /* Overlay sutil */
--dss-opacity-20: 0.2;            /* Active state */
--dss-opacity-30: 0.3;            /* Progress indicator */
--dss-opacity-40: 0.4;            /* Disabled padrão */
--dss-opacity-50: 0.5;            /* Overlay médio */
--dss-opacity-60: 0.6;            /* Semi-transparente */
--dss-opacity-75: 0.75;           /* Backdrop */
--dss-opacity-100: 1;             /* Opaco */

/* Tokens Semânticos de Estados */
--dss-opacity-disabled: var(--dss-opacity-40);    /* ✅ Estado desabilitado padrão (0.4) */
--dss-opacity-hover: var(--dss-opacity-10);       /* Overlay de hover (0.1) */
--dss-opacity-active: var(--dss-opacity-20);      /* Overlay de active (0.2) */
--dss-opacity-selected: var(--dss-opacity-15);    /* Estado selecionado (0.15) */
--dss-opacity-overlay: var(--dss-opacity-50);     /* Overlay genérico (0.5) */
--dss-opacity-backdrop: var(--dss-opacity-75);    /* Backdrop modal/dialog (0.75) */

/* Tokens de Marca (Brand Overlays) */
--dss-opacity-brand-subtle: var(--dss-opacity-8);   /* 0.08 - Overlay muito sutil */
--dss-opacity-brand-light: var(--dss-opacity-12);   /* 0.12 - Overlay leve */
--dss-opacity-brand-medium: var(--dss-opacity-16);  /* 0.16 - Overlay médio */
--dss-opacity-brand-strong: var(--dss-opacity-24);  /* 0.24 - Overlay forte */
```

**⚠️ Regras de Uso:**
- **Disabled**: Use sempre `--dss-opacity-disabled` (0.4), não valores hardcoded
- **Interações**: Use tokens semânticos (`hover`, `active`, `selected`)
- **Overlays de Marca**: Use tokens `brand-*` quando aplicar overlay sobre cores de marca
- **Backdrop**: Use sempre `--dss-opacity-backdrop` (0.75) para fundo de modals/dialogs

---

## 🎨 Tokens como Provedores

### **O Que Tokens DEVEM Fornecer**

✅ **Valores abstratos e reutilizáveis**
```scss
/* ✅ BOM */
--dss-spacing-4: 16px;
--dss-action-primary: #1F86DE;
--dss-gradient-primary-vertical: linear-gradient(...);
```

✅ **Decisões de design semânticas**
```scss
/* ✅ BOM */
--dss-text-body: var(--dss-gray-900);
--dss-text-subtle: var(--dss-gray-600);
--dss-surface-default: var(--dss-white);
```

✅ **Escalas consistentes**
```scss
/* ✅ BOM - Escala de espaçamento */
--dss-spacing-1: 4px;
--dss-spacing-2: 8px;
--dss-spacing-3: 12px;
--dss-spacing-4: 16px;

/* ✅ BOM - Escala de sombras */
--dss-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--dss-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--dss-shadow-lg: 0 10px 15px rgba(0,0,0,0.15);
```

### **O Que Tokens NÃO DEVEM Fornecer**

❌ **Valores específicos de componentes**
```scss
/* ❌ RUIM */
--dss-button-padding: 12px 24px;
--dss-card-border-radius: 8px;
--dss-input-height: 44px;
```

❌ **Composições de estilos**
```scss
/* ❌ RUIM */
--dss-button-primary-styles:
  background: var(--dss-primary);
  color: white;
  padding: 12px 24px;
  /* Tokens não devem ter múltiplas propriedades */
```

❌ **Lógica de comportamento**
```scss
/* ❌ RUIM */
--dss-button-hover-transform: translateY(-2px);
--dss-card-transition: all 0.3s ease;
/* Use mixins para comportamentos */
```

---

## 🧩 Componentes como Consumidores

### **Como Componentes DEVEM Usar Tokens**

✅ **Escolher tokens apropriados**
```scss
/* ✅ CORRETO */
.dss-button--primary {
  background: var(--dss-action-primary);
  padding: var(--dss-spacing-3) var(--dss-spacing-6);
  border-radius: var(--dss-radius-button);
  box-shadow: var(--dss-shadow-sm);
}
```

✅ **Combinar múltiplos tokens**
```scss
/* ✅ CORRETO */
.dss-card--featured {
  background:
    var(--dss-gradient-shine),
    var(--dss-gradient-hub-diagonal);
  padding: var(--dss-spacing-6);
  border: 1px solid var(--dss-hub-300);
}
```

✅ **Criar variações inline quando necessário**
```scss
/* ✅ CORRETO - Gradiente específico inline */
.dss-card--hero {
  background: linear-gradient(
    135deg,
    var(--dss-hub-50) 0%,
    var(--dss-hub-100) 50%,
    var(--dss-white) 100%
  );
}
```

✅ **Sobrescrever com brandabilidade**
```scss
/* ✅ CORRETO */
.dss-button--primary {
  background: var(--dss-action-primary);
}

[data-brand="hub"] {
  .dss-button--primary {
    background: var(--dss-hub-600);
  }
}
```

### **Como Componentes NÃO DEVEM Usar Tokens**

❌ **Valores hard-coded**
```scss
/* ❌ ERRADO */
.dss-button {
  padding: 16px;          /* ❌ Use var(--dss-spacing-4) */
  color: #1F86DE;         /* ❌ Use var(--dss-action-primary) */
  border-radius: 4px;     /* ❌ Use var(--dss-radius-button) */
}
```

❌ **Criar tokens locais inline**
```scss
/* ❌ ERRADO */
.dss-button {
  --local-padding: 16px;  /* ❌ Use token global */
  padding: var(--local-padding);
}
```

---

## ❌ Anti-Padrões Comuns

### **Anti-Padrão #1: Especificidade Excessiva**

❌ **PROBLEMA:**
```scss
/* tokens/semantic/_gradients.scss */
--dss-gradient-button-primary: var(--dss-gradient-primary-vertical);
--dss-gradient-button-hub: var(--dss-gradient-hub-vertical);
--dss-gradient-card-hub: linear-gradient(135deg, var(--dss-hub-50) 0%, var(--dss-hub-100) 100%);
```

**Por quê é ruim?**
- 🔴 Não escalável (50 componentes = +500 tokens)
- 🔴 Não flexível (componente preso a 1 token)
- 🔴 Difícil manutenção (mudanças em múltiplos arquivos)

✅ **SOLUÇÃO:**
```scss
/* tokens/semantic/_gradients.scss - Apenas tokens genéricos */
--dss-gradient-primary-vertical: linear-gradient(...);
--dss-gradient-hub-vertical: linear-gradient(...);
--dss-gradient-hub-subtle: linear-gradient(135deg, var(--dss-hub-50) 0%, var(--dss-hub-100) 100%);

/* components/DssButton.module.scss - Componente escolhe */
.dss-button--primary {
  background: var(--dss-gradient-primary-vertical);
}

/* components/DssCard.module.scss - Componente escolhe */
.dss-card--hub {
  background: var(--dss-gradient-hub-subtle);
}
```

---

### **Anti-Padrão #2: Duplicação de Valores**

❌ **PROBLEMA:**
```scss
/* Mesmo valor em múltiplos tokens */
--dss-button-spacing: 16px;
--dss-card-spacing: 16px;
--dss-input-spacing: 16px;
--dss-form-spacing: 16px;
```

✅ **SOLUÇÃO:**
```scss
/* Um token para todos */
--dss-spacing-4: 16px;

/* Componentes usam o mesmo */
.dss-button { padding: var(--dss-spacing-4); }
.dss-card { padding: var(--dss-spacing-4); }
.dss-input { padding: var(--dss-spacing-4); }
.dss-form { gap: var(--dss-spacing-4); }
```

---

### **Anti-Padrão #3: Tokens Rígidos**

❌ **PROBLEMA:**
```scss
/* Token que faz tudo, sem flexibilidade */
--dss-button-primary-all:
  background: linear-gradient(...);
  color: white;
  padding: 12px 24px;
```

✅ **SOLUÇÃO:**
```scss
/* Tokens atômicos que componente combina */
--dss-gradient-primary-vertical: linear-gradient(...);
--dss-color-white: #FFFFFF;
--dss-spacing-3: 12px;
--dss-spacing-6: 24px;

.dss-button--primary {
  background: var(--dss-gradient-primary-vertical);
  color: var(--dss-color-white);
  padding: var(--dss-spacing-3) var(--dss-spacing-6);
}
```

---

## 📚 Exemplos Práticos

### **Exemplo 1: Refatorando Gradientes**

**ANTES (Anti-padrão):**
```scss
/* _gradients.scss */
--dss-gradient-button-primary: var(--dss-gradient-primary-vertical);
--dss-gradient-button-hub: var(--dss-gradient-hub-vertical);
--dss-gradient-card-hub: linear-gradient(135deg, var(--dss-hub-50) 0%, var(--dss-hub-100) 100%);

/* DssButton.module.scss */
.dss-button--primary {
  background: var(--dss-gradient-button-primary);
}
```

**DEPOIS (Padrão correto):**
```scss
/* _gradients.scss - Apenas tokens genéricos */
--dss-gradient-primary-vertical: linear-gradient(180deg, var(--dss-primary-light) 0%, var(--dss-primary) 100%);
--dss-gradient-hub-vertical: linear-gradient(180deg, var(--dss-hub-300) 0%, var(--dss-hub-500) 100%);
--dss-gradient-hub-subtle: linear-gradient(135deg, var(--dss-hub-50) 0%, var(--dss-hub-100) 100%);

/* DssButton.module.scss - Componente escolhe */
.dss-button--primary {
  background: var(--dss-gradient-primary-vertical);
}

[data-brand="hub"] {
  .dss-button--primary {
    background: var(--dss-gradient-hub-vertical);
  }
}

/* DssCard.module.scss - Componente escolhe */
.dss-card--hub {
  background: var(--dss-gradient-hub-subtle);
}
```

---

### **Exemplo 2: Sistema de Espaçamento Unificado**

**ANTES (Duplicação):**
```scss
--dss-button-padding-horizontal: 24px;
--dss-button-padding-vertical: 12px;
--dss-card-padding: 24px;
--dss-input-padding-x: 16px;
--dss-input-padding-y: 12px;
```

**DEPOIS (Escala unificada):**
```scss
/* Escala de espaçamento global */
--dss-spacing-3: 12px;
--dss-spacing-4: 16px;
--dss-spacing-6: 24px;

/* Componentes usam a escala */
.dss-button {
  padding: var(--dss-spacing-3) var(--dss-spacing-6);
}

.dss-card {
  padding: var(--dss-spacing-6);
}

.dss-input {
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
}
```

---

## ✅ Checklist de Validação

### **Antes de Criar um Token**

- [ ] ✅ O token é **genérico e reutilizável**?
- [ ] ✅ O token **NÃO menciona componentes** no nome?
- [ ] ✅ Múltiplos componentes **podem usar** este token?
- [ ] ✅ O token segue a **nomenclatura padrão** DSS?
- [ ] ✅ O token está na **categoria correta** (actions, spacing, etc.)?
- [ ] ❌ O token **NÃO é específico** para um componente?
- [ ] ❌ O token **NÃO duplica** um token existente?
- [ ] ❌ O token **NÃO contém lógica** de comportamento?

### **Antes de Usar um Token no Componente**

- [ ] ✅ Explorei **tokens existentes** antes de criar um novo?
- [ ] ✅ Estou **combinando tokens** quando faz sentido?
- [ ] ✅ Meu componente **não tem valores hard-coded**?
- [ ] ✅ Uso tokens para **TODOS os valores** (cores, espaçamentos, sombras)?
- [ ] ❌ **NÃO estou criando tokens locais** inline?
- [ ] ❌ **NÃO estou duplicando** tokens existentes?

---

## 📊 Métricas de Sucesso

### **Sistema de Tokens Saudável**

✅ **Escalabilidade:**
- 10 componentes: ~50 tokens
- 50 componentes: ~60 tokens (+10 tokens apenas)
- 100 componentes: ~70 tokens (+10 tokens apenas)

✅ **Reutilização:**
- 1 token usado por ≥ 3 componentes em média
- Tokens semânticos usados por ≥ 10 componentes

✅ **Manutenibilidade:**
- Mudança em token afeta N componentes automaticamente
- Componente novo = 0 novos tokens (usa existentes)

---

### **Sistema de Tokens Problemático**

🔴 **Não Escalável:**
- 10 componentes: ~100 tokens
- 50 componentes: ~500 tokens
- 100 componentes: ~1000 tokens

🔴 **Duplicação:**
- 1 token usado por apenas 1 componente
- Múltiplos tokens com mesmo valor

🔴 **Difícil Manutenção:**
- Mudança requer editar múltiplos arquivos
- Componente novo = +10 novos tokens

---

## 🎯 Resumo Executivo

### **Filosofia DSS de Tokens**

1. **Tokens = PROVEDORES** - Valores genéricos e reutilizáveis
2. **Componentes = CONSUMIDORES** - Escolhem quais tokens usar
3. **Escalabilidade Infinita** - Novos componentes usam tokens existentes
4. **Flexibilidade** - Componentes podem combinar múltiplos tokens
5. **Manutenibilidade** - Mudanças isoladas nos componentes

### **Regras de Ouro**

1. ✅ **SEMPRE** usar tokens ao invés de valores hard-coded
2. ✅ **SEMPRE** criar tokens genéricos, não específicos de componentes
3. ✅ **SEMPRE** permitir que componentes escolham tokens
4. ❌ **NUNCA** criar tokens como `--dss-component-name-property`
5. ❌ **NUNCA** duplicar valores em múltiplos tokens
6. ❌ **NUNCA** criar tokens que "sabem" onde serão usados

### **Benefícios**

- 📈 **Escalabilidade:** 100 componentes = mesmos ~70 tokens
- 🔄 **Reutilização:** 1 token serve N componentes
- 🔧 **Manutenibilidade:** Mudanças isoladas e controladas
- 🎨 **Flexibilidade:** Componentes combinam tokens livremente
- ⚡ **Performance:** Menos tokens = CSS menor

---

## ⚠️ Status da Migração (Janeiro 2025)

### **📋 Resumo da Refatoração**

O DSS está em processo de migração gradual para alinhar 100% com a filosofia **"Tokens = Provedores, Componentes = Consumidores"**.

### **✅ Arquivos Refatorados (100% Conforme)**

| Arquivo | Tokens Component-Specific | Status | Sprint |
|---------|---------------------------|--------|--------|
| `_gradients.scss` | **0** | ✅ Completo | Dez 2024 |
| `_spacing.scss` | **0** | ✅ Completo | **Jan 2025 - Sprint 1** |
| `_borders.scss` | **0** | ✅ Completo | **Jan 2025 - Sprint 2** |
| `_shadows.scss` | **0** | ✅ Completo | **Jan 2025 - Sprint 3** |
| `_motion.scss` | **0** | ✅ Completo | **Jan 2025 - Sprint 4** |
| `_actions.scss` | **0** | ✅ Completo | Inicial |
| `_text.scss` | **0** | ✅ Completo | Inicial |
| `_surfaces.scss` | **0** | ✅ Completo | Inicial |
| `_feedback.scss` | **0** | ✅ Completo | Inicial |
| `_opacity.scss` | **0** | ✅ Completo | Inicial |
| `_z-index.scss` | **0** | ✅ Completo | Inicial |
| `_breakpoints.scss` | **0** | ✅ Completo | Inicial |

### **🎉 REFATORAÇÃO 100% COMPLETA!**

✅ **TODOS os arquivos estão em conformidade com a nova filosofia!**
✅ **0 tokens component-specific restantes no sistema**

### **📊 Progresso da Migração**

```
Conformidade com Nova Filosofia:

████████████████████   100% COMPLETA! 🎉

✅ Completo: 12 arquivos (0 tokens component-specific)
⏳ Pendente: 0 arquivos

🏆 REFATORAÇÃO FINALIZADA COM SUCESSO!
```

### **🎯 Sprint 1 Completa (Janeiro 2025)**

#### **Tokens Removidos de `_spacing.scss`**

**16 tokens** component-specific foram removidos e documentados:

```scss
/* ❌ REMOVIDOS */
--dss-button-padding-x          → Use: var(--dss-spacing-4)
--dss-button-padding-y          → Use: var(--dss-spacing-2)
--dss-button-padding-compact-x  → Use: var(--dss-spacing-3)
--dss-button-padding-compact-y  → Use: var(--dss-spacing-1_5)
--dss-input-padding-x           → Use: var(--dss-spacing-3)
--dss-input-padding-y           → Use: var(--dss-spacing-2)
--dss-input-height              → Use: var(--dss-spacing-10)
--dss-card-padding              → Use: var(--dss-spacing-6)
--dss-card-padding-compact      → Use: var(--dss-spacing-4)
--dss-modal-padding             → Use: var(--dss-spacing-6)
--dss-modal-header-padding      → Use composição de spacing tokens
--dss-modal-body-padding        → Use: var(--dss-spacing-6)
--dss-modal-footer-padding      → Use composição de spacing tokens
--dss-radius-button             → Use: var(--dss-radius-md)
--dss-radius-input              → Use: var(--dss-radius-md)
--dss-radius-card               → Use: var(--dss-radius-lg)
```

#### **Componentes Atualizados (Sprint 1)**

✅ **DssButton** refatorado para usar tokens genéricos:
- `border-radius: var(--dss-radius-md)` ✅
- `box-shadow: var(--dss-elevation-2)` em hover ✅
- Todos os 60+ testes continuam passando ✅

### **🎯 Sprint 2 Completa (Janeiro 2025)**

#### **Tokens Removidos de `_borders.scss`**

**12 tokens** component-specific foram removidos e documentados:

```scss
/* ❌ REMOVIDOS */
/* INPUTS (6 tokens) */
--dss-border-input-default      → Use: 1px solid var(--dss-gray-300)
--dss-border-input-hover        → Use: 1px solid var(--dss-gray-400)
--dss-border-input-focus        → Use: 2px solid var(--dss-action-primary)
--dss-border-input-error        → Use: 2px solid var(--dss-negative)
--dss-border-input-success      → Use: 2px solid var(--dss-positive)
--dss-border-input-disabled     → Use: 1px solid var(--dss-gray-200)

/* CARDS (3 tokens) */
--dss-border-card-default       → Use: 1px solid var(--dss-gray-200)
--dss-border-card-elevated      → Use: 1px solid var(--dss-gray-300)
--dss-border-card-selected      → Use: 2px solid var(--dss-action-primary)

/* DIVIDERS (3 tokens) */
--dss-border-divider-subtle     → Use: 1px solid var(--dss-gray-100)
--dss-border-divider-default    → Use: 1px solid var(--dss-gray-200)
--dss-border-divider-strong     → Use: 1px solid var(--dss-gray-300)
```

#### **Arquivos Atualizados (Sprint 2)**

**71 correções** realizadas em 6 arquivos:

✅ **`utils/_border-helpers.scss`** - 12 usages atualizados
✅ **`utils/_mixins.scss`** - 13 usages atualizados (7 Sprint 2 + 6 leftovers Sprint 1)
✅ **`themes/_quasar-overrides.scss`** - 20 usages atualizados (9 Sprint 2 + 11 leftovers Sprint 1)
✅ **`themes/_quasar-tokens-mapping.scss`** - 7 usages atualizados (3 Sprint 2 + 4 leftovers Sprint 1)
✅ **`themes/_quasar-utilities.scss`** - 7 usages atualizados (4 Sprint 2 + 3 leftovers Sprint 1)
✅ **Documentação inline** - 85 linhas de exemplos e guias em `_borders.scss`

#### **Resultado**

✅ **0 usages restantes** dos tokens removidos
✅ **Nenhuma regressão visual** - valores idênticos mantidos
✅ **Conformidade 93%** - sistema quase 100% alinhado

### **🎯 Sprint 3 Completa (Janeiro 2025)**

#### **Tokens Removidos de `_shadows.scss`**

**5 tokens** component-specific foram removidos e documentados:

```scss
/* ❌ REMOVIDOS */
/* CARDS (2 tokens) */
--dss-elevation-card           → Use: var(--dss-elevation-1)
--dss-elevation-card-hover     → Use: var(--dss-elevation-2)

/* MODAIS (1 token) */
--dss-elevation-modal          → Use: var(--dss-elevation-4)

/* TOOLTIPS (1 token) */
--dss-elevation-tooltip        → Use: var(--dss-elevation-2)

/* TOASTS (1 token) */
--dss-elevation-toast          → Use: var(--dss-elevation-3)
```

#### **Arquivos Atualizados (Sprint 3)**

**16 correções** realizadas em 6 arquivos:

✅ **`utils/_mixins.scss`** - 2 usages atualizados
✅ **`themes/_quasar-overrides.scss`** - 2 usages atualizados
✅ **`themes/_quasar-utilities.scss`** - 1 usage atualizado
✅ **`themes/quasar.variables.scss`** - 3 usages atualizados (1 Sprint 3 + 2 leftovers)
✅ **`tokens/themes/dark/_colors.scss`** - 3 sobrescritas dark mode removidas + docs
✅ **Documentação inline** - 70 linhas de exemplos e guias em `_shadows.scss`

#### **Resultado**

✅ **0 usages restantes** dos tokens removidos
✅ **Nenhuma regressão visual** - valores idênticos mantidos
✅ **Conformidade 97%** - apenas 1 arquivo pendente!
✅ **Dark mode atualizado** - tokens genéricos agora funcionam automaticamente

### **🎯 Sprint 4 Completa (Janeiro 2025) - 🏆 100% CONFORMIDADE ATINGIDA!**

#### **Tokens Removidos de `_motion.scss`**

**2 tokens** component-specific foram removidos e documentados:

```scss
/* ❌ REMOVIDOS */
/* DURAÇÕES PARA COMPONENTES */
--dss-duration-modal           → Use: var(--dss-duration-slow)
--dss-duration-toast           → Use: var(--dss-duration-slow)
```

#### **Arquivos Atualizados (Sprint 4)**

**0 correções** necessárias - tokens não estavam em uso:

✅ **Nenhum arquivo consumidor** - tokens definidos mas não utilizados no sistema
✅ **Dark mode verificado** - 0 sobrescritas encontradas
✅ **Documentação inline** - 56 linhas de exemplos e guias em `_motion.scss`

#### **Resultado Final**

✅ **0 usages restantes** dos tokens removidos
✅ **Nenhuma regressão visual** - valores idênticos mantidos
✅ **Conformidade 100%** - 🎉 **REFATORAÇÃO COMPLETA!**
✅ **Sistema 100% alinhado** com filosofia "Tokens = Provedores, Componentes = Consumidores"

#### **🏆 Conquistas da Sprint 4**

- **Última sprint** da refatoração de tokens component-specific
- **100% de conformidade** atingida em todo o sistema DSS
- **0 tokens component-specific** restantes em todos os 12 arquivos
- **Sistema totalmente alinhado** com melhores práticas de design tokens
- **Documentação completa** com 4 relatórios detalhados (Sprints 1-4)

### **📅 Roadmap de Refatoração**

#### **Sprint 2: `_borders.scss` ✅ COMPLETA**

~~Remover 12 tokens:~~
- ~~`--dss-border-input-*` (6 tokens)~~
- ~~`--dss-border-card-*` (3 tokens)~~
- ~~`--dss-border-divider-*` (3 tokens)~~

✅ **Concluída em Janeiro 2025** - 71 correções, 0 usages restantes

#### **Sprint 3: `_shadows.scss` ✅ COMPLETA**

~~Remover 5 tokens:~~
- ~~`--dss-elevation-card` → `--dss-elevation-1`~~
- ~~`--dss-elevation-card-hover` → `--dss-elevation-2`~~
- ~~`--dss-elevation-modal` → `--dss-elevation-4`~~
- ~~`--dss-elevation-tooltip` → `--dss-elevation-2`~~
- ~~`--dss-elevation-toast` → `--dss-elevation-3`~~

✅ **Concluída em Janeiro 2025** - 16 correções, 0 usages restantes, dark mode atualizado

#### **Sprint 4: `_motion.scss` ✅ COMPLETA - 🎉 100% CONFORMIDADE ATINGIDA!**

~~Remover 2 tokens:~~
- ~~`--dss-duration-modal` → `--dss-duration-slow`~~
- ~~`--dss-duration-toast` → `--dss-duration-slow`~~

✅ **Concluída em Janeiro 2025** - 0 correções necessárias (tokens não em uso), 56 linhas de docs

🏆 **REFATORAÇÃO 100% COMPLETA - TODOS OS TOKENS COMPONENT-SPECIFIC REMOVIDOS!**

---

## 📋 Tabela DE/PARA - Tokens Deprecados

### **Guia Rápido de Migração**

Esta tabela consolida TODOS os 35 tokens component-specific removidos e seus substitutos genéricos.

| # | Token Deprecado | ❌ | Substituir por | ✅ | Categoria | Sprint |
|---|-----------------|---|----------------|---|-----------|--------|
| 1 | `--dss-button-padding-x` | ❌ | `var(--dss-spacing-4)` | ✅ | Spacing | Sprint 1 |
| 2 | `--dss-button-padding-y` | ❌ | `var(--dss-spacing-2)` | ✅ | Spacing | Sprint 1 |
| 3 | `--dss-button-padding-compact-x` | ❌ | `var(--dss-spacing-3)` | ✅ | Spacing | Sprint 1 |
| 4 | `--dss-button-padding-compact-y` | ❌ | `var(--dss-spacing-1_5)` | ✅ | Spacing | Sprint 1 |
| 5 | `--dss-input-padding-x` | ❌ | `var(--dss-spacing-3)` | ✅ | Spacing | Sprint 1 |
| 6 | `--dss-input-padding-y` | ❌ | `var(--dss-spacing-2)` | ✅ | Spacing | Sprint 1 |
| 7 | `--dss-input-height` | ❌ | `var(--dss-spacing-10)` | ✅ | Spacing | Sprint 1 |
| 8 | `--dss-card-padding` | ❌ | `var(--dss-spacing-6)` | ✅ | Spacing | Sprint 1 |
| 9 | `--dss-card-padding-compact` | ❌ | `var(--dss-spacing-4)` | ✅ | Spacing | Sprint 1 |
| 10 | `--dss-modal-padding` | ❌ | `var(--dss-spacing-6)` | ✅ | Spacing | Sprint 1 |
| 11 | `--dss-modal-header-padding` | ❌ | `var(--dss-spacing-6) var(--dss-spacing-6) var(--dss-spacing-4)` | ✅ | Spacing | Sprint 1 |
| 12 | `--dss-modal-body-padding` | ❌ | `var(--dss-spacing-6)` | ✅ | Spacing | Sprint 1 |
| 13 | `--dss-modal-footer-padding` | ❌ | `var(--dss-spacing-4) var(--dss-spacing-6) var(--dss-spacing-6)` | ✅ | Spacing | Sprint 1 |
| 14 | `--dss-radius-button` | ❌ | `var(--dss-radius-md)` | ✅ | Spacing | Sprint 1 |
| 15 | `--dss-radius-input` | ❌ | `var(--dss-radius-md)` | ✅ | Spacing | Sprint 1 |
| 16 | `--dss-radius-card` | ❌ | `var(--dss-radius-lg)` | ✅ | Spacing | Sprint 1 |
| 17 | `--dss-border-input-default` | ❌ | `1px solid var(--dss-gray-300)` | ✅ | Borders | Sprint 2 |
| 18 | `--dss-border-input-hover` | ❌ | `1px solid var(--dss-gray-400)` | ✅ | Borders | Sprint 2 |
| 19 | `--dss-border-input-focus` | ❌ | `2px solid var(--dss-action-primary)` | ✅ | Borders | Sprint 2 |
| 20 | `--dss-border-input-error` | ❌ | `2px solid var(--dss-negative)` | ✅ | Borders | Sprint 2 |
| 21 | `--dss-border-input-success` | ❌ | `2px solid var(--dss-positive)` | ✅ | Borders | Sprint 2 |
| 22 | `--dss-border-input-disabled` | ❌ | `1px solid var(--dss-gray-200)` | ✅ | Borders | Sprint 2 |
| 23 | `--dss-border-card-default` | ❌ | `1px solid var(--dss-gray-200)` | ✅ | Borders | Sprint 2 |
| 24 | `--dss-border-card-elevated` | ❌ | `1px solid var(--dss-gray-300)` | ✅ | Borders | Sprint 2 |
| 25 | `--dss-border-card-selected` | ❌ | `2px solid var(--dss-action-primary)` | ✅ | Borders | Sprint 2 |
| 26 | `--dss-border-divider-subtle` | ❌ | `1px solid var(--dss-gray-100)` | ✅ | Borders | Sprint 2 |
| 27 | `--dss-border-divider-default` | ❌ | `1px solid var(--dss-gray-200)` | ✅ | Borders | Sprint 2 |
| 28 | `--dss-border-divider-strong` | ❌ | `1px solid var(--dss-gray-300)` | ✅ | Borders | Sprint 2 |
| 29 | `--dss-elevation-card` | ❌ | `var(--dss-elevation-1)` | ✅ | Shadows | Sprint 3 |
| 30 | `--dss-elevation-card-hover` | ❌ | `var(--dss-elevation-2)` | ✅ | Shadows | Sprint 3 |
| 31 | `--dss-elevation-modal` | ❌ | `var(--dss-elevation-4)` | ✅ | Shadows | Sprint 3 |
| 32 | `--dss-elevation-tooltip` | ❌ | `var(--dss-elevation-2)` | ✅ | Shadows | Sprint 3 |
| 33 | `--dss-elevation-toast` | ❌ | `var(--dss-elevation-3)` | ✅ | Shadows | Sprint 3 |
| 34 | `--dss-duration-modal` | ❌ | `var(--dss-duration-slow)` | ✅ | Motion | Sprint 4 |
| 35 | `--dss-duration-toast` | ❌ | `var(--dss-duration-slow)` | ✅ | Motion | Sprint 4 |

### **Estatísticas da Migração**

| Categoria | Tokens Removidos | Tokens Genéricos Usados | Redução |
|-----------|------------------|-------------------------|---------|
| **Spacing** | 16 | 10 | **-37.5%** |
| **Borders** | 12 | 8 | **-33.3%** |
| **Shadows** | 5 | 5 | **0%** (mesma quantidade, mas genéricos) |
| **Motion** | 2 | 1 | **-50%** |
| **TOTAL** | **35** | **24** | **-31.4%** |

### **Benefícios da Migração**

✅ **-31.4% de tokens** → Sistema mais enxuto
✅ **100% genéricos** → Escalável infinitamente
✅ **0 duplicação** → Manutenção simplificada
✅ **Consistência** → Valores unificados em todo o sistema

### **💡 Para Desenvolvedores**

Se você encontrar um token removido no código:

1. **Consulte a documentação** no arquivo de tokens (comentários `⚠️ REMOVIDOS`)
2. **Use o token genérico** recomendado
3. **Não recrie** o token removido
4. **Siga a filosofia** Tokens = Provedores, Componentes = Consumidores

### **📚 Documentação Relacionada**

- [AUDITORIA_DSS_JAN_2025.md](./AUDITORIA_DSS_JAN_2025.md) - Auditoria completa que identificou tokens component-specific
- [REFATORACAO_COMPLETA_JAN_2025.md](./REFATORACAO_COMPLETA_JAN_2025.md) - Relatório final do projeto completo
- [CORRECOES_CRITICAS_JAN_2025.md](./CORRECOES_CRITICAS_JAN_2025.md) - Correções de imports e nomenclatura
- [SPRINT_1_RELATORIO_JAN_2025.md](./SPRINT_1_RELATORIO_JAN_2025.md) - Relatório completo da Sprint 1
- [SPRINT_2_RELATORIO_JAN_2025.md](./SPRINT_2_RELATORIO_JAN_2025.md) - Relatório completo da Sprint 2
- [SPRINT_3_RELATORIO_JAN_2025.md](./SPRINT_3_RELATORIO_JAN_2025.md) - Relatório completo da Sprint 3
- [SPRINT_4_RELATORIO_JAN_2025.md](./SPRINT_4_RELATORIO_JAN_2025.md) - Relatório completo da Sprint 4 (🏆 100% Conformidade)

---

## 📚 Referências

Este guia é baseado nas melhores práticas de:

- **Material Design** (Google) - Design tokens e Material Theme
- **Polaris** (Shopify) - Sistema de tokens abstratos
- **Carbon** (IBM) - Nomenclatura semântica
- **Chakra UI** - Escalas consistentes e composição
- **Tailwind CSS** - Filosofia utility-first
- **W3C Design Tokens** - Especificação oficial

---

**Última Atualização:** Janeiro 2025
**Versão:** 1.0.0
**Autores:** Time DSS
