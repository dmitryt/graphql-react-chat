import { withAuth } from '../store/auth';

import LoginForm from '../components/forms/LoginForm';

export default withAuth(LoginForm);
