<template>
    <div>
        <h1>Suppliers</h1>
        <table class="table" v-if="suppliers.length > 0">
            <tr>
                <th>Company Name</th>
                <th>Contact Name</th>
                <th>Contact Title</th>
                <th>Address City</th>
                <th>Actions</th>
            </tr>
            <tr v-for="supplier in suppliers" :key="supplier.id">
                <td>{{ supplier.companyName }}</td>
                <td>{{ supplier.contactName }}</td>
                <td>{{ supplier.contactTitle }}</td>
                <td>{{ supplier.address.city }}</td>
                <td>
                    <router-link
                        tag="button"
                        :to="{
                            name: 'suppliers-edit',
                            params: { id: supplier.id }
                        }"
                        class="btn btn-primary"
                        >Edit</router-link
                    >
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
// importing the newly created service
import { SuppliersService } from '@/services/NorthwindService.js'

export default {
    data() {
        return {
            // this array is now empty until we get the result back from the api
            suppliers: []
        }
    },
    // this is one of the component's lifecycle hooks
    // that's going to trigger as soon as the component is created
    created() {
        SuppliersService.getAll()
            .then(r => (this.suppliers = r.data))
            .catch(err => console.error(err))
    }
}
</script>

<style></style>
