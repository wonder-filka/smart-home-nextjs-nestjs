import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';



export default NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				// const parsedCookies = parseCookies({ req });
				// console.log(parsedCookies.rememberMe)
				const email = credentials?.email;
				const password = credentials?.password

				const user = await axios
					.post(`${process.env.NEXT_PUBLIC_HOSTBACKEND}/users/login`, {
						user: {
							email: email,
							password: password,
						},
					})
					.then((response) => {
						return response.data.user;
					}).catch(error => {
						throw error;
					});
				console.log('user auth', user)
				if (user && user.isConfirmed == true) {
					// credentials.csrfToken = user.token;
					user.name = user.firstname
					user.passwordExist = user.passwordExist

					return user;
				}
				return null;
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: "/login",
	},

	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('profile', profile)
			console.log('account', account)
			console.log('user', user)
			if (account.provider === "credentials") {
				return true;
			}
			if (account.provider === "google") {
				try {
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_HOSTBACKEND}/google/login`,
						{
							user: {
								googleId: profile.sub,
							},
						}
					);
					if (response) {
						console.log('response.data login', response.data)
						user.name = response.data.user.firstname
						user.token = response.data.user.token
						user.passwordExist = response.data.user.passwordExist
						user.googleId = response.data.user.googleId
						user.id = response.data.user.id
						user.firstname = response.data.user.firstname
						user.lastname = response.data.user.lastname
						user.email = response.data.user.email
						user.mobile = response.data.user.mobile
						user.photo = response.data.user.photo
						return true;
					}
				} catch (error) {
					console.log("Error in first axios call:", error);
				}

				try {
					const data = {
						user: {
							firstname: profile.given_name,
							lastname: profile.family_name,
							email: profile.email,
							password: profile.at_hash,
							googleId: profile.sub,
							photo: profile.picture,
							mobile: null,
						},
					};

					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_HOSTBACKEND}/users/google`,
						data
					);
					console.log('response.data registration', response.data)
					console.log('profile registration', profile)
					user.name = profile.given_name
					user.token = response.data.user.token
					user.passwordExist = response.data.user.passwordExist
					user.googleId = response.data.user.googleId
					user.id = response.data.user.id
					user.firstname = profile.given_name
					user.lastname = profile.family_name
					user.mobile = response.data.user.mobile
					user.photo = profile.picture
					return true;
				} catch (error) {
					console.log("Error in second axios call:", error);
				}
			}
		},
		async jwt({ token, trigger, user, session }) {
			if (trigger === "update") {
				return { ...token, ...session.user };
			}
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token as any
			return session
		}
	},
	// session: {
	// 	maxAge: 30 * 24 * 60 * 60, // 30 дней
	// 	updateAge: 24 * 60 * 60,
	// },
});

