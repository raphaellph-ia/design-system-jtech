# Design System Sansys (DSS) - Grid e Layout

## 1. Introdução

Em um mundo digital caracterizado por uma infinidade de varações de dispositivos e tamanhos de tela, a arquitetura visual das interfaces tornou-se um pilar fundamental da experiência do usuário. O sistema de grid e layout do Design System Sansys (DSS) não é apenas uma ferramenta técnica, mas o alicerce estrutural que sustenta toda a divisão espacial e experiência visual dos produtos Sansys.

### 1.1 Propósito e Valor

O grid e layout no DSS transcendem a simples organização visual – eles formam o esqueleto invisível que proporciona consistência, coerência e harmonia às interfaces. Ao estabelecer uma linguagem espacial unificada, o sistema de grid permite que:

- **Designers** criem interfaces com proporções harmoniosas e hierarquia clara, acelerando o processo criativo através de padrões pré-estabelecidos
- **Desenvolvedores** implementem layouts responsivos com precisão e eficiência, minimizando discrepâncias entre design e código
- **Usuários** naveguem intuitivamente pelas interfaces, beneficiando-se de uma estrutura previsível e coerente que reduz a carga cognitiva

### 1.2 Abordagem Conceitual

O DSS adota uma filosofia de "hierarquia de atenção" para grid e layout, reconhecendo que a organização espacial não é neutra, mas uma ferramenta ativa de comunicação. Os espaços, margens, alinhamentos e proporções são cuidadosamente calibrados para:

1. **Direcionar o olhar** do usuário para as informações mais importantes
2. **Estabelecer relacionamentos** visuais entre elementos conectados
3. **Criar ritmo e cadência** na experiência de navegação
4. **Adaptar-se fluidamente** a qualquer contexto ou dispositivo sem perder coerência

### 1.3 Integração com o Ecossistema DSS

O sistema de grid e layout não existe isoladamente – ele é parte integrante do ecossistema completo do DSS, funcionando em harmonia com:

- **Sistema de tokens**: Utilizando valores de espaçamento, elevação e dimensionamento consistentes
- **Tipografia**: Alinhando-se à escala tipográfica para criar proporções harmoniosas
- **Componentes**: Fornecendo estrutura consistente para todos os elementos da interface
- **Padrões interativos**: Suportando estados e transições que respeitam a organização espacial

### 1.4 Estrutura do Documento

Este documento apresenta uma visão abrangente do sistema de grid e layout do DSS, começando pelos princípios fundamentais, detalhando a implementação técnica e concluindo com diretrizes práticas de aplicação. As seções a seguir destinam-se tanto a designers quanto desenvolvedores, fornecendo as ferramentas necessárias para criar interfaces espacialmente harmonizadas e tecnicamente robustas que representem a visão do DSS.

## 2. Princípios Fundamentais

### 2.1 Flexibilidade com Consistência

O sistema de grid do DSS é projetado para ser flexível o suficiente para acomodar diversos tipos de conteúdo e contextos, mantendo uma consistência visual em toda a experiência do usuário. Esta abordagem permite adaptabilidade sem sacrificar a identidade visual coesa.

### 2.2 Hierarquia de Atenção

Seguindo o conceito de "hierarquia de atenção", o layout direciona o olhar do usuário através de uma distribuição equilibrada de elementos de alta, média e baixa atenção. Essa hierarquia é implementada através do posicionamento, tamanho e espaçamento dos elementos.

### 2.3 Espaço Negativo Intencional

O espaço em branco (negativo) é utilizado estrategicamente para criar clareza, definir relacionamentos entre elementos e estabelecer ritmo visual. O espaçamento não é apenas uma ausência de conteúdo, mas uma ferramenta ativa de design.

### 2.4 Responsividade Universal

Todos os layouts são projetados com uma abordagem mobile-first e adaptam-se fluidamente a qualquer tamanho de tela, de 320px até 4K, garantindo experiência consistente independente do dispositivo utilizado.

### 2.5 Acessibilidade e Suporte a Zoom (WCAG 2.1 AA)

O sistema de grid do DSS é projetado para conformidade com WCAG 2.1 AA, incluindo suporte a zoom de até 400%:

- **Zoom 200%**: Elementos adaptam-se automaticamente (~512px viewport efetivo)
- **Zoom 300%**: Layout continua funcional (~338px viewport efetivo)
- **Zoom 400%**: Conteúdo permanece legível com scroll horizontal mínimo

Tokens de breakpoint para zoom disponíveis em `_breakpoints.scss`:
- `--dss-breakpoint-zoom-200`: calc(var(--dss-breakpoint-md) * 0.5)
- `--dss-breakpoint-zoom-300`: calc(var(--dss-breakpoint-md) * 0.33)

**Práticas recomendadas:**
- Use unidades relativas (rem, em, %) em vez de px fixos
- Teste layouts com zoom de 200% e 400%
- Evite containers com largura fixa que impeçam reflow
- Garanta que texto não seja cortado em zoom elevado

## 3. Sistema de Grid

### 3.1 Estrutura Base

O grid base do DSS utiliza um sistema de 12 colunas, permitindo divisões flexíveis e proporcionais do espaço. As colunas são envolvidas por um container que mantém o conteúdo centralizado e com margens adequadas.

```
Container → [Margin] → Colunas (1-12) → [Margin]
```

### 3.2 Anatomia do Grid

![Anatomia do Grid DSS](/images/grid-anatomy.png)

- **Container**: Define a largura máxima do conteúdo
- **Margin**: Espaço entre o container e os limites da tela
- **Gutter**: Espaço entre as colunas
- **Coluna**: Unidade básica de divisão horizontal

### 3.3 Breakpoints

O sistema implementa seis breakpoints principais, alinhados com as convenções do Tailwind CSS e otimizados para suporte a 4K:

| Breakpoint | Nome       | Min Width | Max Width | Container | Gutter | Colunas |
|------------|------------|-----------|-----------|-----------|--------|---------|
| XS         | Mobile     | 320px     | 639px     | 100%      | 8px    | 4       |
| SM         | Tablet     | 640px     | 1023px    | 608px     | 16px   | 8       |
| MD         | Desktop    | 1024px    | 1439px    | 960px     | 24px   | 12      |
| LG         | Wide       | 1440px    | 1919px    | 1280px    | 32px   | 12      |
| XL         | Ultrawide  | 1920px    | 3839px    | 1600px    | 40px   | 12      |
| 4K         | Ultra HD   | 3840px    | ∞         | 1600px    | 48px   | 12      |

