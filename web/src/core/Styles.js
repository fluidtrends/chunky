const _main = (_) => ({
    container: {
        backgroundColor: '#FFFFFF'
    },
    component: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#455A64'
    }
})

export default (props) => ({ 
    main: _main(props) 
})
