import { withUser } from '../store/user';

import WelcomePage from '../components/WelcomePage';

export default withUser(WelcomePage);
