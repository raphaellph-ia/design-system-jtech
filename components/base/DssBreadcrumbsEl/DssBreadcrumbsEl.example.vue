<script setup lang="ts">
// Isenção DSS — Policy DssSpace/DSS_IMPLEMENTATION_GUIDE.md: Arquivos .example.vue são isentos de Token First e Gate de Composição para scaffolding de contexto.
/**
 * DssBreadcrumbsEl — Exemplos de Uso
 *
 * Cenários cobertos:
 * 1. Básico: item clicável com label e prop to
 * 2. Com Ícone: item clicável com icon e label
 * 3. Item Atual: item estático (sem to), representando a página corrente, com aria-current
 * 4. Estados: demonstração de item clicável, item atual e item desabilitado juntos
 *
 * Nota: DssBreadcrumbs (container pai com separadores) ainda não implementado.
 * Os cenários usam <nav> + flex container para simular o contexto de trilha.
 */
import DssBreadcrumbsEl from './DssBreadcrumbsEl.vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 48px; padding: 24px;">

    <!-- ======================================================================
         CENÁRIO 1 — Básico
         Item clicável com apenas label e prop to.
         Demonstra o estado padrão (--clickable): cor subtle, sem underline.
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 1: Básico (item clicável)</p>

      <nav aria-label="Exemplo básico">
        <DssBreadcrumbsEl to="/home" label="Início" />
      </nav>
    </section>

    <!-- ======================================================================
         CENÁRIO 2 — Com Ícone
         Item clicável com ícone Material Icons antes do label.
         Demonstra a composição DssIcon + label dentro do DssBreadcrumbsEl.
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 2: Com Ícone</p>

      <nav aria-label="Exemplo com ícone" style="display: flex; align-items: center; gap: 8px;">
        <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
        <span aria-hidden="true">/</span>
        <DssBreadcrumbsEl to="/produtos" icon="shopping_cart" label="Produtos" />
        <span aria-hidden="true">/</span>
        <DssBreadcrumbsEl
          label="Detalhes do Produto"
          aria-current="page"
        />
      </nav>
    </section>

    <!-- ======================================================================
         CENÁRIO 3 — Item Atual
         Item estático sem to/href — representa a página corrente.
         O consumidor (DssBreadcrumbs pai) injeta aria-current="page" via $attrs.
         Demonstra: fonte semibold, sem hover, sem cursor pointer.
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 3: Item Atual (página corrente)</p>

      <nav aria-label="Exemplo item atual" style="display: flex; align-items: center; gap: 8px;">
        <DssBreadcrumbsEl to="/home" label="Início" />
        <span aria-hidden="true">/</span>
        <DssBreadcrumbsEl to="/produtos" label="Produtos" />
        <span aria-hidden="true">/</span>
        <!--
          aria-current="page" é injetado pelo DssBreadcrumbs pai via $attrs.
          Aqui demonstrado diretamente para fins de exemplo.
        -->
        <DssBreadcrumbsEl
          label="Fone de Ouvido Pro"
          aria-current="page"
        />
      </nav>
    </section>

    <!-- ======================================================================
         CENÁRIO 4 — Estados
         Demonstração dos 3 estados lado a lado:
         • item clicável (--clickable)
         • item atual (--current)
         • item desabilitado (--disabled)
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 4: Todos os Estados</p>

      <div style="display: flex; flex-direction: column; gap: 24px;">

        <!-- Trilha completa com todos os estados -->
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Trilha completa:</p>
          <nav aria-label="Trilha de navegação completa" style="display: flex; align-items: center; gap: 8px;">
            <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
            <span aria-hidden="true">/</span>
            <DssBreadcrumbsEl to="/categorias" label="Categorias" />
            <span aria-hidden="true">/</span>
            <DssBreadcrumbsEl to="/eletronicos" label="Eletrônicos" />
            <span aria-hidden="true">/</span>
            <DssBreadcrumbsEl label="Fones de Ouvido" aria-current="page" />
          </nav>
        </div>

        <!-- Item desabilitado isolado -->
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Item desabilitado (disable):</p>
          <DssBreadcrumbsEl
            to="/eletronicos"
            label="Eletrônicos"
            :disable="true"
          />
        </div>

        <!-- Com brand Hub -->
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Com brand Hub (laranja):</p>
          <div data-brand="hub">
            <nav aria-label="Trilha Hub" style="display: flex; align-items: center; gap: 8px;">
              <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
              <span aria-hidden="true">/</span>
              <DssBreadcrumbsEl to="/hub" label="Hub" />
              <span aria-hidden="true">/</span>
              <DssBreadcrumbsEl label="Configurações" aria-current="page" />
            </nav>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>
