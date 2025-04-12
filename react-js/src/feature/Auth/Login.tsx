import { Button } from "@mui/material";
import { FC } from "react";
import Main from "../Main/Main";
import { useLogin } from "./authHooks";

const Login: FC = () => {
	const loginMutation = useLogin();
	const handleLogin = () => {
		loginMutation.mutate({
			email: "test1@mail.com",
			password: "test123",
		});
	};

  return (
		<Main>
			Login page
			<Button onClick={handleLogin}>
				Login
			</Button>
		</Main>
	)
}

export default Login