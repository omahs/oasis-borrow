import { withSentry } from '@sentry/nextjs'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
const NodeCache = require('node-cache')

export type ApiTranslationsResponse = {
  data: {
    attributes: {
      name: string
      locale: string
      page: {
        pagename: string
        translations: {
          name: string
          value: string
        }[]
      }[]
    }
  }[]
}

const translationsCache = new NodeCache({ stdTTL: 60 })

const formatTranslations = (translations: ApiTranslationsResponse['data']) =>
  Object.fromEntries(
    translations.map((translation) => [
      translation.attributes.locale,
      ...translation.attributes.page.map((page) =>
        page.translations.reduce(
          (acc, { name, value }) => ({
            ...acc,
            [`${page.pagename}.${name}`]: value,
          }),
          {},
        ),
      ),
    ]),
  )

const fetchTranslations = async () =>
  axios({
    method: 'get',
    url: `${process.env.CMS_BACKEND_URL}/translations?populate[0]=page&populate[1]=page.translations&locale=all&filters[environment][$eq]=staging`,
    responseType: 'json',
  })
    .then(({ data: response }: { data: ApiTranslationsResponse }) => {
      if (!response.data) {
        console.error('ERROR GETTING TRANSLATIONS', response)
      }
      const translations = formatTranslations(response.data)
      translationsCache.set('translations', translations)
      return translations
    })
    .catch((error) => {
      console.error('ERROR GETTING TRANSLATIONS', error)
      return error
    })

const getFeatureTranslations = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      res.send(
        translationsCache.has('translations')
          ? translationsCache.get('translations')
          : await fetchTranslations(),
      )
      return
    default:
      return res.status(405).end()
  }
}

export default withSentry(getFeatureTranslations)
