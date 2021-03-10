import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html,id) => {
    savePDF(html, { 
      paperSize: 'Letter',
      fileName: 'qrcode.pdf',
      margin: 3
    })
  }
}

const Doc = new DocService();
export default Doc;