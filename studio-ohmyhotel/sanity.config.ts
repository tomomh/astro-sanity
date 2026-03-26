import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {schemaTypes} from './schemaTypes'

// Supported languages
const languages = [
  {id: 'en', title: 'English'},
  {id: 'ja', title: '日本語'},
  {id: 'ko', title: '한국어'},
  {id: 'vi', title: 'Tiếng Việt'},
]

export default defineConfig({
  name: 'default',
  title: 'ohmyhotel',

  projectId: 'i7q7u7k8',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: languages,
      schemaTypes: ['homePage', 'aboutUsPage', 'businessPage', 'careersPage', 'privacyPage'],
    }),
    internationalizedArray({
      languages,
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text', 'simpleBlockContent', 'richBlockContent'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