**Notas importantes:**
- O mínimo suportado é 320px (XS), garantindo compatibilidade com dispositivos menores
- O container máximo é limitado a 1600px para manter legibilidade em telas 4K
- Valores de gutter usam tokens de spacing (`--dss-gutter-*`)
- Alinhado com breakpoints do Tailwind CSS (640px para SM)

### 3.4 Comportamento Responsivo

Em cada breakpoint, o grid adapta-se com as seguintes características:

- **Mobile (XS)**: Grid de 4 colunas, gutter 8px, container fluido (100%)
- **Tablet (SM)**: Grid de 8 colunas, gutter 16px, container 608px
- **Desktop (MD)**: Grid de 12 colunas completo, gutter 24px, container 960px
- **Wide (LG)**: Grid de 12 colunas, gutter 32px, container 1280px
- **Ultrawide (XL)**: Grid de 12 colunas, gutter 40px, container 1600px (limite de legibilidade)
- **4K (Ultra HD)**: Grid de 12 colunas, gutter 48px, container 1600px (mesmo limite)

## 4. Sistema de Espaçamento

### 4.1 Escala de Espaçamento

O espaçamento no DSS segue uma escala harmônica baseada em REM (1rem = 16px). A escala completa está definida em `tokens/semantic/_spacing.scss`:

#### Escala Base

| Token            | REM       | Pixels | Uso Recomendado                                  |
|------------------|-----------|--------|--------------------------------------------------|
| `spacing-0`      | 0         | 0px    | Sem espaçamento                                  |
| `spacing-px`     | 1px       | 1px    | Bordas finas                                     |
| `spacing-0_5`    | 0.125rem  | 2px    | Espaçamento mínimo                               |
| `spacing-1`      | 0.25rem   | 4px    | Espaçamento mínimo entre elementos relacionados  |
| `spacing-1_5`    | 0.375rem  | 6px    | Espaçamento pequeno                              |
| `spacing-2`      | 0.5rem    | 8px    | Espaçamento padrão entre elementos relacionados  |
| `spacing-2_5`    | 0.625rem  | 10px   | Espaçamento médio-pequeno                        |
| `spacing-3`      | 0.75rem   | 12px   | Espaçamento entre elementos distintos            |
| `spacing-3_5`    | 0.875rem  | 14px   | Espaçamento médio                                |
| `spacing-4`      | 1rem      | 16px   | Padding interno de componentes                   |
| `spacing-5`      | 1.25rem   | 20px   | Margens entre grupos de elementos                |
| `spacing-6`      | 1.5rem    | 24px   | Espaçamento padrão entre seções                  |
| `spacing-7`      | 1.75rem   | 28px   | Espaçamento médio entre seções                   |
| `spacing-8`      | 2rem      | 32px   | Espaçamento médio-grande entre seções            |
| `spacing-9`      | 2.25rem   | 36px   | Espaçamento grande                               |
| `spacing-10`     | 2.5rem    | 40px   | Espaçamento grande entre seções                  |
| `spacing-11`     | 2.75rem   | 44px   | Espaçamento muito grande                         |
| `spacing-12`     | 3rem      | 48px   | Espaçamento entre blocos de conteúdo maiores     |
| `spacing-14`     | 3.5rem    | 56px   | Espaçamento extra grande                         |
| `spacing-16`     | 4rem      | 64px   | Espaçamento entre seções principais              |
| `spacing-20`     | 5rem      | 80px   | Espaçamento entre módulos de página              |
| `spacing-24`     | 6rem      | 96px   | Espaçamento entre seções críticas                |
| `spacing-28`     | 7rem      | 112px  | Espaçamento especial                             |
| `spacing-32`     | 8rem      | 128px  | Espaçamento máximo padrão                        |
| `spacing-36`     | 9rem      | 144px  | Espaçamento especial grande                      |
| `spacing-40`     | 10rem     | 160px  | Espaçamento especial extra grande                |
| `spacing-48`     | 12rem     | 192px  | Espaçamento de seção hero                        |
| `spacing-64`     | 16rem     | 256px  | Espaçamento máximo                               |
| `spacing-80`     | 20rem     | 320px  | Espaçamento especial                             |
| `spacing-96`     | 24rem     | 384px  | Espaçamento máximo especial                      |

#### Tokens Semânticos de Layout

| Token                     | Valor Base          | Descrição                           |
|---------------------------|---------------------|-------------------------------------|
| `container-padding`       | spacing-4 (16px)    | Padding padrão do container         |
| `section-spacing`         | spacing-12 (48px)   | Espaçamento entre seções            |
| `component-spacing`       | spacing-6 (24px)    | Espaçamento entre componentes       |
| `grid-gap-sm`             | spacing-2 (8px)     | Gap pequeno para grids              |
| `grid-gap-md`             | spacing-4 (16px)    | Gap médio para grids                |
| `grid-gap-lg`             | spacing-6 (24px)    | Gap grande para grids               |
| `grid-gap-xl`             | spacing-8 (32px)    | Gap extra grande para grids         |

#### Tokens de Layout Estrutural

| Token                      | Valor       | Descrição                            |
|----------------------------|-------------|--------------------------------------|
| `layout-sidebar-width`     | 240px       | Largura padrão de sidebar            |
| `layout-sidebar-width-mini`| 64px        | Largura de sidebar minimizada        |
| `layout-sidebar-width-wide`| 320px       | Largura de sidebar expandida         |
| `layout-header-height`     | 64px        | Altura padrão do header              |
| `layout-header-height-dense`| 48px       | Altura de header compacto            |
| `layout-footer-height`     | 64px        | Altura padrão do footer              |
| `layout-content-max-width` | 720px       | Largura máxima para leitura          |
| `layout-content-max-width-wide`| 960px   | Largura expandida para dashboards    |

### 4.2 Aplicação de Espaçamento

