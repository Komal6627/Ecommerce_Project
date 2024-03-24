import { Container, Grid, Typography } from "@mui/material"

const Footer = () =>{
    return(
        <footer>
            <Container>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="body1" color="textSecondary" align="center">
                            Copyright &copy; ShopStore
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    )
}

export default Footer