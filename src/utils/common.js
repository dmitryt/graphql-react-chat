import omit from 'lodash/fp/omit';
import { compose, mapProps } from 'recompose';

export const omitProps = compose(
  mapProps,
  omit,
);

export default {};