O espaçamento é aplicado de forma consistente através de:

- **Margin**: Espaço externo entre componentes
- **Padding**: Espaço interno dentro de componentes
- **Gap**: Espaço entre elementos em layouts flex/grid

A aplicação correta do espaçamento é essencial para criar hierarquia visual e melhorar a legibilidade.

## 5. Padrões de Layout

### 5.1 Layouts de Página com Quasar

O DSS oferece vários padrões de layout de página pré-definidos, implementados com os componentes do Quasar Framework:

#### 5.1.1 Layout de Conteúdo

Ideal para páginas focadas em conteúdo textual e mídias. Utiliza uma largura máxima de leitura confortável (680px-720px) centralizada em telas maiores.

```vue
<q-page-container>
  <q-page padding>
    <div class="dss-content-layout q-mx-auto" style="max-width: 720px">
      <div class="dss-content-header q-mb-lg">
        <h1 class="dss-page-title">Título da Página</h1>
        <div class="dss-page-subtitle">Subtítulo ou descrição</div>
      </div>
      
      <div class="dss-content-body">
        <!-- Conteúdo principal -->
      </div>
      
      <div class="dss-content-footer q-mt-xl">
        <!-- Rodapé do conteúdo -->
      </div>
    </div>
  </q-page>
</q-page-container>
```

#### 5.1.2 Layout de Dashboard

Estrutura modular para exibição de dados e widgets. Combina um grid responsivo com áreas de densidade informacional variável.

```vue
<q-page-container>
  <q-page padding>
    <div class="dss-dashboard-layout">
      <div class="dss-dashboard-header q-mb-md">
        <!-- Cabeçalho do dashboard -->
      </div>
      
      <div class="row q-col-gutter-md">
        <!-- Widgets de largura completa -->
        <div class="col-12 q-mb-md">
          <q-card class="dss-widget dss-widget-full">
            <!-- Conteúdo do widget -->
          </q-card>
        </div>
        
        <!-- Widgets de meia largura -->
        <div class="col-12 col-md-6 q-mb-md">
          <q-card class="dss-widget dss-widget-half">
            <!-- Conteúdo do widget -->
          </q-card>
        </div>
        <div class="col-12 col-md-6 q-mb-md">
          <q-card class="dss-widget dss-widget-half">
            <!-- Conteúdo do widget -->
          </q-card>
        </div>
        
        <!-- Widgets de um terço -->
        <div class="col-12 col-md-4 q-mb-md">
          <q-card class="dss-widget dss-widget-third">
            <!-- Conteúdo do widget -->
          </q-card>
        </div>
        <div class="col-12 col-md-4 q-mb-md">
          <q-card class="dss-widget dss-widget-third">
            <!-- Conteúdo do widget -->
          </q-card>
        </div>
        <div class="col-12 col-md-4 q-mb-md">
          <q-card class="dss-widget dss-widget-third">
            <!-- Conteúdo do widget -->
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</q-page-container>
```

#### 5.1.3 Layout de Formulário

Organiza campos de entrada e controles em uma estrutura clara e linear, priorizando compreensão e completude.

```vue
<q-page-container>
  <q-page padding>
    <div class="dss-form-layout q-mx-auto" style="max-width: 800px">
      <q-card class="dss-form-card">
        <q-card-section>
          <div class="text-h6">Título do Formulário</div>
        </q-card-section>
        
        <q-separator />
        
        <q-card-section>
          <q-form @submit="onSubmit" class="dss-form q-gutter-md">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  filled
                  v-model="form.firstName"
                  label="Nome"
                  class="dss-form-field"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  filled
                  v-model="form.lastName"
                  label="Sobrenome"
                  class="dss-form-field"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  v-model="form.email"
                  label="Email"
                  type="email"
                  class="dss-form-field"
                />
              </div>
              <!-- Mais campos de formulário -->
            </div>
            
            <div class="dss-form-actions q-mt-lg row justify-end q-gutter-sm">
              <q-btn label="Cancelar" flat class="dss-btn-secondary" />
              <q-btn label="Enviar" type="submit" color="primary" class="dss-btn-primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</q-page-container>
```

#### 5.1.4 Layout Multi-coluna

Utiliza múltiplas colunas para apresentar conteúdo relacionado lado a lado, adaptando-se para empilhamento em telas menores.

```vue
<q-page-container>
  <q-page padding>
    <div class="dss-multi-column-layout">
      <div class="row q-col-gutter-lg">
        <!-- Coluna de navegação secundária -->
        <div class="col-12 col-md-3 dss-column-nav">
          <q-list bordered separator class="dss-side-nav">
            <q-item v-for="item in navItems" :key="item.id" clickable v-ripple>
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
          </q-list>
        </div>
        
        <!-- Coluna de conteúdo principal -->
        <div class="col-12 col-md-6 dss-column-main">
          <div class="dss-main-content">
            <h1 class="dss-page-title">Título Principal</h1>
            <!-- Conteúdo principal -->
          </div>
        </div>
        
        <!-- Coluna lateral para informações adicionais -->
        <div class="col-12 col-md-3 dss-column-side">
          <q-card class="dss-side-content">
            <q-card-section>
              <div class="text-h6">Informações Adicionais</div>
            </q-card-section>
            <q-card-section>
              <!-- Conteúdo adicional -->
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</q-page-container>
```

### 5.2 Componentes de Layout

#### 5.2.1 Containers

Componentes que definem o contexto espacial para outros elementos:

- **Container Padrão**: Limita a largura máxima do conteúdo
- **Container Fluido**: Estende-se à largura total disponível
- **Container de Card**: Define espaçamento e bordas para conteúdo em cards

#### 5.2.2 Dividers

Elementos que criam separação visual:

- **Divider Horizontal**: Linha horizontal que separa conteúdos
- **Divider Vertical**: Linha vertical para separação de elementos lado a lado
- **Divider com Texto**: Incorpora texto para indicar mudança temática

#### 5.2.3 Agrupadores

Componentes que organizam elementos relacionados:

- **Grupo de Botões**: Agrupa controles relacionados com espaçamento adequado
- **Grupo de Campos**: Organiza campos de formulário relacionados
- **Grupo de Cards**: Estabelece relação visual entre múltiplos cards

