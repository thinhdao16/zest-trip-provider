import Login from '../login/Login'
import SignUp from '../signUp/SignUp'
import SetUpProvider from '../setUpProvider/SetUpProvider'

function Header() {
    return (
        <>
            <Login />
            <SignUp />
            <SetUpProvider/>
        </>
    )
}

Header.propTypes = {}

export default Header
