import { withAuth } from '../store/auth';

import WelcomePage from '../components/WelcomePage';

export default withAuth(WelcomePage);
