import { graphql } from 'react-apollo';
import { compose, withState, withHandlers } from 'recompose';

export const prepareQuery = (QUERY, name, config = {}) =>
  graphql(QUERY, {
    ...config,
    props: ({ data: { loading, error, ...dataRest }, ...rest }) =>
      (config.props || (args => args))({
        ...rest,
        [name]: {
          ...dataRest,
          data: dataRest[name],
          loading,
          error,
        },
      }),
  });

export const prepareMutation = (MUTATION, name, config = {}) =>
  compose(
    graphql(MUTATION, config),
    withState('loading', 'setLoading', false),
    withState('error', 'setError', null),
    withHandlers({
      [name]: ({
        mutate, setLoading, setError, onMutationSuccess = () => {},
      }) => (variables) => {
        setLoading(true);
        return mutate({ variables })
          .then(() => {
            setError(null);
            onMutationSuccess();
          })
          .finally(() => {
            setLoading(false);
          });
      },
    }),
  );
