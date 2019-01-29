<template>
  <div>
    <h1>{{ id ? `Supplier #${id}` : 'New Supplier' }}</h1>
    <form class="form">
      <div class="form-group">
        <label class="form-label">Company Name</label>
        <input
          class="form-control"
          type="text"
          v-model="model.companyName"
          id="companyNameField"
          :class="{ 'is-invalid': errors && errors.companyName }"
        >
        <div class="invalid-feedback" v-if="errors && errors.companyName">{{ errors.companyName }}</div>
      </div>
      <div class="form-group">
        <label class="form-label">Contact Name</label>
        <input class="form-control" type="text" v-model="model.contactName" id="contactNameField"
        :class="{ 'is-invalid': errors && errors.contactName }">
        <div class="invalid-feedback" v-if="errors && errors.contactName">{{ errors.contactName }}</div>
      </div>
      <div class="form-group">
        <label class="form-label">Contact Title</label>
        <input class="form-control" type="text" v-model="model.contactTitle" id="contactTitleField"
        :class="{ 'is-invalid': errors && errors.contactTitle }">
        <div class="invalid-feedback" v-if="errors && errors.contactTitle">{{ errors.contactTitle }}</div>
      </div>
      <div v-if="model.address">
        <label class="col-form-label">Address</label>
        <address-form :address="model.address" :errors="errors"></address-form>
      </div>
    </form>
    <p>
      <button @click="save()" class="btn btn-primary" id="saveButton">Save</button>
      <router-link class="btn" to="/suppliers">Cancel</router-link>
    </p>
  </div>
</template>

<script>
import { SuppliersService } from '@/services/NorthwindService.js'

export default {
    name: 'SupplierEdit',
    props: {
        id: String,
        supplier: Object
    },
    data() {
        return {
            model: { address: {} },
            errors: undefined
        }
    },
    created() {
        if (this.id) {
            SuppliersService.get(this.id).then(r => (this.model = r.data))
        }
    },
    mounted() {
        if (this.supplier) {
            this.model = this.supplier
        }
    },
    methods: {
        save() {
            if (this.id) {
                SuppliersService.update(this.model)
                    .then(() => this.navigateBack())
                    .catch(err => {
                        if (err.response.status == 422) {
                            this.errors = err.response.data.errors
                        }
                    })
            } else {
                SuppliersService.create(this.model)
                    .then(() => this.navigateBack())
                    .catch(err => console.error(err))
            }
        },
        navigateBack() {
            this.$router.push('/suppliers')
        }
    }
}
</script>

<style></style>
