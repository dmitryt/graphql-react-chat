import { compose } from 'react-apollo';
import { withUser, withCurrentUser } from '../store/user';

import EditProfileForm from '../components/forms/EditProfileForm';

export default compose(
  withCurrentUser,
  withUser,
)(EditProfileForm);
