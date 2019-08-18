import dashboard from './components/Dashboard';
import porfile from './components/Profile';
import users from './components/Users';
import developer from './components/Developer';
export default [
    {path : '/dashboard' , component: dashboard},
    {path : '/developer' , component: developer},
    {path : '/profile' , component: porfile},
    {path : '/users' , component: users},
]