## 6. Implementação Técnica com Quasar Framework

### 6.1 Arquitetura de Layout do Quasar

O DSS aproveita a robusta arquitetura de layout do Quasar Framework, que oferece uma estrutura completa e flexível para criar layouts responsivos. Os componentes fundamentais de layout do Quasar incluem:

#### 6.1.1 QLayout

O componente raiz que gerencia toda a estrutura de layout da aplicação:

```vue
<q-layout view="hHh lpR fFf">
  <q-header elevated class="dss-header">
    <!-- Conteúdo do cabeçalho -->
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    class="dss-sidebar"
    :width="240"
    :breakpoint="1024"
    bordered
  >
    <!-- Conteúdo da barra lateral -->
  </q-drawer>

  <q-page-container>
    <q-page class="dss-page">
      <!-- Conteúdo principal -->
    </q-page>
  </q-page-container>

  <q-footer class="dss-footer">
    <!-- Conteúdo do rodapé -->
  </q-footer>
</q-layout>
```

O atributo `view` do QLayout define o comportamento de cada seção (cabeçalho, rodapé, barra lateral) usando uma string de 9 caracteres que controla a altura/tamanho de cada área e se elas devem ser fixas, reveladas no scroll ou normais.

#### 6.1.2 QPage e QPageContainer

Estes componentes gerenciam o conteúdo principal da página:

- **QPageContainer**: Um wrapper obrigatório para QPage que gerencia o posicionamento correto da página em relação aos outros elementos do layout
- **QPage**: Contém o conteúdo principal e pode aplicar padding consistente e comportamentos de scroll

#### 6.1.3 QHeader, QFooter e QDrawer

Componentes para áreas específicas do layout:

- **QHeader**: Barra superior fixa ou revelada no scroll
- **QFooter**: Barra inferior fixa ou revelada no scroll
- **QDrawer**: Painéis laterais com suporte a comportamento responsivo avançado, incluindo configurações de breakpoint para modo desktop/mobile

### 6.2 Sistema de Grid do Quasar

O DSS utiliza o sistema de grid nativo do Quasar Framework, que é baseado em Flexbox com classes CSS. **Nota:** O Quasar não possui um componente `QGrid` - o sistema de grid é implementado via classes CSS.

#### 6.2.1 Classes CSS Row/Column do Quasar

O sistema de grid do Quasar utiliza classes CSS baseadas em Flexbox:

```html
<!-- Grid responsivo básico -->
<div class="row q-col-gutter-md">
  <div class="col-12 col-sm-6 col-md-4">
    <!-- Coluna 1: 12 cols (mobile), 6 cols (tablet), 4 cols (desktop) -->
  </div>
  <div class="col-12 col-sm-6 col-md-4">
    <!-- Coluna 2 -->
  </div>
  <div class="col-12 col-sm-12 col-md-4">
    <!-- Coluna 3 -->
  </div>
</div>
```

**Classes de tamanho de coluna:**
- `col-*` (1-12): Tamanho base para todos os breakpoints
- `col-sm-*`: A partir de SM (640px)
- `col-md-*`: A partir de MD (1024px)
- `col-lg-*`: A partir de LG (1440px)
- `col-xl-*`: A partir de XL (1920px)
- `col-auto`: Largura automática baseada no conteúdo
- `col-grow`: Cresce para preencher espaço disponível

**Classes de offset:**
- `offset-*` (1-11): Offset base
- `offset-sm-*`, `offset-md-*`, `offset-lg-*`, `offset-xl-*`: Offsets responsivos

**Classes de gutter (espaçamento entre colunas):**
- `q-col-gutter-none`: Sem espaçamento
- `q-col-gutter-xs`: 4px
- `q-col-gutter-sm`: 8px
- `q-col-gutter-md`: 16px
- `q-col-gutter-lg`: 24px
- `q-col-gutter-xl`: 32px

#### 6.2.2 Classes DSS com Nomenclatura BEM

O DSS fornece classes adicionais com nomenclatura BEM para CSS Grid nativo:

```html
<!-- CSS Grid com classes DSS BEM -->
<div class="dss-grid dss-grid--cols-1 dss-grid--sm-cols-2 dss-grid--md-cols-3 dss-grid--gap-md">
  <div class="dss-grid__item">Item 1</div>
  <div class="dss-grid__item">Item 2</div>
  <div class="dss-grid__item">Item 3</div>
</div>

<!-- Sistema de colunas flexbox DSS -->
<div class="dss-row dss-row--gap-md">
  <div class="dss-col-12 dss-col-sm-6 dss-col-md-4">Coluna 1</div>
  <div class="dss-col-12 dss-col-sm-6 dss-col-md-4">Coluna 2</div>
  <div class="dss-col-12 dss-col-sm-12 dss-col-md-4">Coluna 3</div>
</div>
```

**Classes DSS Grid (CSS Grid):**
- `.dss-grid`: Container grid base
- `.dss-grid--cols-*` (1-12): Colunas base
- `.dss-grid--sm-cols-*`, `.dss-grid--md-cols-*`, etc.: Colunas responsivas
- `.dss-grid--gap-*` (xs, sm, md, lg, xl): Espaçamento entre itens

**Classes DSS Flexbox:**
- `.dss-row`: Container flexbox horizontal
- `.dss-col-*` (1-12): Largura base
- `.dss-col-sm-*`, `.dss-col-md-*`, `.dss-col-lg-*`, `.dss-col-xl-*`: Larguras responsivas

### 6.3 Diretivas de Responsividade do Quasar

O DSS incorpora as diretivas responsivas do Quasar para controle granular de visibilidade por breakpoint:

```vue
<div v-if="$q.screen.gt.sm" class="dss-desktop-only">
  <!-- Conteúdo visível apenas em desktop -->
</div>

<div v-if="$q.screen.lt.md" class="dss-mobile-only">
  <!-- Conteúdo visível apenas em mobile -->
</div>

<!-- Ou usando diretivas -->
<div class="dss-section" v-show-gt-md>Visível em telas MD e acima</div>
<div class="dss-section" v-hide-lt-lg>Escondido em telas abaixo de LG</div>
```

