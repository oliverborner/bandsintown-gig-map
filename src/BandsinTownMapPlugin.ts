import type { App } from 'vue';
import GigMap from './components/BandsinTownGigMap.vue';

const BandsinTownGigMapPlugin = {
  install: (app: App) => {
    app.component('bandsintown-gig-map', GigMap);
  },
};

// Globale Variable für die Nutzung in HTML-Dateien
if (typeof window !== 'undefined') {
  (window as any).BandsinTownGigMapPlugin = BandsinTownGigMapPlugin;
}

// Default export for direct importing
export default GigMap;

// Named export for Vue plugin installation
export { GigMap, BandsinTownGigMapPlugin };