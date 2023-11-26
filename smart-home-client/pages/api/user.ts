import axios from 'axios';
import { getSession } from 'next-auth/react';

const handleAuthorization = async (req, res) => {
	const session = await getSession({ req });
	const code = req.query.code;
	const clientId = '976194357979-pol64ecgghgtuvvcqe3qnf6icshlnn4i.apps.googleusercontent.com';
	const clientSecret = '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';
	const redirectUri = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/user`;

	try {
		const { data } = await axios.post('https://oauth2.googleapis.com/token', {
			code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code',
		});

		const accessToken = data.access_token;

		const { data: userInfo } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		console.log('userInfo', userInfo)
		axios
			.put(
				`${process.env.NEXT_PUBLIC_HOSTBACKEND}/user`,
				{
					user: {
						googleId: userInfo.id,
					},
				},
				{
					headers: {
						Authorization: `Token ${session.user.token}`,
					},
				}
			)
			.then(function (response) {
				console.log('response', response)
				return null
			})
			.catch(function (error) {
				console.log(error);
			});

		res.redirect(`${process.env.NEXT_PUBLIC_HOSTNAME}/profile?googleId=${userInfo.id}`);

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Ошибка при обработке авторизации Google' });
	}
};

export default handleAuthorization;