O objeto `$q.screen` do Quasar fornece:
- Detecção automática de breakpoints
- Métodos de comparação (gt = maior que, lt = menor que, etc.)
- Diretivas de exibição responsiva para simplificar templates

### 6.4 CSS Grid e Flexbox

Além dos componentes e classes do Quasar, o DSS também utiliza CSS Grid e Flexbox nativos para layouts mais complexos e específicos:

- **CSS Grid**: Usado para layouts bidimensionais complexos e grids de página
- **Flexbox**: Aplicado para alinhamentos lineares e componentes mais simples

### 6.5 Classes Utilitárias DSS

O DSS fornece classes utilitárias com nomenclatura BEM para aplicação rápida de layouts. Essas classes estão definidas em `utils/_layout-helpers.scss`.

#### Container

```html
<!-- Container padrão com largura responsiva -->
<div class="dss-container">
  <!-- Largura: 100% (xs) → 608px (sm) → 960px (md) → 1280px (lg) → 1600px (xl/4k) -->
</div>

<!-- Container fluido (sempre 100%) -->
<div class="dss-container--fluid">
  <!-- Sempre 100% da largura -->
</div>
```

#### CSS Grid

```html
<!-- Grid responsivo com nomenclatura BEM -->
<div class="dss-grid dss-grid--cols-1 dss-grid--sm-cols-2 dss-grid--md-cols-3 dss-grid--gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Classes disponíveis:**
- `.dss-grid--cols-*` (1-12): Define número de colunas base
- `.dss-grid--sm-cols-*`: Colunas a partir de 640px
- `.dss-grid--md-cols-*`: Colunas a partir de 1024px
- `.dss-grid--lg-cols-*`: Colunas a partir de 1440px
- `.dss-grid--xl-cols-*`: Colunas a partir de 1920px
- `.dss-grid--4k-cols-*`: Colunas a partir de 3840px
- `.dss-grid--gap-xs`: Gap 4px
- `.dss-grid--gap-sm`: Gap 8px
- `.dss-grid--gap-md`: Gap 16px
- `.dss-grid--gap-lg`: Gap 24px
- `.dss-grid--gap-xl`: Gap 32px

#### Flexbox

```html
<!-- Sistema de colunas flexbox -->
<div class="dss-row dss-row--gap-md">
  <div class="dss-col-12 dss-col-sm-6 dss-col-md-4">Coluna 1</div>
  <div class="dss-col-12 dss-col-sm-6 dss-col-md-4">Coluna 2</div>
  <div class="dss-col-12 dss-col-sm-12 dss-col-md-4">Coluna 3</div>
</div>
```

#### Visibilidade Responsiva

```html
<!-- Esconder em breakpoints específicos -->
<div class="dss-hide-mobile">Escondido em mobile (< 640px)</div>
<div class="dss-hide-tablet">Escondido em tablet (640px - 1023px)</div>
<div class="dss-hide-desktop">Escondido em desktop (≥ 1024px)</div>

<!-- Mostrar apenas em breakpoints específicos -->
<div class="dss-show-mobile">Visível apenas em mobile</div>
<div class="dss-show-tablet">Visível apenas em tablet</div>
<div class="dss-show-desktop">Visível apenas em desktop</div>
```

#### Compatibilidade com Classes Legadas

Para migração gradual, as classes legadas ainda funcionam via `@extend`:

```html
<!-- Classes legadas (deprecated, usar BEM) -->
<div class="dss-grid-2">Equivalente a .dss-grid--sm-cols-2</div>
<div class="dss-grid-3">Equivalente a .dss-grid--sm-cols-3</div>
<div class="dss-hide-xs">Equivalente a .dss-hide-mobile</div>
```

### 6.6 Integração Quasar-Tailwind

O DSS implementa uma integração entre o Quasar Framework e o Tailwind CSS, garantindo que os breakpoints, espaçamentos e outras variáveis sejam consistentes entre os dois sistemas:

```js
// Exemplo de configuração que alinha Quasar e Tailwind
// Arquivo: quasar.config.js / tailwind.config.js

const breakpoints = {
  xs: 320,   // Mobile (mínimo suportado)
  sm: 640,   // Tablet (alinhado com Tailwind)
  md: 1024,  // Desktop
  lg: 1440,  // Wide desktop
  xl: 1920,  // Ultrawide
  '4k': 3840 // Ultra HD / 4K displays
};

const containers = {
  xs: '100%',   // Fluido em mobile
  sm: '608px',  // ~95% de 640px
  md: '960px',  // ~94% de 1024px
  lg: '1280px', // ~89% de 1440px
  xl: '1600px', // Limite de legibilidade
  '4k': '1600px' // Mesmo limite para 4K
};

const gutters = {
  xs: '8px',   // spacing-2
  sm: '16px',  // spacing-4
  md: '24px',  // spacing-6
  lg: '32px',  // spacing-8
  xl: '40px',  // spacing-10
  '4k': '48px' // spacing-12
};

// Configuração do Quasar (quasar.config.js)
module.exports = configure(function (ctx) {
  return {
    framework: {
      config: {
        screen: {
          bodyClasses: true, // Adiciona classes de breakpoint ao body
          // Quasar usa breakpoints diferentes internamente
          // mas respeita os valores CSS do DSS
        }
      }
    }
  };
});

