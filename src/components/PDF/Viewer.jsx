import { PDFViewer } from '@react-pdf/renderer';
import Document from './PDFDocument.jsx'

/// IGNORE FOR NOW
//cannot get this to open in a new tab with react router dom

function Viewer () {
    return (
        <PDFViewer>
            <Document />
        </PDFViewer>
    )
}

export default Viewer;