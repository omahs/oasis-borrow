import { withOGImage } from 'next-api-og-image'

import { OgImage } from '../../components/OgImage'
interface QueryParams {
  people: string
  amount: string
}

export default withOGImage<'query', QueryParams>({
  cacheControl: 'public, max-age=604800, immutable',
  dev: {
    inspectHtml: false,
  },
  template: {
    react: ({ people, amount }) => {
      return <OgImage people={people} amount={amount} />
    },
  },
})
