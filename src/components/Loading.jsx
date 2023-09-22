function Loading({texto}) {
    return (        
        <div className="d-flex align-items-center snipper">
            <strong role="status" className="nombreSnipper">{texto}</strong>
            <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>       
    );
}

export default Loading;