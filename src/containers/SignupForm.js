import { withAuth } from '../store/auth';

import SignupForm from '../components/forms/SignupForm';

export default withAuth(SignupForm);
