import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Logo } from "./Icons/Logo";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useUserInfo } from "../hooks/useUserInfo";
import AuthApi from "../api/authApi";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  const navigate = useNavigate();
  const { data } = useUserInfo({ refetchOnMount: false });
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const res = await AuthApi.logout();
    if (res.isSuccess) {
      navigate({
        to: "/",
      });
      queryClient.setQueryData(["userInfo"], null);
      toast.success("Logout Successful");
    } else {
      toast.error("Something went wrong");
    }
  };

  const settings = [
    {
      label: "Profile",
      onClick: () => {},
    },
    {
      label: "Logout",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Logo size={20} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Konnect
          </Typography>

          {data && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={data.name} src="/public" sx={{ width: 30, height: 30 }} />
              </IconButton>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.onClick();
                    }}
                  >
                    <Typography variant="subtitle1" component={"p"} textAlign="left">
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
