<template>
	<mdb-row class="justify-content-center">
		<mdb-col sm="4">
			<mdb-card>
				<mdb-card-body>
					<form novalidate @submit.prevent="checkSignupForm">
						<p class="h4 text-center py-4">Sign up</p>
						<div class="grey-text">
							<mdb-input
								label="Your name"
								v-model="signupData.name"
								invalidFeedback="Please enter your name"
								validFeedback="Please enter a name"
								type="text"
								error="wrong"
								success="right"
								required
							/>
							<mdb-input
								label="Your email"
								v-model="signupData.email"
								invalidFeedback="Please enter an email"
								type="email"
								required
							/>
							<mdb-input
								label="Your password"
								v-model="signupData.password"
								invalidFeedback="Please enter a password"
								type="password"
								required
							/>
						</div>
						<div class="text-center py-4 mt-3">
							<mdb-btn gradient="winter-neva" class="black-text"
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
					<form novalidate @submit.prevent="checkLoginForm">
						<p class="h4 text-center py-4">Sign in</p>
						<div class="grey-text">
							<mdb-input
								v-model="loginData.email"
								invalidFeedback="Please enter a valid email"
								label="Your email"
								type="email"
								required
							/>
							<mdb-input
								v-model="loginData.password"
								label="Your password"
								type="password"
								invalidFeedback="Please enter a password"
								required
							/>
						</div>
						<div class="text-center py-4 mt-3">
							<mdb-btn gradient="frozen-dreams" class="black-text"
								>Login</mdb-btn
							>
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
		checkLoginForm(event) {
			if (this.loginData.email && this.loginData.password) {
				this.login(this.loginData);
				event.target.classList.remove('was-validated');
			} else {
				event.target.classList.add('was-validated');
			}
		},
		checkSignupForm(event) {
			if (
				this.signupData.email &&
				this.signupData.name &&
				this.signupData.password
			) {
				this.signup(this.signupData);
				event.target.classList.remove('was-validated');
			} else {
				event.target.classList.add('was-validated');
			}
		},
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
