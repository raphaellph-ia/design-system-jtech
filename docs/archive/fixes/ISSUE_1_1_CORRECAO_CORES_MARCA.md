# ✅ Issue #1.1 - Correção de Cores de Marca Hardcoded

**Data**: Janeiro 2026
**Prioridade**: 🔴 CRÍTICA
**Status**: ✅ COMPLETO

---

## 🎯 Problema Identificado

Cores de marca hardcoded no arquivo `composables/useBrand.ts` estavam **INCORRETAS** e não correspondiam às cores oficiais do Design System Sansys.

### ❌ Antes (Incorreto):
```typescript
export const BRAND_COLORS: Record<SansysBrand, string> = {
  hub: '#1976D2',     // ❌ Azul (INCORRETO!)
  water: '#0288D1',   // ❌ Azul claro (INCORRETO!)
  waste: '#388E3C'    // ❌ Verde (aproximado, mas não oficial)
}
```

### ✅ Depois (Correto):
```typescript
export const BRAND_COLORS: Record<SansysBrand, string> = {
  hub: '#ef7a11',     // ✅ Laranja Hub (--dss-hub-600)
  water: '#0e88e4',   // ✅ Azul Water (--dss-water-500)
  waste: '#0b8154'    // ✅ Verde Waste (--dss-waste-600)
}
```

---

## 🔍 Análise de Discrepância

| Marca | Cor Hardcoded (Errada) | Cor Oficial (DSS Token) | Diferença |
|-------|------------------------|-------------------------|-----------|
| **Hub** | `#1976D2` (azul) | `#ef7a11` (laranja) | 🔴 COMPLETAMENTE DIFERENTE |
| **Water** | `#0288D1` (azul claro) | `#0e88e4` (azul oficial) | 🟡 Próximo mas não oficial |
| **Waste** | `#388E3C` (verde) | `#0b8154` (verde oficial) | 🟡 Próximo mas não oficial |

### 🔴 **Hub era o mais crítico**:
- Hardcoded mostrava **azul** quando deveria ser **laranja**!
- Isso resultava em branding completamente incorreto

---

## 📝 Mudanças Realizadas

### 1. Arquivo Principal: `composables/useBrand.ts`

**Linhas 75-87** (BRAND_COLORS):
```diff
  /**
   * Mapeamento de cores primárias por marca
+  *
+  * ✅ CORRIGIDO (Jan 2026): Cores oficiais Sansys
+  * - Hub: Laranja/Marrom (#ef7a11 = --dss-hub-600)
+  * - Water: Azul (#0e88e4 = --dss-water-500)
+  * - Waste: Verde (#0b8154 = --dss-waste-600)
   */
  export const BRAND_COLORS: Record<SansysBrand, string> = {
-   hub: '#1976D2',     // Azul Hub
-   water: '#0288D1',   // Azul Water
-   waste: '#388E3C'    // Verde Waste
+   hub: '#ef7a11',     // Laranja Hub (--dss-hub-600)
+   water: '#0e88e4',   // Azul Water (--dss-water-500)
+   waste: '#0b8154'    // Verde Waste (--dss-waste-600)
  }
```

**Linhas 89-96** (JSDoc do getBrandColor):
```diff
  /**
   * Utilitário para obter a cor primária de uma marca
   *
   * @example
   * ```ts
-  * const color = getBrandColor('hub') // '#1976D2'
+  * const color = getBrandColor('hub') // '#ef7a11'
   * ```
   */
```

---

## 🧪 Validação

### ✅ Type Check
```bash
$ npm run type-check
✓ 0 errors TypeScript
```

### ✅ Build Completo
```bash
$ npm run build
✓ built in 6.32s
✓ ESM: 41.48 kB
✓ UMD: 31.39 kB
✓ CSS: 252.14 kB
```

---

## 🎨 Tokens DSS Utilizados

Cores oficiais do Design System Sansys:

```scss
/* Hub (Laranja/Marrom) */
--dss-hub-600: #ef7a11;

/* Water (Azul) */
--dss-water-500: #0e88e4;

/* Waste (Verde) */
--dss-waste-600: #0b8154;
```

**Fonte**: `/DSS/tokens/globals.scss` e `/DSS/tokens/brand/*.scss`

---

## 📊 Impacto da Correção

### Componentes Afetados:
- ✅ `DssButton` - prop `brand="hub|water|waste"`
- ✅ `DssBadge` - prop `brand`
- ✅ `DssAvatar` - prop `brand`
- ✅ `DssCard` - prop `brand`
- ✅ `DssInput` - prop `brand`
- ✅ Qualquer componente futuro que use `useBrand()`

### Funções Afetadas:
- ✅ `getBrandColor(brand)` - agora retorna cor correta
- ✅ `BRAND_COLORS` - constante agora tem cores oficiais

### Exemplo de Impacto Visual:

**Antes**:
```vue
<DssButton brand="hub" color="primary">
  <!-- Mostrava azul #1976D2 ❌ -->
</DssButton>
```

**Depois**:
```vue
<DssButton brand="hub" color="primary">
  <!-- Mostra laranja #ef7a11 ✅ -->
</DssButton>
```

---

## 🔄 Compatibilidade

### Quebra de Compatibilidade: ⚠️ SIM
Esta correção **altera cores visuais** e pode impactar aplicações existentes:

1. **Hub mudou de azul para laranja** 🔴 MUDANÇA VISUAL SIGNIFICATIVA
2. **Water e Waste** mudaram sutilmente (tons mais precisos)

### Migração Necessária:
Se seu aplicativo depende das cores antigas, você pode:

1. **Aceitar as novas cores** (RECOMENDADO - são as cores oficiais)
2. **Sobrescrever localmente**:
```typescript
// Em seu código, se realmente precisa das cores antigas
const LEGACY_COLORS = {
  hub: '#1976D2',   // azul antigo
  water: '#0288D1', // azul claro antigo
  waste: '#388E3C'  // verde antigo
}
```

**⚠️ Mas lembre-se**: As cores antigas estavam **incorretas** segundo o Design System oficial.

---

## ✅ Benefícios da Correção

1. ✅ **Conformidade com DSS** - Cores agora seguem tokens oficiais
2. ✅ **Branding Correto** - Hub agora mostra laranja (cor oficial)
3. ✅ **Consistência** - Sincronizado com `tokens/brand/*.scss`
4. ✅ **Manutenibilidade** - Documentado qual token cada cor corresponde
5. ✅ **Futura Migração** - Preparado para usar CSS variables no futuro

---

## 📚 Referências

- **Issue Original**: `/DSS/ISSUES_RAPIDOS_OPCAO_D.md` (Issue #1.1)
- **Tokens Oficiais**: `/DSS/tokens/globals.scss` (linhas 22-62)
- **Tokens de Marca**: `/DSS/tokens/brand/` (hub, water, waste)
- **Arquivo Corrigido**: `/DSS/composables/useBrand.ts`

---

## 🚀 Próximos Passos

Esta correção foi **Issue #1.1** de 13 issues identificados.

**Próximos issues críticos**:
1. ✅ **Issue 1.1** - Cores de marca (COMPLETO)
2. 🔄 **Issue 2.1** - ARIA labels no DssButton (PRÓXIMO)
3. 🔄 **Issue 1.4** - Progress bar height
4. 🔄 **Issue 1.5** - Transitions hardcoded

Ver lista completa em: `/DSS/ISSUES_RAPIDOS_OPCAO_D.md`

---

**Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves**
**Licença**: MIT © 2025 Sansys/Veolia
