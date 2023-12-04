import { Modal, Typography } from "@mui/material";
import TipWindow from "../TipWindow/TipWindow";

function ImportGoogleSheet({open, handleClose}) {
    return
    (
        <>
        <Modal
        open={open}
        onClose={handleClose}
        >
        <div>
            <Typography id="googleImport" variant="h5">Import Grant Data from Google</Typography>
        </div>
        <div>
            <Typography variant="body">Enter the URL or ID of the spreadsheet</Typography>
            <TipWindow 
            data={"Open the google spreadheet to be imported, click on share and then copy link. For additional help: https://support.google.com/drive/answer/2494822?hl=en"}>    
           </TipWindow>
        </div>

        </Modal>
        </>
    )
}

export default ImportGoogleSheet;