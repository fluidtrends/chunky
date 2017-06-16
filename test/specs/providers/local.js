import savor from 'react-savor'
import { Data, Errors } from '../../..'

savor.add("should remove from local", (context, done) => {
    const provider = new Data.Providers.Local()
     
    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'delete', nodes: ['test'] })

    // Attempt to delete
    savor.promiseShouldSucceed(operation, done, () => {})
}).

run ("Local Data Providers")
