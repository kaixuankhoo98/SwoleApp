import { Box, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema, useLogin } from "./authHooks";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";
import Button from "../../shared/components/Button";

export const Login: FC = () => {
  const navigate = useNavigate();
  const { validate } = useAuth();
  const { mutate, error, isError, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: async () => {
        await validate();
        navigate("/");
      },
    });
  };

  return (
    <Stack
      component="main"
      direction="column"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Welcome Back!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Login to continue.
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button type="submit" filled isLoading={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="body1" sx={{ alignSelf: 'center' }}>Don't have an account?</Typography>
        <Button onClick={() => navigate("/signup")}>
          Register
        </Button>
      </Box>

      {isError && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error instanceof Error ? error.message : "An error occurred"}
        </Typography>
      )}
    </Stack>
  );
};
