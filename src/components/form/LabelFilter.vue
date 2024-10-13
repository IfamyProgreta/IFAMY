<!--
* @Component:
* @Maintainer: Adamy
* @Description: penyaring tanda
-->
<script setup lang="ts">
// nilai model alat peraga Pilih daftar tag
// props labelList daftar label (termasuk label "semua")

interface Props {
  modelValue: string;
  labelList: string[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="">
    <v-chip-group
      v-model="props.modelValue"
      active-class="primary--text"
      mandatory
      multiple
      show-arrows
      column
    >
      <v-chip
        v-for="(label, index) in props.labelList"
        :key="index"
        :value="label"
        class="ma-2"
        color="primary"
        label
        outlined
        small
      >
        {{ label }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<style scoped lang="scss"></style>
