import { Button } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <div>
      <Button variant="contained">Click</Button> Hello /!
    </div>
  ),
});
