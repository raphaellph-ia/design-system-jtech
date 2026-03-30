<template>
  <div class="btn-group-examples">
    <h2>DssBtnGroup — Exemplos</h2>

    <!-- ==========================================
         Exemplo 1: Básico com texto (unelevated)
         Props de estilo declaradas em grupo E filhos (prop sync)
         ========================================== -->
    <section class="example-section">
      <h3>1. Básico (Unelevated)</h3>
      <p>Grupo padrão com botões sem elevação.</p>
      <DssBtnGroup unelevated>
        <DssButton unelevated color="primary" label="Primeiro" />
        <DssButton unelevated color="primary" label="Segundo" />
        <DssButton unelevated color="primary" label="Terceiro" />
      </DssBtnGroup>
    </section>

    <!-- ==========================================
         Exemplo 2: Outline com ícones
         ========================================== -->
    <section class="example-section">
      <h3>2. Outline com Ícones</h3>
      <p>Grupo de botões com bordas e ícones. Ideal para seleção de visualização.</p>
      <DssBtnGroup outline aria-label="Opções de visualização">
        <DssButton outline icon="view_list" aria-label="Visualização em lista" />
        <DssButton outline icon="grid_view" aria-label="Visualização em grade" />
        <DssButton outline icon="map" aria-label="Visualização em mapa" />
      </DssBtnGroup>
    </section>

    <!-- ==========================================
         Exemplo 3: Flat para toolbar (formatação de texto)
         ========================================== -->
    <section class="example-section">
      <h3>3. Flat (Toolbar de Formatação)</h3>
      <p>Grupo flat com separador sutil. Padrão para barras de ferramentas.</p>
      <DssBtnGroup flat aria-label="Formatação de texto">
        <DssButton flat icon="format_bold" aria-label="Negrito" />
        <DssButton flat icon="format_italic" aria-label="Itálico" />
        <DssButton flat icon="format_underline" aria-label="Sublinhado" />
        <DssButton flat icon="strikethrough_s" aria-label="Tachado" />
      </DssBtnGroup>
    </section>

    <!-- ==========================================
         Exemplo 4: Spread (largura total)
         Ideal para ações de formulário ou modal
         ========================================== -->
    <section class="example-section">
      <h3>4. Spread (Largura Total)</h3>
      <p>Botões distribuídos horizontalmente ocupando toda a largura disponível.</p>
      <DssBtnGroup unelevated spread>
        <DssButton unelevated label="Cancelar" />
        <DssButton unelevated color="primary" label="Confirmar" />
      </DssBtnGroup>
    </section>

    <!-- ==========================================
         Exemplo 5: Com Brand (Hub e Water)
         ========================================== -->
    <section class="example-section">
      <h3>5. Com Brand</h3>

      <h4>Brand Hub (Laranja)</h4>
      <DssBtnGroup unelevated brand="hub">
        <DssButton unelevated color="primary" label="Editar" icon="edit" />
        <DssButton unelevated color="primary" label="Salvar" icon="save" />
        <DssButton unelevated color="primary" label="Excluir" icon="delete" />
      </DssBtnGroup>

      <h4>Brand Water (Azul)</h4>
      <DssBtnGroup outline brand="water" aria-label="Ações de exportação">
        <DssButton outline icon="file_download" aria-label="Download" />
        <DssButton outline icon="print" aria-label="Imprimir" />
        <DssButton outline icon="share" aria-label="Compartilhar" />
      </DssBtnGroup>
    </section>

    <!-- ==========================================
         Exemplo 6: Rounded (cantos arredondados)
         ========================================== -->
    <section class="example-section">
      <h3>6. Rounded (Cantos Arredondados)</h3>
      <p>Cantos pill nas extremidades. Intermediários continuam retos.</p>
      <DssBtnGroup unelevated rounded>
        <DssButton unelevated rounded color="primary" label="Sim" />
        <DssButton unelevated rounded label="Talvez" />
        <DssButton unelevated rounded label="Não" />
      </DssBtnGroup>
    </section>

    <!-- ==========================================
         Demonstração: Prop Sync (correto vs incorreto)
         ========================================== -->
    <section class="example-section">
      <h3>⚠️ Prop Sync — Correto vs Incorreto</h3>
      <p>Os DssButton filhos DEVEM ter as mesmas props de estilo que o grupo.</p>

      <h4>❌ Anti-pattern: filhos sem prop outline</h4>
      <p>Resultado: grupo tem outline, botões não.</p>
      <DssBtnGroup outline>
        <DssButton label="Sem outline" />
        <DssButton label="Sem outline" />
      </DssBtnGroup>

      <h4>✅ Correto: filhos com prop outline</h4>
      <DssBtnGroup outline>
        <DssButton outline label="Com outline" />
        <DssButton outline label="Com outline" />
      </DssBtnGroup>
    </section>
  </div>
</template>

<script setup lang="ts">
import DssBtnGroup from './DssBtnGroup.vue'
import DssButton from '../DssButton/DssButton.vue'
</script>

<style scoped>
.btn-group-examples {
  padding: var(--dss-spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

.example-section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-4);
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}
</style>
