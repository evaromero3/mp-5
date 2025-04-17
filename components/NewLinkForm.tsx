"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";

export default function NewLinkForm() {
  const [orgLink, setOrgLink] = useState("");
  const [alias, setAlias] = useState("");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback("Submitting...");

    const payload = { originalURL: orgLink, alias };

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setFeedback(`Error: ${data.error || "Something went wrong."}`);
      } else {
        setFeedback(
          `Success! Your short link is: ${window.location.origin}/r/${alias}`
        );
        setOrgLink("");
        setAlias("");
      }
    } catch (error) {
      console.error("Error creating link:", error);
      setFeedback("Error connecting to the server.");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 384, // roughly 384px or 96 * 4px if using a 4px scale
        borderRadius: 2, // theme's borderRadius value
        p: 4, // padding: 4 spacing units
        bgcolor: "primary.light", // use the primary light color from your theme
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ color: "primary.contrastText" }}>
        Create a New Short Link
      </Typography>

      <TextField
        variant="filled"
        sx={{
          width: "100%",
          // Style the input container for the filled TextField.
          "& .MuiFilledInput-root": {
            bgcolor: "background.paper", // Use your theme's background paper color
            transition: "background-color 0.3s",
            "&:hover": {
              bgcolor: "secondary.light", // Change color on hover using theme's secondary color
            },
          },
          // Style the label so its background is consistent with the input
          "& .MuiFormLabel-root": {
            transition: "background-color 0.3s",
            "&:hover": {
              bgcolor: "secondary.light",
            },
            px: 1, // padding (use shorthand for paddingLeft & paddingRight)
          },
        }}
        label="Original Link"
        placeholder="https://example.com"
        value={orgLink}
        onChange={(e) => setOrgLink(e.target.value)}
      />

      <TextField
        variant="filled"
        sx={{
          width: "100%",
          "& .MuiFilledInput-root": {
            bgcolor: "background.paper",
            transition: "background-color 0.3s",
            "&:hover": {
              bgcolor: "secondary.light",
            },
          },
          "& .MuiFormLabel-root": {
            transition: "background-color 0.3s",
            "&:hover": {
              bgcolor: "secondary.light",
            },
            px: 1,
          },
        }}
        label="Alias"
        placeholder="custom-alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />

      <Button
        variant="contained"
        type="submit"
        disabled={!orgLink || !alias}
        sx={{ width: "80px" }}
      >
        Submit
      </Button>
      
      {feedback && <FormHelperText sx={{ color: "primary.contrastText" }}
        >{feedback}</FormHelperText>}
      
      
    </Box>
  );
}
