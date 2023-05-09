<template>
  <div
    class="
      px-4
      py-2
      flex
      justify-between
      items-center
      h-row-largest
      flex-shrink-0
    "
    :class="[
      border ? 'border-b' : '',
      platform !== 'Windows' ? 'window-drag' : '',
    ]"
  >
    <Transition name="spacer">
      <div
        v-if="!showSidebar && platform === 'Mac' && languageDirection !== 'rtl'"
        class="h-full"
        :class="spacerClass"
      />
    </Transition>

    <div
      class="flex items-center window-no-drag gap-4 me-auto"
      :class="platform === 'Mac' && languageDirection === 'rtl' ? 'me-18' : ''"
    >
      <div class="flex">
        <SearchBar v-if="!hideSearch" />
        <BackLink
          v-if="backLink"
          class="
            border-l border-r border-white
            window-no-drag
            rtl-rotate-180
            py-2
          "
        />
        <a
          class="
            rounded-l-none
            cursor-pointer
            font-semibold
            flex
            items-center
            bg-gray-200
            text-gray-700
            px-3
            rounded-md
          "
          @click="$router.forward()"
        >
          <feather-icon name="chevron-right" class="w-4 h-4" />
        </a>
      </div>
      <h1
        class="
          text-xl
          font-semibold
          select-none
          whitespace-nowrap
          border-l
          pl-4
        "
        v-if="title"
      >
        {{ title }}
      </h1>
    </div>
    <div class="flex items-stretch window-no-drag gap-4">
      <slot name="left" />
    </div>
    <div
      class="flex items-stretch window-no-drag gap-2 ms-auto"
      :class="platform === 'Mac' && languageDirection === 'rtl' ? 'me-18' : ''"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { languageDirectionKey } from 'src/utils/injectionKeys';
import { showSidebar } from 'src/utils/refs';
import { defineComponent, inject, Transition } from 'vue';
import BackLink from './BackLink.vue';
import SearchBar from './SearchBar.vue';

export default defineComponent({
  props: {
    title: { type: String, default: '' },
    backLink: { type: Boolean, default: true },
    hideSearch: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    searchborder: { type: Boolean, default: true },
  },
  components: { BackLink, SearchBar, Transition },
  setup() {
    return { showSidebar, languageDirection: inject(languageDirectionKey) };
  },
  computed: {
    showBorder() {
      return !!this.$slots.default && this.searchborder;
    },
    spacerClass() {
      if (this.showSidebar) {
        return '';
      }

      if (this.border) {
        return 'w-tl me-4 border-e';
      }

      return 'w-tl me-4';
    },
  },
});
</script>
<style scoped>
.w-tl {
  width: var(--w-trafficlights);
}

.spacer-enter-from,
.spacer-leave-to {
  opacity: 0;
  width: 0px;
  margin-right: 0px;
  border-right-width: 0px;
}

.spacer-enter-to,
.spacer-leave-from {
  opacity: 1;
  width: var(--w-trafficlights);
  margin-right: 1rem;
  border-right-width: 1px;
}

.spacer-enter-active,
.spacer-leave-active {
  transition: all 150ms ease-out;
}
</style>
