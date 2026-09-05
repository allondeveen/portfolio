import { SlugField as SlugField_c2037a2e66bb31a38ea181055dbeb5cb } from '@allondeveen-portfolio/slug-property/slugField'
import { SyncSlugFromHero as SyncSlugFromHero_c9e62ec1743b74ef682b5b1f678e1dbd } from '@allondeveen-portfolio/sync-hero-metadata/syncSlugFromHero'
import { SyncTitleFromHero as SyncTitleFromHero_d80220c0cbedb1284b8b4391456c702e } from '@allondeveen-portfolio/sync-hero-metadata/syncTitleFromHero'
import { OverviewComponent as OverviewComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { MetaTitleComponent as MetaTitleComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { MetaDescriptionComponent as MetaDescriptionComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { MetaImageComponent as MetaImageComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { PreviewComponent as PreviewComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { SyncSlugFromName as SyncSlugFromName_a1cbce9704ea41d49fa32bd73a8df95c } from '@allondeveen-portfolio/topics/components/syncSlugFromName'
import { SyncSlugFromTitle as SyncSlugFromTitle_4a14346e0f409597e4d3f22fbbeff5c3 } from '@allondeveen-portfolio/series/components/syncSlugFromTitle'
import { SyncNameFromFileName as SyncNameFromFileName_cc424e2ac1a1de3cd21d80fb24930254 } from '@allondeveen-portfolio/media/components/syncNameFromFileName'
import { RscEntryLexicalCell as RscEntryLexicalCell_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { RscEntryLexicalField as RscEntryLexicalField_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { LexicalDiffComponent as LexicalDiffComponent_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { SingleLineFeatureClient as SingleLineFeatureClient_299ec48dbc3fa38f389e218e51b4fe3b } from '@allondeveen-portfolio/single-line-lexical/client'
import { FixedToolbarFeatureClient as FixedToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { ItalicFeatureClient as ItalicFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { InlineCodeFeatureClient as InlineCodeFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { BoldFeatureClient as BoldFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { LinkFeatureClient as LinkFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { R2ClientUploadHandler as R2ClientUploadHandler_85cc02ed84006fcc91d3aff39dda669d } from '@payloadcms/storage-r2/client'
import { SetupChecklist as SetupChecklist_c8002b459464a80fd613a0e56517046e } from '@allondeveen-portfolio/setup-checklist/components/setupChecklist'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'

/** @type import('payload').ImportMap */
export const importMap = {
  "@allondeveen-portfolio/slug-property/slugField#SlugField": SlugField_c2037a2e66bb31a38ea181055dbeb5cb,
  "@allondeveen-portfolio/sync-hero-metadata/syncSlugFromHero#SyncSlugFromHero": SyncSlugFromHero_c9e62ec1743b74ef682b5b1f678e1dbd,
  "@allondeveen-portfolio/sync-hero-metadata/syncTitleFromHero#SyncTitleFromHero": SyncTitleFromHero_d80220c0cbedb1284b8b4391456c702e,
  "@payloadcms/plugin-seo/client#OverviewComponent": OverviewComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/plugin-seo/client#MetaTitleComponent": MetaTitleComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/plugin-seo/client#MetaDescriptionComponent": MetaDescriptionComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/plugin-seo/client#MetaImageComponent": MetaImageComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/plugin-seo/client#PreviewComponent": PreviewComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@allondeveen-portfolio/topics/components/syncSlugFromName#SyncSlugFromName": SyncSlugFromName_a1cbce9704ea41d49fa32bd73a8df95c,
  "@allondeveen-portfolio/series/components/syncSlugFromTitle#SyncSlugFromTitle": SyncSlugFromTitle_4a14346e0f409597e4d3f22fbbeff5c3,
  "@allondeveen-portfolio/media/components/syncNameFromFileName#SyncNameFromFileName": SyncNameFromFileName_cc424e2ac1a1de3cd21d80fb24930254,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": RscEntryLexicalCell_44fe37237e0ebf4470c9990d8cb7b07e,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": RscEntryLexicalField_44fe37237e0ebf4470c9990d8cb7b07e,
  "@payloadcms/richtext-lexical/rsc#LexicalDiffComponent": LexicalDiffComponent_44fe37237e0ebf4470c9990d8cb7b07e,
  "@allondeveen-portfolio/single-line-lexical/client#SingleLineFeatureClient": SingleLineFeatureClient_299ec48dbc3fa38f389e218e51b4fe3b,
  "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient": FixedToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#ItalicFeatureClient": ItalicFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#InlineCodeFeatureClient": InlineCodeFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#BoldFeatureClient": BoldFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#LinkFeatureClient": LinkFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/storage-r2/client#R2ClientUploadHandler": R2ClientUploadHandler_85cc02ed84006fcc91d3aff39dda669d,
  "@allondeveen-portfolio/setup-checklist/components/setupChecklist#SetupChecklist": SetupChecklist_c8002b459464a80fd613a0e56517046e,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1
}
