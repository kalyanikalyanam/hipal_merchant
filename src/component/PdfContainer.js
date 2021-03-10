import React from 'react';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar">
       
        <div className="text-left custom-pro-edt-ds">
            <button type="button" onClick={createPdf}  className="btn add_btn_pop_orange addmode_pad qr_btn" style={{marginTop:'25px'}}>Download</button>
            </div>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}