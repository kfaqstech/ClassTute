import { supabase } from "@/libs/supabase";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const withAuth = (Component: React.ComponentType) => {
	return (props: any) => {
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			const authenticate = async () => {
				supabase.auth.getSession().then(({ data: { session } }) => {
					if (!session) {
						router.replace('/login')
					} else {
						// if(!session.user.user_metadata?.role) {
						// 	router.replace('/onboarding')
						// }
					}
				}).catch(_ => {
					router.replace('/login')
				}).finally(() => {
					setLoading(false)
				})
			};

			authenticate();
		}, []);

		if (loading) {
			return (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}

		return <Component {...props} />;
	};
};

export default withAuth;
