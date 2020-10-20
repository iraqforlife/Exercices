const createReactClass = require('create-react-class');

const AuthUtils = createReactClass({
    statics: {
        isLoggedIn : function() {
            let token = localStorage.getItem("token");
            if(token === null || token === "" || token === undefined) 
                return false;  
            return true;
        }
    },
    render() {return}
})

export default AuthUtils;
