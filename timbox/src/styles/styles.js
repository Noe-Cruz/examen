const Styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
    },
    title: {
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
    },
    inputContainer: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      width: '100%',
    },
    buttonContainer: {
      textAlign: 'center',
    },
    button: {
      padding: '10px',
      backgroundColor: '#000000',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
    },
    progresoContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999 
    },
    progreso: {
        textAlign: 'center', 
        color: 'white'
    },
    errorContainer: {
        color: 'red', 
        marginTop: '10px',
        textAlign: 'center'
    },
    buttonLogout: {
        background: 'transparent', 
        border: 'none', 
        color: 'inherit' 
    },
    contraseniaContainer: {
      marginTop: '10px',
      textAlign: 'center'
    },
    acontrasenia: {
      color: 'black'
    },
    tableResponsive: {
      maxHeight: '400px', 
      overflowY: 'auto'
    },
    titleResult: {
      textAlign: 'center'
    },
    formModal: {
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '20px'
    }
  };
  
  export default Styles;