

const Notification = ({ message, status }) => {

    const info = {
        fontSize : '15px',
        color : 'green',
        border : '1px solid green',
        borderRadius : '10px',
        backgroundColor : 'lightgrey',
        marginTop : '10px',
        paddingLeft: '10px',
    }

    const error = {
        fontSize : '15px',
        color : 'red',
        border : '1px solid red',
        borderRadius : '10px',
        backgroundColor : 'lightgrey',
        marginTop : '10px',
        paddingLeft: '10px',
    }

    if(message === null)
        return null

    const selctedStyle = status === 'info' ? info : error

    return (
        <div style={selctedStyle}>
            <p>{ message }</p>
        </div>
    )
}


export default Notification