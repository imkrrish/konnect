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
import AuthApi, { RegisterBody, RegisterFormSchema } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import LoadingButton from "../components/LoadingButton";
import toast from "react-hot-toast";

export interface IRegisterPageProps {}

const RegisterPage: FC<IRegisterPageProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleFocus, errors, validate } = useForm([], RegisterFormSchema, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { mutate: register, isPending } = useMutation({
    mutationFn: async (data: RegisterBody) => {
      const res = await AuthApi.register(data);
      if (!res.isSuccess) {
        throw new Error();
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Registration Successful, please login");
      navigate({
        to: "/login",
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
    register(result.data);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} className="max-w-[500px] w-full">
        <Paper elevation={6} sx={{ borderRadius: "12px" }} className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className="font-semibold">
              Sign Up
            </Typography>
            <Logo size={16} className="mt-0.5" />
          </div>

          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col items-start gap-1 relative flex-1">
              <Typography variant="subtitle1" htmlFor="firstName" component="label" className="font-medium text-sm">
                First Name
              </Typography>
              <OutlinedInput
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Enter First Name"
                size="small"
                error={errors.firstName ? true : false}
                fullWidth
              />
              {errors.firstName && <p className="absolute -bottom-7 text-xs text-red-500">{errors.firstName}</p>}
            </div>

            <div className="flex flex-col items-start gap-1 flex-1">
              <Typography variant="subtitle1" htmlFor="lastName" component="label" className="font-medium text-sm">
                Last Name
              </Typography>
              <OutlinedInput id="lastName" name="lastName" value={values.lastName} onChange={handleChange} onFocus={handleFocus} placeholder="Enter First Name" size="small" fullWidth />
            </div>
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

          <div className="flex flex-col items-start gap-1 relative">
            <Typography variant="subtitle1" htmlFor="confirmPassword" component="label" className="font-medium text-sm">
              Confirm Password
            </Typography>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onFocus={handleFocus}
              error={errors.confirmPassword ? true : false}
              type={showConfirmPassword ? "text" : "password"}
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
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.confirmPassword && <p className="absolute -bottom-7 text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>

          <LoadingButton loading={isPending} fullWidth size="medium" variant="contained" type="submit">
            Sign Up
          </LoadingButton>

          <Typography variant="subtitle2" align="center">
            {"Already have an account?"}
            <Button
              type="button"
              onClick={() => {
                navigate({
                  to: "/login",
                });
              }}
              variant="text"
              className="normal-case"
            >
              Sign In
            </Button>
          </Typography>
        </Paper>
      </form>
    </Box>
  );
};

export const Route = createLazyFileRoute("/register")({
  component: RegisterPage,
});
