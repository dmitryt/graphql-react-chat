import { withUser } from '../store/auth';

import SignupForm from '../components/forms/SignupForm';

export default withUser(SignupForm);
