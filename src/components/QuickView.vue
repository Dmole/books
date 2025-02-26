<template>
  <div style="min-width: 192px; max-width: 300px">
    <div
      class="p-2 flex justify-between"
      :class="values.length ? 'border-b' : ''"
    >
      <p
        class="font-semibold text-base text-gray-900"
        v-if="schema?.naming !== 'random' && !schema?.isChild"
      >
        {{ name }}
      </p>
      <p class="font-semibold text-base text-gray-600">
        {{ schema?.label ?? '' }}
      </p>
    </div>
    <div v-if="values.length" class="flex gap-2 p-2 flex-wrap">
      <p v-for="v of values" :key="v.label" class="pill bg-gray-200">
        <span class="text-gray-600">{{ v.label }}</span>
        <span class="text-gray-800 ml-1.5">{{ v.value }}</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { isFalsy } from 'fyo/utils';
import { Field } from 'schemas/types';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    schemaName: { type: String, required: true },
    name: { type: String, required: true },
  },
  data() {
    return { values: [] } as { values: { label: string; value: string }[] };
  },
  watch: {
    async name(v1, v2) {
      if (v1 === v2) {
        return;
      }

      await this.setValues();
    },
  },
  async mounted() {
    await this.setValues();
  },
  methods: {
    async setValues() {
      const fields: Field[] = (this.schema?.fields ?? []).filter(
        (f) =>
          f &&
          f.fieldtype !== 'Table' &&
          f.fieldtype !== 'AttachImage' &&
          f.fieldtype !== 'Attachment' &&
          f.fieldname !== 'name' &&
          !f.hidden &&
          !f.meta &&
          !f.abstract &&
          !f.computed
      );

      const data = (
        await this.fyo.db.getAll(this.schemaName, {
          fields: fields.map((f) => f.fieldname),
          filters: { name: this.name },
        })
      )[0];

      this.values = fields
        .map((f) => {
          const value = data[f.fieldname];
          if (isFalsy(value)) {
            return { value: '', label: '' };
          }

          return {
            value: this.fyo.format(data[f.fieldname], f),
            label: f.label,
          };
        })
        .filter((i) => !!i.value);
    },
  },
  computed: {
    schema() {
      return this.fyo.schemaMap[this.schemaName];
    },
  },
});
</script>
