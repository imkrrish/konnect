import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import { Logo } from "../components/Icons/Logo";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import useForm from "../hooks/useForm";
import AuthApi, { LoginBody, LoginFormSchema } from "../api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingButton from "../components/LoadingButton";
import toast from "react-hot-toast";

export interface ILoginProps {}

const Login: FC<ILoginProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleFocus, errors, validate } = useForm([], LoginFormSchema, {
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data: LoginBody) => {
      const res = await AuthApi.login(data);
      if (!res.isSuccess) {
        throw new Error();
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Login Successful");
      navigate({
        to: "/meetings",
      });
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validate();
    if (!result.success) return;
    login(result.data);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} className="max-w-[450px] w-full">
        <Paper elevation={6} sx={{ borderRadius: "12px" }} className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className="font-semibold">
              Sign In
            </Typography>
            <Logo size={16} className="mt-0.5" />
          </div>
          <div className="flex flex-col items-start gap-1 relative">
            <Typography variant="subtitle1" htmlFor="email" component="label" className="font-medium text-sm">
              Email
            </Typography>
            <OutlinedInput
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Enter Email"
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <EmailIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
                </InputAdornment>
              }
              error={errors.email ? true : false}
              fullWidth
            />
            {errors.email && <p className="absolute -bottom-7 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="flex flex-col items-start gap-1 relative">
            <Typography variant="subtitle1" htmlFor="password" component="label" className="font-medium text-sm">
              Password
            </Typography>
            <OutlinedInput
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onFocus={handleFocus}
              error={errors.password ? true : false}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              size="small"
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    sx={{ color: "rgba(255,255,255,0.6)" }}
                    type="button"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && <p className="absolute -bottom-7 text-xs text-red-500">{errors.password}</p>}
          </div>

          <LoadingButton loading={isPending} fullWidth size="medium" variant="contained" type="submit">
            Sign In
          </LoadingButton>

          <Typography variant="subtitle2" align="center">
            {"Don’t have an account? "}
            <Button
              type="button"
              onClick={() => {
                navigate({
                  to: "/register",
                });
              }}
              variant="text"
              className="normal-case"
            >
              Register now
            </Button>
          </Typography>
        </Paper>
      </form>
    </Box>
  );
};

export const Route = createLazyFileRoute("/login")({
  component: Login,
});
