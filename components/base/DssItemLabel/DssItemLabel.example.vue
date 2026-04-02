<template>
  <div class="example-wrapper">

    <!-- ====================================================================
         Cenário 1 — Básico: Label principal com texto simples
         ==================================================================== -->
    <section class="example-section">
      <h2 class="example-title">1. Label básico</h2>
      <p class="example-description">
        Label principal dentro de um DssItemSection. Tipografia padrão —
        fonte base, peso normal, cor de texto primária.
      </p>
      <q-list>
        <DssItem>
          <DssItemSection avatar>
            <DssIcon name="person" />
          </DssItemSection>
          <DssItemSection>
            <DssItemLabel>Ana Silva</DssItemLabel>
            <DssItemLabel>Administradora do sistema</DssItemLabel>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection avatar>
            <DssIcon name="person" />
          </DssItemSection>
          <DssItemSection>
            <DssItemLabel>Carlos Eduardo Mendes</DssItemLabel>
            <DssItemLabel>Operador de campo</DssItemLabel>
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

    <!-- ====================================================================
         Cenário 2 — Caption: Label secundário com texto mutado
         ==================================================================== -->
    <section class="example-section">
      <h2 class="example-title">2. Caption (texto secundário)</h2>
      <p class="example-description">
        Label de suporte posicionado abaixo do label principal.
        Tipografia menor, cor mutada (--dss-text-subtle).
      </p>
      <q-list>
        <DssItem>
          <DssItemSection avatar>
            <DssIcon name="folder" />
          </DssItemSection>
          <DssItemSection>
            <DssItemLabel>Relatório mensal — Março 2026</DssItemLabel>
            <DssItemLabel caption>Atualizado há 2 horas · 4,2 MB</DssItemLabel>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection avatar>
            <DssIcon name="mail" />
          </DssItemSection>
          <DssItemSection>
            <DssItemLabel>Notificação de manutenção programada</DssItemLabel>
            <DssItemLabel caption>Sistema de Resíduos · 15 mar. 2026</DssItemLabel>
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

    <!-- ====================================================================
         Cenário 3 — Header: Cabeçalho de grupo de lista
         ==================================================================== -->
    <section class="example-section">
      <h2 class="example-title">3. Header (cabeçalho de seção)</h2>
      <p class="example-description">
        Separa grupos de itens em uma lista. Tipografia compacta em
        maiúsculas com espaçamento entre letras e padding de separação.
      </p>
      <q-list>
        <DssItemLabel header>Favoritos</DssItemLabel>
        <DssItem>
          <DssItemSection>
            <DssItemLabel>Dashboard principal</DssItemLabel>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection>
            <DssItemLabel>Relatórios mensais</DssItemLabel>
          </DssItemSection>
        </DssItem>
        <DssItemLabel header>Recentes</DssItemLabel>
        <DssItem>
          <DssItemSection>
            <DssItemLabel>Ordens de serviço — Fevereiro</DssItemLabel>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection>
            <DssItemLabel>Mapa de ativos — Zona Norte</DssItemLabel>
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

    <!-- ====================================================================
         Cenário 4 — Overline: Texto de categoria acima do label
         ==================================================================== -->
    <section class="example-section">
      <h2 class="example-title">4. Overline (texto de categoria)</h2>
      <p class="example-description">
        Texto de metadados posicionado acima do label principal.
        Indica categoria, tipo ou contexto em tipografia muito compacta.
      </p>
      <q-list>
        <DssItem>
          <DssItemSection>
            <DssItemLabel overline>Ordem de Serviço</DssItemLabel>
            <DssItemLabel>Manutenção preventiva — Bomba P-042</DssItemLabel>
            <DssItemLabel caption>Vence em 3 dias</DssItemLabel>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection>
            <DssItemLabel overline>Alerta crítico</DssItemLabel>
            <DssItemLabel>Pressão fora do limite operacional</DssItemLabel>
            <DssItemLabel caption>Sensor S-101 · Identificado às 08:42</DssItemLabel>
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

    <!-- ====================================================================
         Cenário 5 — Truncamento: Texto longo com linha máxima
         ==================================================================== -->
    <section class="example-section">
      <h2 class="example-title">5. Truncamento com prop lines</h2>
      <p class="example-description">
        Texto longo truncado com ellipsis ao atingir o número máximo
        de linhas. Útil em listas densas com descrições longas.
      </p>
      <q-list style="max-width: 400px;">
        <DssItem>
          <DssItemSection>
            <DssItemLabel>Relatório de inspeção — Rede de distribuição</DssItemLabel>
            <DssItemLabel caption :lines="2">
              Inspeção completa realizada nas tubulações da zona sul,
              cobrindo 47 km de rede. Foram identificados 3 pontos
              críticos de infiltração e 12 conexões com desgaste acentuado.
            </DssItemLabel>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection>
            <DssItemLabel :lines="1">
              Este é um título muito longo que será truncado em uma única linha
              com ellipsis ao final quando ultrapassar a largura disponível
            </DssItemLabel>
            <DssItemLabel caption>Clique para expandir</DssItemLabel>
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

  </div>
</template>

<script setup lang="ts">
import DssItemLabel from './DssItemLabel.vue'
import DssItem from '../DssItem/DssItem.vue'
import DssItemSection from '../DssItemSection/DssItemSection.vue'
import DssIcon from '../DssIcon/DssIcon.vue'
</script>

<style scoped>
.example-wrapper {
  padding: var(--dss-spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-8);
}

.example-section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.example-title {
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  margin: var(--dss-spacing-0);
}

.example-description {
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  margin: var(--dss-spacing-0);
}
</style>
