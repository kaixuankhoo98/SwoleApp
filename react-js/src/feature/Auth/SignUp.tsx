import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { SignupSchema, signupSchema, useSignUp } from "./authHooks";
import { ButtonStack } from "../../shared/components/ButtonStack";

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const { mutate, error, isError, isPending } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupSchema) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/login");
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
        Sign Up
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          alignItems: "center",
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
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              sx={{ marginBottom: 2 }}
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
              fullWidth
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              type="password"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
              sx={{ marginBottom: 2 }}
            />
          )}
        />

        <ButtonStack direction="row">
          <Button onClick={() => navigate("/login")} fullWidth>Cancel</Button>
          <Button filled type="submit" isLoading={isPending} fullWidth>
            Sign Up
          </Button>
        </ButtonStack>
      </Box>
      {isError && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {error?.message}
        </Typography>
      )}
    </Stack>
  );
};
