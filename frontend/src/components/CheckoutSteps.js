import { Link } from 'react-router-dom';
import  styled  from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { Breadcrumbs, Typography } from '@mui/material';


const CheckoutSteps= ({ step1, step2, step3 })=> {
    const theme = useTheme();

    const StyledLink = styled(Link)({
        display: "flex",
         color: theme.palette.grey[600],
        textDecoration: "none",
    });

    const StyledActiveLink = styled(Link)({
         color: theme.palette.primary.main,
    });

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <StyledLink to="/login" className={step1 ? StyledActiveLink : ""}>
                {step1 ? "Login" : "Login (Incomplete)"}
            </StyledLink>

            <StyledLink to="/shipping" className={step2 ? StyledActiveLink : ""}>
                {step2 ? "Shipping" : "Shipping (Incomplete)"}
            </StyledLink>

            <Typography color={step3 ? "textPrimary" : "textSecondary"} className={step3 ? StyledActiveLink : ""}>
                {step3 ? "Place Order" : "Place Order (Incomplete)"}
            </Typography>
        </Breadcrumbs>
    );
}

export default CheckoutSteps;