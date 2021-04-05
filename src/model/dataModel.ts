export interface MediaModel {
  image_url: string
  image_url_thumb: string
}

export interface SourceModel {
  name: string
  html_url: string
  api_url: string
}
export interface BikeInfoModel {
  id: number
  title: string
  description: string
  address: string
  occurred_at: number
  updated_at: number
  url: string
  media: MediaModel
}
export interface DataModel extends BikeInfoModel {
  source: SourceModel
  location_type: string
  location_description: string
  type: string
  type_properties: string
}
