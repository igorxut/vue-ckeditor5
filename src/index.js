import VueCkeditorComponent from './vue-ckeditor'

const VueCkeditor = {
  version: VERSION,
  component: VueCkeditorComponent,
  plugin: {
    install (Vue, { name, editors }) {
      Vue.prototype.$VueCkeditorEditors = editors || {}

      Vue.component(name || VueCkeditorComponent.name, VueCkeditorComponent)
    }
  }
}

export default VueCkeditor
