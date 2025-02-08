import Alert from "@mui/material/Alert/Alert";

export default function InputErrors({ error }) {
  return (
    <div className="my-1">
      <Alert severity="error">{error}</Alert>
    </div>
  )
}