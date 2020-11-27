export let dominantColor = '#1C2029'
export let secondaryColor = '#5783BF'
//let red = 'crimson'
//let amber = 'orange'
//let green = 'forestgreen'
export let defaultGrey = 'grey'


const styles = {
    menuItem: {
        position: 'relative',
        alignSelf: 'center',
        background: dominantColor,
        minWidth: 'calc(90px + 7vmin)',
        fontWeight: 600,
        fontSize: 'calc(1px + 2vmin)',
        cursor: 'pointer',
        transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
    },
    menuItemText: {
        paddingTop: 12,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 11,
        textAlign: 'center',
    },
    menuItemBar: {
        position: 'absolute',
        bottom: 0,
        height: 4,
        background: secondaryColor,
        transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        border: `0.5px solid ${dominantColor}`,
        borderBottom: '0'
    },
    headerContainer: {
        position: 'sticky',
        transition: 'all 1.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        zIndex: 10
    },
    menuContainer: {
        position: 'fixed',
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        minHeight: '7vh',
        width: '100%',
        background: dominantColor,
        borderTop: `1px solid ${dominantColor}`,
        transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
    },
    header: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        minHeight: 75,
        backgroundColor: dominantColor,
        color: 'white',

        transition: 'all 1.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        paddingLeft: 5,
        alignSelf: 'center',
        color: 'white',
        fontSize: 'calc(18px + 2vmin)',
        whiteSpace: 'nowrap',
        cursor: 'default',
    },
    slogan: {
        color: 'white',
        textAlign: 'center',
        fontSize: 'calc(3px + 2vmin)',
        cursor: 'default',
        },
    sloganText: {
        transition: 'all 1.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        opacity: 1
    },
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        color: 'white',
        background: dominantColor,
        height: '100%',
        fontSize: 14,
        paddingTop: 50,
        paddingLeft: 100,
        paddingRight: 100
    },
    copyrightContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        color: 'white',
        background: dominantColor,
    },
    copyrightText: {
        paddingTop: 60,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 'calc(4px + 1vmin)',
        position: 'relative',
        bottom: -6,
        left: 0,
        textAlign: 'center',
        flexGrow: 1
    },
    socialMediaContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    socialMediaIcons: {
        paddingRight: 10,
        fontSize: 26,
        cursor: 'pointer'
    },
    profileIconLoggedOff: {
        position: 'relative',
        float: 'right',
        background: defaultGrey,
        width: 'calc(22px + 2vmin)',
        height: 'calc(22px + 2vmin)',
        borderRadius: '50%',
        padding: '5px',
        cursor: 'pointer',
        fontSize: '27px',
        transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    },
    menuIcon: {
        position: 'absolute',
        top: '15px',
        right: '8px'
    },
    profileBox: {
        position: 'fixed',
        display: 'flex',
        top: 75,
        right: 15,
        height: 300,
        width: 200,
        background: dominantColor,
        borderRadius: 5,
        boxShadow: '0 8px 6px -6px grey',
        color: 'white',
        border: `1px solid ${secondaryColor}`,
        fontSize: 14
    },
    slideMenu: {
        position: 'fixed',
        width: 200,
        top: 75,
        right: 0,
        height: '100%',
        background: dominantColor,
        transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    },
    slideMenuDarken: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'black',     
    },
    subscribeInput: {
        borderRadius: 5,
        border: `1px solid ${dominantColor}`,
        color: 'black',
        fontWeight: 600,
        padding: 3,
        paddingLeft: 5,
        outline: 'none',
        transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
    },
    subscribeButton: {
        outline: 'none',
        marginLeft: 5,
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 5,
        border: 'none',
        padding: 3,
        cursor: 'pointer'
    }
}
export default styles