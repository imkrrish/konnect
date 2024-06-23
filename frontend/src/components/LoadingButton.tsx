import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React, { FC } from "react";

export interface ILoadingButtonProps extends ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

const LoadingButton: FC<ILoadingButtonProps> = ({ children, loading, ...props }) => {
  return (
    <Button disabled={loading || props.disabled} {...props}>
      {loading ? (
        <div className="relative">
          <span className="invisible">{children}</span>
          <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <CircularProgress size={20} />
          </span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
