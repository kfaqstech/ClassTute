import { supabase } from "@/libs/supabase";
import useAuthStore from "@/stores/authStore";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface AuthProps {
  uid: string | null;
  email: string | null;
}

const withAuth = <P extends AuthProps>(Component: React.ComponentType<P>) => {
  return (props: Omit<P, keyof AuthProps>) => {
		const { fetchProfile } = useAuthStore()
    const [loading, setLoading] = useState(true);
    const auth = useRef<any>({});

    useEffect(() => {
      const authenticate = async () => {
        console.log("Checking Auth State....");
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (!session) {
            router.replace("/login");
          } else {
            auth.current = session.user;
						await fetchProfile()
          }
        } catch (_) {
          router.replace("/login");
        } finally {
          setLoading(false);
        }
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

    return (
      <Component
        {...(props as P)}
        uid={auth.current.id || ""}
        email={auth.current.email || ""}
      />
    );
  };
};

export default withAuth;