// Configuração do Tailwind (tailwind.config.js)
module.exports = {
  theme: {
    screens: {
      'xs': breakpoints.xs + 'px',  // 320px
      'sm': breakpoints.sm + 'px',  // 640px
      'md': breakpoints.md + 'px',  // 1024px
      'lg': breakpoints.lg + 'px',  // 1440px
      'xl': breakpoints.xl + 'px',  // 1920px
      '4k': breakpoints['4k'] + 'px' // 3840px
    },
    container: {
      center: true,
      screens: {
        xs: containers.xs,
        sm: containers.sm,
        md: containers.md,
        lg: containers.lg,
        xl: containers.xl,
        '4k': containers['4k']
      }
    },
    extend: {
      spacing: {
        // Alinhado com tokens DSS
        '0': '0',
        'px': '1px',
        '0.5': '0.125rem',  // 2px
        '1': '0.25rem',     // 4px
        '1.5': '0.375rem',  // 6px
        '2': '0.5rem',      // 8px
        '2.5': '0.625rem',  // 10px
        '3': '0.75rem',     // 12px
        '3.5': '0.875rem',  // 14px
        '4': '1rem',        // 16px
        '5': '1.25rem',     // 20px
        '6': '1.5rem',      // 24px
        '7': '1.75rem',     // 28px
        '8': '2rem',        // 32px
        '9': '2.25rem',     // 36px
        '10': '2.5rem',     // 40px
        '11': '2.75rem',    // 44px
        '12': '3rem',       // 48px
        '14': '3.5rem',     // 56px
        '16': '4rem',       // 64px
        '20': '5rem',       // 80px
        '24': '6rem',       // 96px
        '28': '7rem',       // 112px
        '32': '8rem',       // 128px
        '36': '9rem',       // 144px
        '40': '10rem',      // 160px
        '44': '11rem',      // 176px
        '48': '12rem',      // 192px
        '52': '13rem',      // 208px
        '56': '14rem',      // 224px
        '60': '15rem',      // 240px
        '64': '16rem',      // 256px
        '72': '18rem',      // 288px
        '80': '20rem',      // 320px
        '96': '24rem',      // 384px
      }
    }
  }
};
```

**Nota:** Os valores de breakpoints do DSS são derivados do Tailwind CSS para garantir compatibilidade. A diferença principal é a adição do breakpoint XS (320px) e 4K (3840px) para suporte amplo de dispositivos.

## 7. Tokens de Design para Layout

Os tokens de layout estão definidos em `tokens/semantic/_spacing.scss` e `tokens/semantic/_breakpoints.scss`.

### 7.1 Tokens de Breakpoints

Tokens CSS Custom Properties para breakpoints responsivos:

| Token                      | Valor    | Aplicação                                  |
|----------------------------|----------|---------------------------------------------|
| `--dss-breakpoint-xs`      | 320px    | Breakpoint mobile (mínimo suportado)       |
| `--dss-breakpoint-sm`      | 640px    | Breakpoint tablet                          |
| `--dss-breakpoint-md`      | 1024px   | Breakpoint desktop                         |
| `--dss-breakpoint-lg`      | 1440px   | Breakpoint wide desktop                    |
| `--dss-breakpoint-xl`      | 1920px   | Breakpoint ultrawide                       |
| `--dss-breakpoint-4k`      | 3840px   | Breakpoint Ultra HD / 4K                   |

### 7.2 Tokens de Container

Larguras máximas dos containers por breakpoint:

| Token                      | Valor    | Aplicação                                  |
|----------------------------|----------|---------------------------------------------|
| `--dss-container-xs`       | 100%     | Container fluido em mobile                 |
| `--dss-container-sm`       | 608px    | Container tablet (~95% de 640px)           |
| `--dss-container-md`       | 960px    | Container desktop (~94% de 1024px)         |
| `--dss-container-lg`       | 1280px   | Container wide (~89% de 1440px)            |
| `--dss-container-xl`       | 1600px   | Container ultrawide (limite legibilidade)  |
| `--dss-container-4k`       | 1600px   | Container 4K (mesmo limite)                |

### 7.3 Tokens de Gutter

Espaçamento entre colunas por breakpoint:

| Token                      | Valor              | Pixels |
|----------------------------|--------------------|--------|
| `--dss-gutter-xs`          | spacing-2          | 8px    |
| `--dss-gutter-sm`          | spacing-4          | 16px   |
| `--dss-gutter-md`          | spacing-6          | 24px   |
| `--dss-gutter-lg`          | spacing-8          | 32px   |
| `--dss-gutter-xl`          | spacing-10         | 40px   |
| `--dss-gutter-4k`          | spacing-12         | 48px   |

### 7.4 Tokens de Grid Gap

Espaçamento entre elementos de grid:

| Token                      | Valor              | Pixels |
|----------------------------|--------------------|--------|
| `--dss-grid-gap-sm`        | spacing-2          | 8px    |
| `--dss-grid-gap-md`        | spacing-4          | 16px   |
| `--dss-grid-gap-lg`        | spacing-6          | 24px   |
| `--dss-grid-gap-xl`        | spacing-8          | 32px   |

### 7.5 Tokens de Layout Estrutural

Tokens para componentes de layout de página:

| Token                            | Valor    | Aplicação                              |
|----------------------------------|----------|----------------------------------------|
| `--dss-layout-sidebar-width`     | 240px    | Largura padrão de sidebars             |
| `--dss-layout-sidebar-width-mini`| 64px     | Largura de sidebar minimizada          |
| `--dss-layout-sidebar-width-wide`| 320px    | Largura de sidebar expandida           |
| `--dss-layout-header-height`     | 64px     | Altura padrão do header                |
| `--dss-layout-header-height-dense`| 48px    | Altura de header compacto              |
| `--dss-layout-footer-height`     | 64px     | Altura padrão do footer                |
| `--dss-layout-footer-padding`    | spacing-10| Padding do footer (40px)              |
| `--dss-layout-content-max-width` | 720px    | Largura máxima para leitura            |
| `--dss-layout-content-max-width-wide`| 960px| Largura expandida para dashboards      |

### 7.6 Tokens Semânticos Existentes

Tokens semânticos que já existem em `_spacing.scss`:

| Token                      | Valor              | Aplicação                              |
|----------------------------|--------------------|----------------------------------------|
| `--dss-container-padding`  | spacing-4 (16px)   | Padding padrão do container            |
| `--dss-section-spacing`    | spacing-12 (48px)  | Espaçamento entre seções               |
| `--dss-component-spacing`  | spacing-6 (24px)   | Espaçamento entre componentes          |

### 7.7 Tokens de Colunas do Grid

Sistema de colunas responsivas (4/8/12):

| Token                      | Valor | Aplicação                              |
|----------------------------|-------|----------------------------------------|
| `--dss-grid-columns-xs`    | 4     | 4 colunas em mobile                    |
| `--dss-grid-columns-sm`    | 8     | 8 colunas em tablet                    |
| `--dss-grid-columns-md`    | 12    | 12 colunas em desktop                  |
| `--dss-grid-columns-lg`    | 12    | 12 colunas em wide                     |
| `--dss-grid-columns-xl`    | 12    | 12 colunas em ultrawide                |
| `--dss-grid-columns-4k`    | 12    | 12 colunas em 4K                       |

## 8. Diretrizes de Uso com Quasar

### 8.1 Práticas Recomendadas para Quasar

- Utilize o componente QLayout como base para todas as páginas da aplicação
- Aproveite o sistema de layout do Quasar com a string de configuração `view` para definir o comportamento de cabeçalhos e menus laterais
- Use QPage e QPageContainer para garantir comportamento consistente em todas as páginas
- Aplique a configuração de 12 colunas para layouts complexos usando o sistema de grid do Quasar
- Utilize os componentes responsivos nativos do Quasar (QDrawer, QHeader, etc.) com suas configurações de breakpoint
- Combine as classes utilitárias do Quasar (`q-pa-*`, `q-ma-*`, etc.) com as classes personalizadas do DSS para espaçamento consistente

```vue
<!-- Exemplo de configuração recomendada do QLayout -->
<q-layout view="hHh LpR fFf">
  <!-- 
    Legenda da string de configuração "view":
    - Primeira linha (hHh): comportamento do cabeçalho (normal, grande, escondido)
    - Segunda linha (LpR): comportamento da barra lateral esquerda e direita (normal, mini, revelado)
    - Terceira linha (fFf): comportamento do footer (normal, grande, escondido)
  -->
