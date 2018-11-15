import { compose, withState, withHandlers } from 'recompose';

export default compose(
  withState('loading', 'setLoading', false),
  withState('error', 'setError', null),
  withHandlers({
    toggleMutation: ({ mutate, setLoading, setError }) => (variables) => {
      setLoading(true);
      return mutate({ variables })
        .then(() => {
          setError(null);
        })
        .catch(({ graphQLErrors, networkError }) => {
          const error = (graphQLErrors || [])
            .map(({ message }) => message)
            .concat(networkError ? [networkError] : [])
            .join('; ');
          setError(error || String(error));
        })
        .finally(() => {
          setLoading(false);
        });
    },
  }),
);
