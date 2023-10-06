import { Typography, useTheme } from "@mui/material";
import FlexBw from "components/FlexBw";
import WidgetWrapper from "components/WidgetWrapper";

const Advert = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBw>
                <Typography color={dark} variant="h5" fontWeight="500">
                Advertisement
                </Typography>
                <Typography color={medium}>xyz.com</Typography>
            </FlexBw>
            <img
                width="100%"
                height="200rem"
                alt="advert"
                src={`${process.env.REACT_APP_BACKEND_URL}/assets/info${Math.floor(Math.random()*4 + 1)}.jpeg`}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <FlexBw>
                <Typography color={main}>Try Premium</Typography>
            </FlexBw>
            <Typography color={medium} m="0.5rem 0">
                Get access to premium features and avoid ads. Free trials for a month.
            </Typography>
        </WidgetWrapper>
    );
};

export default Advert;
