import { Card, CardContent, Typography, Grid } from "@mui/material";


export function DemoCard({ title, description, image, isActive = false }: { title: string; description: string; image: string; isActive?: boolean }) {
  return (
    <Card
      sx={{
        p: 2,
        textAlign: "center",
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        width: "50vh",
        height: "45vh",
        margin: "auto",
      }}
      elevation={4}
    >
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid size={12} sx={{ height: "20vh" }}>
            <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Grid>
          <Grid size={12}>
            <Typography variant="h6">{title}</Typography>
          </Grid>

          <Grid size={12}>
            <Typography variant="body1" align="left">{description}</Typography>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}
