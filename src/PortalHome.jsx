import { Typography } from "@mui/material";
import ViewSigns from "./ViewSigns";

const PortalHome = () => {

  return (
    <>
      <Typography variant="h4" marginBottom={4}>
        Welcome to the staff portal
      </Typography>

      <Typography m={1} marginBottom={2}>
        <b>This is where you can create new signs, change existing ones or add new admins.</b>
      </Typography>

      <Typography variant="h5" m={1}>
        Create a new sign
      </Typography>

      <Typography m={1} marginBottom={2}>
        To create a new QR code sign, click on <b>ADD SIGN</b> in the drop-down menu.
        Fill in the text boxes labelled <b>Title</b> and <b>Description</b>.
        This is the information that will be shown to a visitor if they scan a QR code found in the arboretum.
        There is the option to add an image to what the visitor will see;
        click on the <b>BROWSE</b> button and choose a picture to upload from your computer or device.
        You will need to add the <b>latitude</b> and <b>longitude</b> for the location of the QR code.
        There are a number of ways you can find this:
        <ul>
          <li>On a computer, go to Google Maps and right click on the location</li>
          <li>On a computer, go to OpenStreetMap and right click on the location, then choose <b>Show address</b></li>
          <li>If you are at the location in the arboretum, most smart phones have a compass app that will show your
            current coordinates
          </li>
        </ul>
        Press <b>Submit</b> and new QR code sign will have been created.
      </Typography>

      <Typography variant="h5" m={1}>
        View or edit an exiting sign
      </ Typography>

      <Typography m={1} marginBottom={2}>
        To view or edit an existing sign, click on <b>EDIT SIGN</b> in the drop-down menu.
        Scroll through the list of signs to find the one you want to edit.
        Pressing <b>DELETE</b> will permanently delete the selected sign.
        Pressing <b>EDIT</b> will open the sign in edit mode.
        In edit mode you can change any parts of the sign. You can also download the QR code to print by pressing <b>DOWNLOAD QR CODE</b>.
      </Typography>

      <Typography variant="h5" m={1}>Create a new admin</Typography>
      <Typography m={1} marginBottom={2}>
        To create a new admin, click on <b>ADD ADMIN</b> in the drop-down menu.
        The username must be unique and the password must be at least 8 characters long, containing at least 1
        uppercase,
        lowercase and number.
        Ensure you remember the password so that you can give it to the new user.
        Users can change their own password when they log in.
      </Typography>

      <Typography variant="h5" m={1}>
        Change your password
      </Typography>

      <Typography m={1} marginBottom={2}>
        To change your password, click on <b>ACCOUNT</b> in a drop-down menu.
        Under <b>Change Password</b> enter your new password.
        The password must be at least 8 characters long, containing at least 1 uppercase, lowercase and
        number.
      </Typography>
    </>
  )
}

export default PortalHome
