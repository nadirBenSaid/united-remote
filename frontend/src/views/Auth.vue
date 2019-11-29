<template>
	<mdb-row class="justify-content-center">
		<mdb-col sm="4">
			<mdb-card>
				<mdb-card-body>
					<form>
						<p class="h4 text-center py-4">Sign up</p>
						<div class="grey-text">
							<mdb-input
								label="Your name"
								v-model="signupData.name"
								group
								type="text"
								validate
								error="wrong"
								success="right"
								required
							/>
							<mdb-input
								label="Your email"
								v-model="signupData.email"
								group
								type="email"
								validate
								error="wrong"
								success="right"
								required
							/>
							<mdb-input
								label="Your password"
								v-model="signupData.password"
								group
								type="password"
								validate
								required
							/>
						</div>
						<div class="text-center py-4 mt-3">
							<mdb-btn color="cyan" @click="signup(signupData)"
								>Register</mdb-btn
							>
						</div>
					</form>
				</mdb-card-body>
			</mdb-card>
		</mdb-col>
		<mdb-col sm="1"></mdb-col>
		<mdb-col sm="4">
			<mdb-card>
				<mdb-card-body>
					<form>
						<p class="h4 text-center py-4">Sign in</p>
						<div class="grey-text">
							<mdb-input
								v-model="loginData.email"
								label="Your email"
								type="email"
								required
							/>
							<mdb-input
								v-model="loginData.password"
								label="Your password"
								type="password"
								required
							/>
						</div>
						<div class="text-center py-4 mt-3">
							<mdb-btn @click="login(loginData)">Login</mdb-btn>
						</div>
					</form>
				</mdb-card-body>
			</mdb-card>
		</mdb-col>
	</mdb-row>
</template>

<script>
import { mdbInput, mdbBtn, mdbCard, mdbCardBody, mdbRow, mdbCol } from 'mdbvue';
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'Auth',
	components: {
		mdbInput,
		mdbBtn,
		mdbCard,
		mdbCardBody,
		mdbRow,
		mdbCol,
	},
	data: () => {
		return {
			loginData: {
				email: '',
				password: '',
			},
			signupData: {
				name: '',
				email: '',
				password: '',
			},
		};
	},
	methods: {
		...mapActions(['login', 'signup']),
	},
	computed: {
		...mapGetters(['getToken']),
	},
};
</script>

<style scoped>
.row {
	margin-left: 0%;
	margin-right: 0%;
	margin-top: 7%;
}
</style>
