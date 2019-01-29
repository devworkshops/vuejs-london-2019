<template>
    <div>
        <h1>Login</h1>
        <form class="form" @submit.prevent="login()">
            <div class="form-group row">
                <label class="col-form-label">Username</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="model.username"
                    id="usernameField"
                />
            </div>
            <div class="form-group row">
                <label class="col-form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    v-model="model.password"
                    id="passwordField"
                />
            </div>
            <div class="row">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import { AuthService } from '@/services/NorthwindService.js'
export default {
    data() {
        return {
            model: {}
        }
    },
    methods: {
        login() {
            AuthService.login(this.model.username, this.model.password).then(
                () => {
                    this.$router.push('/suppliers')
                }
            )
        }
    }
}
</script>