</q-layout>
```

### 8.2 Acessibilidade com Quasar

O Quasar oferece suporte para acessibilidade, mas requer configuração adicional. O DSS estende essas capacidades:

- Utilize o sistema de QItems com atributos de acessibilidade apropriados para navegação
- Configure corretamente os atributos aria nos componentes QTable para tabelas acessíveis
- Implemente trap de foco em modais e drawers usando as capacidades do Quasar
- Aproveite os elementos HTML5 semânticos que o Quasar utiliza internamente (QHeader → header, QFooter → footer)
- Adicione os atributos aria-* apropriados aos componentes Quasar conforme documentação do DSS:

```vue
<!-- Exemplo de botão com acessibilidade aprimorada -->
<q-btn
  label="Mais Informações"
  aria-label="Abrir página de informações detalhadas"
  class="dss-btn-primary"
/>

<!-- Exemplo de drawer com acessibilidade -->
<q-drawer
  v-model="drawer"
  aria-label="Menu de navegação principal"
  aria-expanded="drawer"
>
  <!-- Conteúdo do drawer -->
</q-drawer>
```

### 8.3 Responsividade com Quasar

O Quasar oferece ferramentas poderosas para responsividade que o DSS aproveita:

- Utilize o objeto `$q.screen` para detecção de tamanhos de tela e aplicação condicional de estilos e comportamentos
- Implemente as diretivas de visibilidade do Quasar (v-show-gt-md, v-hide-lt-sm) para controle fino da exibição de elementos
- Configure o breakpoint de QDrawer para transformar automaticamente o menu lateral em overlay em telas menores
- Aproveite o sistema de responsividade automática do QTable para diferentes estratégias em desktop vs. mobile
- Adapte formulários usando as classes responsivas do sistema de grid:

```vue
<!-- Exemplo de uso do objeto $q.screen para responsividade -->
<script setup>
import { useQuasar } from 'quasar';
const $q = useQuasar();

// Exemplo de reatividade baseada em tamanho de tela
const columns = computed(() => {
  return $q.screen.lt.md
    ? mobileColumns // Menos colunas para mobile
    : desktopColumns // Mais colunas para desktop
});
</script>

<template>
  <!-- Classes responsivas do Quasar -->
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4">
      <!-- As classes col-* definem larguras diferentes por breakpoint -->
    </div>
  </div>
  
  <!-- Diretivas de visibilidade -->
  <div v-show-gt-sm class="dss-desktop-only-element">
    Visível apenas em telas maiores que SM
  </div>
</template>
```

### 8.4 Adaptação Avançada para Diferentes Dispositivos

- Configure a densidade de componentes Quasar (normal, confortável, compacta) de acordo com o tamanho da tela
- Ative comportamentos específicos para touch vs. mouse usando `$q.platform.has.touch`
- Implemente layouts alternativos para desktop vs. tablet vs. mobile usando slots nomeados:

```vue
<template>
  <!-- Abordagem com slots para diferentes tamanhos de tela -->
  <component :is="$q.screen.lt.sm ? 'div' : 'q-splitter'">
    <template v-if="$q.screen.lt.sm">
      <!-- Layout mobile empilhado -->
      <mobile-layout :data="data" />
    </template>
    
    <template v-else>
      <!-- Layout desktop dividido -->
      <template v-slot:before>
        <side-panel :data="data" />
      </template>
      
      <template v-slot:after>
        <main-content :data="data" />
      </template>
    </template>
  </component>
</template>
```

## 9. Exemplos e Casos de Uso

### 9.1 Layout de Página de Produto

![Exemplo: Página de Produto](/images/product-page-example.png)

Demonstra o uso do grid para criar uma página de produto com detalhes, imagens e informações relacionadas.

### 9.2 Layout de Dashboard Analítico

![Exemplo: Dashboard Analítico](/images/analytics-dashboard-example.png)

Ilustra a aplicação do sistema de grid para criar um dashboard com múltiplos widgets e visualizações de dados.

### 9.3 Layout de Configurações

![Exemplo: Página de Configurações](/images/settings-page-example.png)

Mostra como organizar controles e opções em uma interface de configurações.

## 10. Recursos e Ferramentas

### 10.1 Componentes Figma

O DSS fornece componentes Figma pré-configurados para grid e layout:

- Grid System (12 colunas)
- Templates de página responsivos
- Componentes de layout

### 10.2 Snippets de Código

Exemplos de código para implementação rápida dos padrões de layout:

#### Grid Responsivo (CSS Grid)

```html
<!-- Grid responsivo: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop) -->
<div class="dss-grid dss-grid--cols-1 dss-grid--sm-cols-2 dss-grid--md-cols-3 dss-grid--gap-md">
  <div class="dss-grid__item">Item 1</div>
  <div class="dss-grid__item">Item 2</div>
  <div class="dss-grid__item">Item 3</div>
  <div class="dss-grid__item">Item 4</div>
  <div class="dss-grid__item">Item 5</div>
  <div class="dss-grid__item">Item 6</div>
