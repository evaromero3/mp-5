"use client";

import { useState } from "react";
import { TextField, Button, FormHelperText, Box, Typography } from "@mui/material";

export default function NewLinkForm() {
  const [orgLink, setOrgLink] = useState("");
  const [alias, setAlias] = useState("");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission behavior
    setFeedback("Submitting...");

    const payload = { originalURL: orgLink, alias };

    try {
      // Send a POST request to API endpoint -- calls backend logic 
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        // If there's an error, display it
        setFeedback(`Error: ${data.error || "Something went wrong."}`);
      } else {
        // On success, display the new short link
        setFeedback(`Success! Your short link is: ${window.location.origin}/r/${alias}`);
        // Clear the input fields for further submissions
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
      className="w-96 rounded-xl p-4 bg-sky-400"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5">Create a New Short Link</Typography>
      <TextField 
        variant="filled"
        sx={{ 
            width: "40%",
           // The main input element for the filled variant
           '& .MuiFilledInput-root': {
               '&:hover': {
               backgroundColor: '#8ec984', // Hover background color
               },
           },
           
           '& .MuiFormLabel-root': {
               '&:hover': {
               backgroundColor: '#8ec984', // Hover background color
               },
               padding: '0 4px', // some padding so text doesn't clash with edge
           }, }}
        label="Original Link"
        placeholder="https://example.com"
        value={orgLink}
        onChange={(e) => setOrgLink(e.target.value)}
      />

      <TextField 
        variant="filled"
        sx={{ 
             width: "40%",
            // The main input element for the filled variant
            '& .MuiFilledInput-root': {
                '&:hover': {
                backgroundColor: '#8ec984', // Hover background color
                },
            },
            
            '& .MuiFormLabel-root': {
                '&:hover': {
                backgroundColor: '#8ec984', // Hover background color
                },
                padding: '0 4px', // some padding so text doesn't clash with edge
            }, }}
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

      {feedback && <FormHelperText>{feedback}</FormHelperText>}
    </Box>
  );
}
