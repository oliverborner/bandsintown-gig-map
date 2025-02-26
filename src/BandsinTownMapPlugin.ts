import type { App } from 'vue';
import GigMap from './components/BandsinTownGigMap.vue';

const BandsinTownGigMapPlugin = {
  install: (app: App) => {
    app.component('bandsintown-gig-map', GigMap);
  },
};

// Default export for direct importing
export default GigMap;

// Named export for Vue plugin installation
export { GigMap, BandsinTownGigMapPlugin };