</div>
```

#### Grid com Quasar (Flexbox)

```html
<!-- Grid Quasar com gutter responsivo -->
<div class="row q-col-gutter-md">
  <div class="col-12 col-sm-6 col-md-4">
    <q-card>Card 1</q-card>
  </div>
  <div class="col-12 col-sm-6 col-md-4">
    <q-card>Card 2</q-card>
  </div>
  <div class="col-12 col-sm-12 col-md-4">
    <q-card>Card 3</q-card>
  </div>
</div>
```

#### Container Centralizado

```html
<!-- Container com largura máxima responsiva -->
<div class="dss-container">
  <h1 class="text-h4">Título da Página</h1>
  <p>Conteúdo centralizado com largura máxima por breakpoint.</p>
</div>
```

#### Layout de Conteúdo para Leitura

```html
<!-- Largura máxima para leitura confortável (720px) -->
<div class="dss-container" style="max-width: var(--dss-layout-content-max-width)">
  <article>
    <h1>Artigo</h1>
    <p>Texto otimizado para leitura com largura máxima de 720px.</p>
  </article>
</div>
```

#### Layout Responsivo com Visibilidade

```html
<!-- Conteúdo diferente por dispositivo -->
<div class="dss-show-mobile">
  <p>Menu mobile hamburger</p>
</div>
<nav class="dss-hide-mobile">
  <ul>
    <li>Menu desktop completo</li>
  </ul>
</nav>
```

#### Dashboard com Cards

```html
<div class="dss-grid dss-grid--cols-1 dss-grid--sm-cols-2 dss-grid--lg-cols-4 dss-grid--gap-lg">
  <q-card class="dss-widget">
    <q-card-section>
      <div class="text-h6">Métrica 1</div>
      <div class="text-h4">1,234</div>
    </q-card-section>
  </q-card>
  <q-card class="dss-widget">
    <q-card-section>
      <div class="text-h6">Métrica 2</div>
      <div class="text-h4">5,678</div>
    </q-card-section>
  </q-card>
  <!-- Mais cards... -->
</div>
```

### 10.3 Playground Interativo

Um sandbox para experimentação com os diferentes layouts e configurações do grid está disponível no portal de documentação do DSS.

## 11. Evolução e Manutenção com Quasar

Como parte do DSS, o sistema de grid e layout baseado no Quasar segue os mesmos princípios de governança e versionamento do design system como um todo, com algumas considerações específicas:

### 11.1 Atualização de Versões do Quasar

- **Compatibilidade entre Versões**: O DSS mantém uma matriz de compatibilidade com diferentes versões do Quasar Framework
- **Estratégia de Migração**: Documentação detalhada sobre como migrar para novas versões do Quasar quando necessário
- **Polyfills e Fallbacks**: Soluções para garantir compatibilidade quando componentes ou recursos do Quasar mudam entre versões

### 11.2 Versionamento e Governança

- **Versionamento Semântico**: Mudanças seguem SemVer (MAJOR.MINOR.PATCH)
- **Comunicação de Mudanças**: Alterações são documentadas em changelogs detalhados
- **Feedback e Evolução**: O sistema evolui com base em métricas e feedback dos usuários

### 11.3 Extensibilidade do Framework

- **Plugins Personalizados**: Documentação sobre como criar plugins Quasar personalizados que estendem o sistema de layout
- **Componentes de Layout Personalizados**: Diretrizes para desenvolver componentes de layout adicionais que se integram ao ecossistema Quasar
- **Temas Dinâmicos**: Estratégias para implementar trocas de tema que afetam o sistema de layout

---

## Apêndice A: Glossário de Termos

- **Container**: Elemento que confina o conteúdo dentro de uma largura máxima
- **Grid**: Sistema de linhas e colunas que organiza o conteúdo
- **Breakpoint**: Ponto na largura da tela onde o layout se adapta
- **Gutter**: Espaço entre colunas em um sistema de grid
- **Margin**: Espaço externo ao redor de um elemento
- **Padding**: Espaço interno dentro de um elemento
- **Densidade de Informação**: Quantidade de conteúdo por área da tela
- **Hierarquia de Atenção**: Classificação de elementos por importância visual

## Apêndice B: Referência de Componentes Quasar para Layout

| Componente | Descrição | Uso no DSS |
|------------|-----------|------------|
| QLayout | Componente raiz que gerencia a estrutura da página | Contêiner principal para todas as páginas |
| QPageContainer | Wrapper para QPage que gerencia posicionamento | Contém o conteúdo principal entre header/footer |
| QPage | Contém o conteúdo principal da página | Base para todos os templates de página |
| QHeader | Barra de navegação superior | Implementação do header principal |
| QFooter | Barra inferior | Implementação do footer da aplicação |
| QDrawer | Barra lateral deslizante | Menus laterais e painéis de configuração |
| QSplitter | Divisor de áreas de conteúdo arrastável | Layouts avançados como editor de código |
| QTabs | Abas para navegação | Navegação secundária em páginas |
| QToolbar | Barra de ferramentas | Barras de ação em headers e footers |
| QCard | Container com estilo de cartão | Blocos de conteúdo em grids |
| QExpansionItem | Item expansível | Menus acordeão em sidebars |
| QItemSection | Seção de item de lista | Construção de menus complexos |
| QList | Lista estruturada | Construção de menus e listas |
| QMarkupTable | Tabela semântica | Dados tabulares em layouts |
| QTable | Tabela interativa complexa | Visualizações de dados responsivas |
| QSticky | Elemento que se torna fixo no scroll | Headers de seção persistentes |

## Apêndice C: Classes CSS do Quasar para Layout

| Classe | Descrição | Exemplo de uso |
|--------|-----------|----------------|
| row | Define um container flexbox horizontal | `<div class="row">` |
| column | Define um container flexbox vertical | `<div class="column">` |
| col-* | Define largura de coluna (1-12) | `<div
