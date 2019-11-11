import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light:   {
        primary: '#673ab7',
        secondary: '#e91e63',
        accent: '#9c27b0',
        error: '#ff5722',
        warning: '#ffc107',
        info: '#03a9f4',
        success: '#4caf50'
      },
    },
  },
  icons: {
    iconfont: 'faSvg'
  },
});
