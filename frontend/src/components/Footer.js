import { Container, Grid, Typography } from "@mui/material"

const Footer = () =>{
    return(
        <footer style={{ 
            position: "fixed", 
            bottom: 0, 
            width: "100%", 
            backgroundColor: "#0b5ed7", 
            textAlign: "center", 
            padding: "2px",
            marginTop:"10px"
        }}>
            <Container>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="body1" color="White" align="center">
                            Copyright &copy; ShopStore
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    )
}

export default Footer