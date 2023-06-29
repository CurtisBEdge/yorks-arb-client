import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "mui-image";

import qrCodeEx from './img/qrCodeEx.png'

const Home = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <>
      <Typography variant='h4' align={isDesktop ? "left" : "center"}>Guided Tree Walk</Typography>
      <Typography mb={1} mt={1}>
        As you walk around the Yorkshire Arboretum you will see QR codes on trees or other points of interest.
        Scan these to find out more about your current location.
      </Typography>
      <Typography fontWeight='bold'>Scanning a QR code</Typography>
      <Typography mb={1} mt={1}>
        To scan a QR code with your phone, open your camera app and point your camera at the code.
        The code doesn't need to fill the entire screen, but all four corners must be visible.
        A pop-up banner should appear, tap the banner or a yellow QR code icon to see the information about your location.
      </Typography>
      <Typography>
        If you are using an older Android phone you may need to use the Google lens app instead of the camera.
      </Typography>

      <Image
        src={qrCodeEx}
        style={{ width: isDesktop ? "30%" : "50%", height: 'auto', paddingTop: '2rem' }}
      />
    </>
  );
};

export default Home;
