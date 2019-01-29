import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import store from './store'
import Axios from 'axios'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const requireComponent = require.context(
    // The relative path of the components folder
    './components',
    // Whether or not to look in subfolders
    false,
    // The regular expression used to match base component filenames
    /[a-zA-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
    // Get component config
    const componentConfig = requireComponent(fileName)

    // Get PascalCase name of component
    const componentName = upperFirst(
        camelCase(
            // Strip the leading `./` and extension from the filename
            fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
    )

    // Register component globally
    Vue.component(
        componentName,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        componentConfig.default || componentConfig
    )
})

// Registering filters globally
const requireFilters = require.context(
    './filters',
    true,
    /[a-zA-Z]\w+\.(vue|js)$/
)
requireFilters.keys().forEach(fileName => {
    const componentConfig = requireFilters(fileName)
    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    )
    Vue.filter(componentName, componentConfig.default)
})

Axios.get('/static/config.json').then(config => {
    console.log(config)
    Axios.defaults.baseURL = config.data.apiBaseUrl

    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})
